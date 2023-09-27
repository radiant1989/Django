<script setup lang="ts">
import { ref } from "vue";
import {
  maxValue,
  required,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import {
  GButton,
  notify,
  GInputMessage,
  GModal,
  GTooltip,
} from "~/components/atoms";
import { useMutation } from "@vue/apollo-composable";
import TabsWithIcon from "~/components/molecules/tabs/TabsWithIcon.vue";
import TokenPopover from "~/components/organisms/wallet/popovers/TokenPopover.vue";
import GVerifyInput from "~/components/atoms/inputs/GVerifyInput.vue";

import LAmountInput from "~/components/molecules/inputs/LAmountInput.vue";
import {
  THEME,
  AUTH,
  ERRORS,
  PREFERENCE,
  currencyItems,
  cryptoCurrencies,
} from "~/constants";
import {
  depositIcon,
  withdrawIcon,
  safeguardIcon,
  vaultDepositNotifyIcon,
  vaultWithdrawNotifyIcon,
  confirmCodeNotifyIcon,
  incorrectNotifyIcon,
} from "~/icons";
import {
  DEPOSIT_TO_VAULT_MUTATION,
  WITHDRAW_FROM_VAULT_MUTATION,
  EMAIL_TWO_FA_MUTATION,
} from "~/graphql";

const tabs = [
  {
    value: "deposit",
    label: "Deposit",
    icon: depositIcon,
  },
  {
    value: "withdraw",
    label: "Withdraw",
    icon: withdrawIcon,
  },
];
const { screen } = inject(THEME)!;
const { me, refetch } = inject(AUTH)!;
const { preferences } = inject(PREFERENCE)!;
const route = useRoute();
const router = useRouter();

const amount = ref<number>(0);
const amountError = ref<string>("");
const isAmountError = computed(() => !!amountError.value);

const selectedTab = ref<string>("deposit");

const isConfirmOpen = ref<boolean>(false);

const verifyCode = ref<string>("");

const wallet = computed(() =>
  me.value?.wallets.find(
    (wallet) => wallet.currency.code === route.query.currency
  )
);

const fiatPrice = computed(() => {
  return wallet.value?.currency.quotes.values[
    preferences?.value?.activeFiatCode ?? "USD"
  ];
});

const vault = computed(() =>
  me.value?.vault.find((vault) => vault.currency === route.query.currency)
);

const isVault = computed(() => {
  return selectedTab.value === "withdraw";
});

const fiatValue = computed(() => {
  return Number(amount.value) * fiatPrice.value;
});

const cryptoValue = computed(() => {
  if (
    !isVault &&
    Number(amount.value) ===
      Number((wallet.value?.free_amount * fiatPrice.value).toFixed(2))
  ) {
    return wallet.value?.free_amount;
  } else if (
    isVault &&
    Number(amount.value) ===
      Number((vault.value?.amount * fiatPrice.value).toFixed(2))
  ) {
    return vault.value?.amount;
  } else {
    return Number(amount.value) / fiatPrice.value;
  }
});

const maxAmount = computed(() => {
  if (preferences?.value?.displayInfiatEnabled) {
    return isVault.value
      ? Number(((vault.value?.amount ?? 0) * fiatPrice.value).toFixed(2))
      : Number(((wallet.value?.free_amount ?? 0) * fiatPrice.value).toFixed(2));
  } else {
    return isVault.value
      ? vault.value?.amount ?? 0
      : wallet.value?.free_amount ?? 0;
  }
});

watch(
  () => selectedTab.value,
  (newValue) => {
    amount.value = 0;
    v$.value.$reset();
  }
);

const rules = computed(() => {
  return {
    amount: {
      maxValue: maxValue(maxAmount.value),
      required,
    },
    verifyCode: { required, minLength: minLength(6), maxLength: maxLength(6) },
  };
});

const v$ = useVuelidate(rules, { amount, verifyCode });

const {
  mutate: emailTwoFaMutate,
  onDone: onEmailTwoFaDone,
  onError: onEmailTwoFaError,
  error: emailTwoFaError,
} = useMutation(EMAIL_TWO_FA_MUTATION);

const {
  mutate: depositMutate,
  loading: depositLoading,
  onDone: onDepositDone,
  onError: onDepositError,
  error: depositError,
} = useMutation(DEPOSIT_TO_VAULT_MUTATION);

const {
  mutate: withdrawMutate,
  loading: withdrawLoading,
  onDone: onWithdrawDone,
  onError: onWithdrawError,
  error: withdrawError,
} = useMutation(WITHDRAW_FROM_VAULT_MUTATION);

const onDeposit = async () => {
  if (Number(amount.value) === 0) {
    amountError.value = "Amount must be greater than zero.";
    return;
  }
  if (!(await v$.value.amount.$validate())) return;
  if (depositLoading.value) return;
  depositMutate({
    userId: Number(me.value?.id),
    currency: wallet.value.currency.code,
    amount: preferences?.value.displayInfiatEnabled
      ? cryptoValue.value
      : Number(amount.value) * 1.0,
  });
};

onEmailTwoFaDone(async () => {
  notify.success({
    title: "Confirmation Email Sent",
    text: "Vault withdrawal pending. Check your email for a 6-digit code to confirm.",
    icon: {
      href: confirmCodeNotifyIcon,
      class: "w-10 h-[41px]",
    },
  });
  isConfirmOpen.value = true;
});

onEmailTwoFaError(() => {
  notify.error(
    {
      title: "Error",
      text: emailTwoFaError.value?.message || "Something went wrong",
    },
    4000
  );
});

onDepositDone(async ({ data }) => {
  notify.success({
    title: data.depositToVault.title,
    text: data.depositToVault.description,
    icon: {
      href: vaultDepositNotifyIcon,
      class: "w-10 h-16",
    },
  });
  refetch();

  amount.value = 0;
});

onDepositError(async () => {
  notify.error({
    title: "Error",
    text: depositError.value?.message,
  });
});

const onWithdraw = async () => {
  if (Number(amount.value) === 0) {
    amountError.value = "Amount must be greater than zero.";
    return;
  }
  if (me.value?.enable2fa && !(await v$.value.$validate())) return;
  if (withdrawLoading.value) return;
  if (me.value.enable2fa) {
    withdrawMutate({
      userId: Number(me.value?.id),
      currency: vault.value.currency,
      amount: preferences?.value.displayInfiatEnabled
        ? cryptoValue.value
        : Number(amount.value) * 1.0,
      code: verifyCode.value,
    });
  } else {
    if (!(await v$.value.amount.$validate())) return;

    emailTwoFaMutate({
      userId: Number(me?.value.id),
      action: "vaultConfirmation",
    });
  }
};

const onSubmit = async () => {
  if (!(await v$.value.verifyCode.$validate())) return;
  withdrawMutate({
    userId: Number(me.value?.id),
    currency: vault.value.currency,
    amount: preferences?.value.displayInfiatEnabled
      ? cryptoValue.value
      : Number(amount.value) * 1.0,
    code: verifyCode.value,
  });
};

onWithdrawDone(async ({ data }) => {
  notify.success({
    title: data.withdrawFromVault.title,
    text: data.withdrawFromVault.description,
    icon: {
      href: vaultWithdrawNotifyIcon,
      class: "w-10 h-16",
    },
  });
  refetch();
  isConfirmOpen.value = false;
  amount.value = 0;
});

onWithdrawError(async ({ graphQLErrors, networkError }) => {
  if (Array.isArray(graphQLErrors) && graphQLErrors[0].extensions.errors) {
    if (
      graphQLErrors[0]?.extensions?.errors.message ===
        ERRORS.TWO_FA_CODE_INCORRECT ||
      graphQLErrors[0]?.extensions?.errors.message ===
        ERRORS.CONFIRM_CODE_EXPIRED
    ) {
      notify.error({
        title: "Incorrect 2FA Code",
        text: `The 2FA code you entered doesn't match. Please try again.`,
        icon: {
          href: incorrectNotifyIcon,
          class: "w-10 h-[38px]",
        },
      });
    }
  } else {
    notify.error({
      title: "Error",
      text: withdrawError.value?.message,
    });
  }
});

const setMaxAmount = () => {
  amount.value = maxAmount.value;
};

const inputAmount = async () => {
  amountError.value = "";
  await v$.value.amount.$validate();
};

const openEnable2faModal = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      modal: "enable2fa",
    },
  });
};

