<script setup lang="ts">
import {
  maxValue,
  required,
  minValue,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import GVerifyInput from "~/components/atoms/inputs/GVerifyInput.vue";

import { useMutation } from "@vue/apollo-composable";
import {
  GInput,
  GButton,
  notify,
  GInputMessage,
  GModal,
  GTooltip,
} from "~/components/atoms";
import TokenPopover from "~/components/organisms/wallet/popovers/TokenPopover.vue";
import LAmountInput from "~/components/molecules/inputs/LAmountInput.vue";
import {
  AUTH,
  THEME,
  WALLET,
  cryptoCurrencies,
  ERRORS,
  currencyItems,
  PREFERENCE,
} from "~/constants";
import {
  addressBookIcon,
  SolIcon,
  MaticIcon,
  walletIcon,
  safeguardIcon,
  confirmCodeNotifyIcon,
  withdrawCompleteNotifyIcon,
  incorrectNotifyIcon,
} from "~/icons";
import { Whitelist } from "~/types";
import {
  WITHDRAW_MUTATION,
  GET_FEE_MUTATION,
  EMAIL_TWO_FA_MUTATION,
} from "~/graphql/wallet";

const { screen } = inject(THEME)!;
const { me } = inject(AUTH)!;
const { whitelist } = inject(WALLET)!;
const { preferences } = inject(PREFERENCE)!;
const router = useRouter();
const route = useRoute();
const fee = ref<number>(0);
const amount = ref<number>(0);
const address = ref<string>(route.query.address || "");
const addressError = ref<string>("");
const isAddressError = computed(() => !!addressError.value);
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
const isConfirmOpen = ref<boolean>(false);
const maxAmount = computed(() => {
  if (preferences?.value?.displayInfiatEnabled) {
    return Number((wallet.value?.free_amount * fiatPrice.value).toFixed(2));
  } else {
    return wallet.value?.free_amount;
  }
});
onMounted(() => {
  getFeeMutate({ currency: route.query.currency });
});

watch(
  () => route.query.currency,
  (value) => {
    if (!!value) {
      getFeeMutate({ currency: value });
    }
    amount.value = 0;
  }
);

const {
  mutate: getFeeMutate,
  onDone: onGetFeeDone,
  onError: onGetFeeError,
  error: getFeeError,
} = useMutation(GET_FEE_MUTATION);

const {
  mutate: emailTwoFaMutate,
  onDone: onEmailTwoFaDone,
  onError: onEmailTwoFaError,
  error: emailTwoFaError,
  loading: emailTwoFaLoading,
} = useMutation(EMAIL_TWO_FA_MUTATION);

onGetFeeDone(({ data }) => {
  fee.value = data.getFee.fee;
});
onGetFeeError(() => {
  notify.error(
    {
      title: "Error",
      text: getFeeError.value?.message || "Something went wrong",
    },
    4000
  );
});
const { mutate, loading, onDone, onError, error } =
  useMutation(WITHDRAW_MUTATION);
const setMaxAmount = () => {
  amount.value = maxAmount.value;
};
const fiatValue = computed(() => {
  return Number(amount.value) * fiatPrice.value;
});
const cryptoValue = computed(() => {
  if (
    Number(amount.value) ===
    Number((wallet.value?.free_amount * fiatPrice.value).toFixed(2))
  ) {
    return wallet.value?.free_amount;
  } else {
    return Number(amount.value) / fiatPrice.value;
  }
});
const verifyCode = ref<string>("");
const rules = computed(() => {
  return {
    address: {
      required,
    },
    amount: {
      required,
      maxValue: maxValue(maxAmount.value),
      minValue: minValue(
        preferences?.value.displayInfiatEnabled
          ? (5 / wallet.value?.currency.quotes.values["USD"]) * fiatPrice.value
          : fee.value * 1.5 * wallet.value?.currency.quotes.values["USD"] > 5
          ? fee.value * 1.5
          : 5 / wallet.value?.currency.quotes.values["USD"]
      ),
    },
    verifyCode: { required, minLength: minLength(6), maxLength: maxLength(6) },
  };
});
const v$ = useVuelidate(rules, { address, amount, verifyCode });
const isWhitelistAddress = computed(() =>
  whitelist.value.some((wl: Whitelist) => wl.address === address.value)
);
const valid = (address: string, currency: string) => {
  return WAValidator.validate(address, currency, "both");
};

const onSubmit = async () => {
  if (loading.value || emailTwoFaLoading.value) return;
  if (!valid(address.value, wallet.value?.currency.code)) {
    addressError.value = "Invalid address.";
    return;
  }
  if (isWhitelistAddress.value) {
    if (!(await v$.value.amount.$validate())) return;
    mutate({
      userId: Number(me?.value.id),
      amount: preferences?.value.displayInfiatEnabled
        ? cryptoValue.value
        : Number(amount.value) * 1.0,
      destination: address.value,
      currencyCode: wallet.value.currency.code,
      walletId: Number(wallet.value.id),
      withdrawType: "44",
      code: "",
    });
  } else {
    if (me.value.enable2fa) {
      if (!(await v$.value.$validate())) return;
      mutate({
        userId: Number(me?.value.id),
        amount: preferences?.value.displayInfiatEnabled
          ? cryptoValue.value
          : Number(amount.value) * 1.0,
        destination: address.value,
        currencyCode: wallet.value.currency.code,
        walletId: Number(wallet.value.id),
        withdrawType: "44",
        code: verifyCode.value,
      });
    } else {
      if (!(await v$.value.amount.$validate())) return;
      emailTwoFaMutate({
        userId: Number(me?.value.id),
        action: "withdrawConfirmation",
      });
    }
  }
};
const onWithdraw = async () => {
  if (loading.value || emailTwoFaLoading.value) return;
  if (!(await v$.value.verifyCode.$validate())) return;
  if (me.value?.id !== undefined) {
    mutate({
      userId: Number(me?.value.id),
      amount: preferences?.value.displayInfiatEnabled
        ? cryptoValue.value
        : Number(amount.value) * 1.0,
      destination: address.value,
      currencyCode: wallet.value.currency.code,
      walletId: Number(wallet.value.id),
      withdrawType: "44",
      code: verifyCode.value,
    });
  }
};
onError(async ({ graphQLErrors, networkError }) => {
  if (Array.isArray(graphQLErrors) && graphQLErrors[0]?.extensions?.errors) {
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
    } else {
      isConfirmOpen.value = false;
      addressError.value = graphQLErrors[0]?.extensions?.errors.message;
    }
  } else {
    notify.error(
      { title: "Error", text: error.value?.message || "Something went wrong" },
      4000
    );
  }
});
onDone(async ({ data }) => {
  notify.success({
    title: data.withdraw.title,
    text: data.withdraw.description,
    icon: {
      class: "w-10 h-[46px]",
      href: withdrawCompleteNotifyIcon,
    },
  });
  address.value = "";
  amount.value = 0;
  verifyCode.value = "";
  isConfirmOpen.value = false;
  v$.value.$reset();
});
onEmailTwoFaDone(async () => {
  notify.success({
    title: "Confirmation Email Sent",
    icon: {
      href: confirmCodeNotifyIcon,
      class: "w-10 h-[41px]",
    },
    text: "Withdrawal pending. Check your email for a 6-digit code to confirm.",
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
const openWhitelist = () => {
  router.replace({
    query: {
      ...route.query,
      modal: "whitelist",
      tab: "whitelist",
      currency: wallet.value.currency.code,
    },
  });
};
const openAddrManageModal = () => {
  router.replace({
    query: {
      ...route.query,
      modal: "whitelist",
      tab: "management",
    },
  });
};
const inputAmount = async (inputValue: Number) => {
  await v$.value.amount.$validate();
};
const inputAddress = () => {
  addressError.value = "";
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
  <div class="WithdrawForm font-semibold">
    <div class="g-form-item">
      <div class="flex justify-between g-text-base">
        <label class="block mb-2.5">Withdraw Currency</label>
        <span>Balance</span>
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
        <TokenPopover />
        <GTooltip
          placement="bottomRight"
          position="absolute"
          class="hidden md:block"
        >
          <template #trigger>
            <div class="flex flex-row" v-if="preferences?.displayInfiatEnabled">
              <span class="text-white g-text-base">{{
                currencyItems[preferences?.activeFiatCode].text
              }}</span>
              <span class="text-white g-text-base mr-[5px]">
                {{
                  Number(Number(fiatPrice) * wallet.free_amount).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }
                  )
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
                {{ wallet.free_amount.toFixed(8) }}
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
          <span class="text-white g-text-base mr-[5px]">
            {{
              Number(Number(fiatPrice) * wallet.free_amount).toLocaleString(
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
          class="text-white text-sm md:text-base"
          v-if="!preferences?.displayInfiatEnabled"
        >
          {{ wallet.free_amount.toFixed(8) }}
        </p>
      </div>
    </div>
    <div class="mt-5 md:mt-[30px]">
      <div class="flex justify-between items-center g-text-base">
        <div class="flex gap-2 items-center">
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
          <span class="font-semibold"
            >{{ route.query.currency }} Withdraw Address</span
          >
        </div>
        <GButton
          style-type="transparent"
          @click="openAddrManageModal"
          :block="false"
        >
          <span
            class="
              bg-clip-text
              text-transparent
              bg-primary-gradient
              g-text-base
              font-semibold
              p-0
            "
          >
            {{ screen.md ? "Manage Address" : "Manage" }}
          </span></GButton
        >
      </div>
      <div class="mt-2 md:mt-3 relative">
        <GInput v-model="address" @update:model-value="inputAddress">
          <template #suffix>
            <GButton
              style-type="secondary"
              :block="false"
              class="
                absolute
                top-1/2
                -translate-y-1/2
                right-0
                w-10
                h-10
                md:w-[45px]
                !px-2
                !rounded-[8.5px]
                z-10
              "
              @click="openWhitelist"
              ><div class="flex flex-row items-center justify-center">
                <svg
                  class="
                    md:w-[19px]
                    w-4
                    h-5
                    md:h-6
                    text-steel-color
                    group-hover:text-white
                  "
                >
                  <use :xlink:href="addressBookIcon"></use>
                </svg>
              </div>
            </GButton>
          </template>
        </GInput>
        <GInputMessage v-if="isAddressError || v$.address.$error">
          {{ isAddressError ? addressError : "Input address" }}</GInputMessage
        >
      </div>
    </div>
    <div class="mt-5 md:mt-[30px] g-mb-md">
      <div class="flex justify-between items-center">
        <span class="text-steel-color g-text-base mb-2 md:mb-3 font-semibold">
          Withdraw amount
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
        @update:model-value="inputAmount"
        :is-timer="preferences?.displayInfiatEnabled && true"
      />
      <GInputMessage v-if="v$.amount.$error && v$.amount.required.$invalid"
        >Input amount.</GInputMessage
      >
      <GInputMessage
        v-else-if="v$.amount.$error && preferences?.displayInfiatEnabled"
        >{{
          v$.amount.minValue.$invalid
            ? `The minimum withdrawal amount is ${
                currencyItems[preferences?.activeFiatCode].text
              }${(
                (5 / wallet?.currency.quotes.values["USD"]) *
                fiatPrice
              ).toFixed(2)}.`
            : "Withdrawal amount exceeds available balance."
        }}</GInputMessage
      >
      <GInputMessage
        v-else-if="
          v$.amount.$error &&
          !preferences?.displayInfiatEnabled &&
          v$.amount.minValue.$invalid
        "
        >{{
          fee * 1.5 * wallet?.currency.quotes.values["USD"] > 5
            ? `The minimum withdrawal amount is ${(fee * 1.5).toFixed(8)}`
            : `The minimum withdrawal amount is ${(
                5 / wallet?.currency.quotes.values["USD"]
              ).toFixed(8)}`
        }}
        {{ route.query.currency }}.</GInputMessage
      >
      <GInputMessage
        v-else-if="
          v$.amount.$error &&
          !preferences?.displayInfiatEnabled &&
          v$.amount.maxValue.$invalid
        "
        >{{ "Withdrawal amount exceeds available balance." }}</GInputMessage
      >
    </div>
    <div
      class="mt-5 md:mt-[30px] g-mb-md"
      v-if="me?.enable2fa && !isWhitelistAddress"
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
        <div class="flex justify-center gap-2.5 w-full">
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
      @click="onSubmit"
      :loading="loading || emailTwoFaLoading"
      >Withdraw</GButton
    >
    <div class="mt-5 md:mt-[30px]" v-if="!me?.enable2fa && !isWhitelistAddress">
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
          <span class="text-white g-text-base">Withdrawal Confirmation</span>
        </div>
        <p class="g-text-sm text-steel-color g-mb-md">
          Please enter the 6-digit code sent to your email within 15 minutes to
          confirm your withdrawal.
        </p>
        <form @submit.prevent="onWithdraw">
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
          <GButton :loading="loading">Confirm</GButton>
        </form>
      </div>
    </GModal>
  </div>
</template>