const updateVerifyCode = async (code: string) => {
  verifyCode.value = code;
  await v$.value.verifyCode.$validate();
};
</script>
<template>
  <div class="g-mb-md">
    <TabsWithIcon
      :tabs="tabs"
      v-model="selectedTab"
      style-type="primary"
      v-if="screen.md"
    />
    <TabsWithIcon
      :tabs="tabs"
      v-model="selectedTab"
      style-type="primary-sm"
      v-else
    />
  </div>
  <form @submit.prevent="isVault ? onWithdraw() : onDeposit()">
    <div class="g-form-item g-mb-md">
      <div class="flex justify-between mb-2.5 font-semibold">
        <label class="g-text-base block">{{
          selectedTab === "deposit" ? "Currency" : "Withdraw Currency"
        }}</label>
        <span class="g-text-base text-steel-color">Balance</span>
      </div>
      <div
        class="
          w-full
          bg-secondary-gradient
          shadow-dark-box
          rounded-lg
          md:h-[45px]
          sm:h-10
          flex flex-row
          justify-between
          items-center
          pr-[15px]
        "
      >
        <TokenPopover :is-vault="isVault" />
        <GTooltip
          placement="bottomRight"
          position="absolute"
          class="hidden md:block"
        >
          <template #trigger>
            <div
              class="flex flex-row font-semibold"
              v-if="preferences?.displayInfiatEnabled"
            >
              <span class="text-white g-text-base">{{
                currencyItems[preferences?.activeFiatCode].text
              }}</span>
              <span class="text-white g-text-base mr-[5px]">
                {{
                  isVault
                    ? Number(Number(fiatPrice) * vault?.amount).toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        }
                      )
                    : Number(
                        Number(fiatPrice) * wallet.free_amount
                      ).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })
                }}
              </span>
            </div>
          </template>
          <template #panel>
            <div class="flex flex-row items-center gap-1.5">
              <p
                class="text-white text-sm md:text-base font-semibold"
                v-if="preferences?.displayInfiatEnabled"
              >
                {{
                  isVault
                    ? vault?.amount.toFixed(8)
                    : wallet?.free_amount.toFixed(8)
                }}
                {{ wallet?.currency.code }}
              </p>
              <SolIcon v-if="route.query.currency === 'SOL'" />
              <MaticIcon v-else-if="route.query.currency === 'MATIC'" />
              <svg
                class="
                  w-[14px]
                  h-[14px]
                  md:w-4
                  md:h-4
                  text-steel-color
                  group-hover:text-white
                "
                v-else
              >
                <use
                  :xlink:href="cryptoCurrencies[route.query.currency].icon"
                ></use>
              </svg>
            </div>
          </template>
        </GTooltip>
        <div
          class="flex flex-row md:hidden"
          v-if="preferences?.displayInfiatEnabled"
        >
          <span class="text-white g-text-base">{{
            currencyItems[preferences?.activeFiatCode].text
          }}</span>
          <span class="text-white g-text-base mr-[5px] font-semibold">
            {{
              isVault
                ? Number(Number(fiatPrice) * vault?.amount).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }
                  )
                : Number(Number(fiatPrice) * wallet.free_amount).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }
                  )
            }}
          </span>
        </div>
        <p
          class="text-white text-sm md:text-base font-semibold"
          v-if="!preferences?.displayInfiatEnabled"
        >
          {{
            isVault ? vault?.amount.toFixed(8) : wallet?.free_amount.toFixed(8)
          }}
        </p>
      </div>
    </div>
    <div class="g-mb-md">
      <div class="flex justify-between">
        <span class="text-steel-color g-text-base mb-2 md:mb-3 font-semibold">
          {{ selectedTab === "deposit" ? "Deposit amount" : "Withdraw amount" }}
        </span>
        <div
          class="flex flex-row gap-1"
          v-if="preferences?.displayInfiatEnabled"
        >
          <span class="text-steel-color g-text-sm font-semibold">{{
            Number(cryptoValue).toFixed(8)
          }}</span>
          <span class="text-steel-color g-text-sm font-semibold">{{
            wallet?.currency.code
          }}</span>
        </div>
        <div class="flex flex-row gap-1" v-else>
          <span class="text-steel-color g-text-sm font-semibold">{{
            currencyItems[preferences?.activeFiatCode].text
          }}</span>
          <span class="text-steel-color g-text-sm font-semibold">{{
            Number(fiatValue).toFixed(8)
          }}</span>
        </div>
      </div>
      <LAmountInput
        v-model="amount"
        @set:max-amount="setMaxAmount"
        :is-vault="isVault"
        @update:model-value="inputAmount"
        :currency-code="isVault ? vault.currency : wallet.currency.code"
      />
      <GInputMessage v-if="v$.amount.$error || isAmountError">
        {{
          v$.amount.required.$invalid || isAmountError
            ? "Amount must be greater than zero."
            : "The amount exceeds available balance."
        }}</GInputMessage
      >
    </div>
    <div
      class="mt-5 md:mt-[30px] g-mb-md font-semibold"
      v-if="me?.enable2fa && selectedTab === 'withdraw'"
    >
      <div
        class="
          text-steel-color
          g-text-base
          mb-2
          md:mb-3
          font-semibold
          text-center
        "
      >
        Two Factor Code
      </div>
      <div class="flex items-center flex-col">
        <div class="flex gap-2.5 md:gap-[15px]">
          <GVerifyInput
            :width="screen.md ? '45px' : '40px'"
            @update:code="updateVerifyCode"
          />
        </div>
        <GInputMessage v-if="v$.verifyCode.$error">{{
          ERRORS.INVALID_2FA_CODE
        }}</GInputMessage>
      </div>
    </div>
    <GButton
      style-type="primary"
      :loading="isVault ? withdrawLoading : depositLoading"
    >
      {{ selectedTab === "deposit" ? "Deposit" : "Withdraw" }}
    </GButton>
  </form>
  <div
    class="TwoFactor mt-5 md:mt-[30px]"
    v-if="selectedTab === 'withdraw' && !me?.enable2fa"
  >
    <GButton
      style-type="secondary"
      @click="openEnable2faModal"
      class="px-4 text-steel-color"
      type="button"
    >
      <div
        class="
          flex flex-row
          items-center
          justify-center
          gap-2.5
          text-steel-color
          group-hover:text-white
        "
      >
        <svg class="w-3.5 h-3.5 md:w-4 md:h-4">
          <use :xlink:href="safeguardIcon"></use>
        </svg>
        <span class="g-text-base"> Enable 2FA </span>
      </div>
    </GButton>
  </div>
  <GModal v-model="isConfirmOpen" width="412px">
    <div class="p-5 font-semibold">
      <div class="flex gap-2 items-center g-mb-md">
        <svg class="w-[18px] h-[18px] text-steel-color">
          <use :xlink:href="walletIcon"></use>
        </svg>
        <span class="text-white g-text-base">Vault Confirmation</span>
      </div>
      <p class="g-text-sm text-steel-color g-mb-md">
        Please enter the 6-digit code sent to your email within 15 minutes to
        confirm your withdrawal.
      </p>
      <form @submit.prevent="onSubmit">
        <div
          class="
            text-steel-color
            g-text-base
            mb-2
            md:mb-3
            font-semibold
            text-center
          "
        >
          Two Factor Code
        </div>
        <div class="flex items-center flex-col g-mb-md">
          <div class="flex gap-2.5 md:gap-[15px]">
            <GVerifyInput
              :width="screen.md ? '45px' : '40px'"
              @update:code="updateVerifyCode"
            />
          </div>
          <GInputMessage v-if="v$.verifyCode.$error">{{
            ERRORS.INVALID_2FA_CODE
          }}</GInputMessage>
        </div>
        <GButton :loading="withdrawLoading">Confirm</GButton>
      </form>
    </div>
  </GModal>
</template>
