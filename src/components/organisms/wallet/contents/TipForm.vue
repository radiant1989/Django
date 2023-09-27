<script setup lang="ts">
import {
  GButton,
  GInput,
  notify,
  GInputMessage,
  GModal,
  GProgressbar,
  GTooltip,
} from "~/components/atoms";
import {
  required,
  minLength,
  maxLength,
  helpers,
  minValue,
  maxValue,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import TokenPopover from "~/components/organisms/wallet/popovers/TokenPopover.vue";
import LAmountInput from "~/components/molecules/inputs/LAmountInput.vue";
import {
  AUTH,
  ERRORS,
  THEME,
  PREFERENCE,
  currencyItems,
  cryptoCurrencies,
} from "~/constants";
import {
  TIPS_MUTATION,
  GET_FEE_MUTATION,
  VIP_QUERY,
  EMAIL_TWO_FA_MUTATION,
  TIPS_USERNAME_MUTATION,
} from "~/graphql";
import GVerifyInput from "~/components/atoms/inputs/GVerifyInput.vue";
import {
  safeguardIcon,
  tipsSentNotifyIcon,
  confirmCodeNotifyIcon,
  incorrectNotifyIcon,
} from "~/icons";
const { mutate, loading, onDone, onError, error } = useMutation(TIPS_MUTATION);
const {
  mutate: emailTwoFaMutate,
  onDone: onEmailTwoFaDone,
  onError: onEmailTwoFaError,
  error: emailTwoFaError,
} = useMutation(EMAIL_TWO_FA_MUTATION);
const {
  mutate: tipsUsernameMutate,
  loading: tipsUsernameLoading,
  onDone: onTipsUsernameDone,
  onError: onTipsUsernameError,
  error: tipsUsernameError,
} = useMutation(TIPS_USERNAME_MUTATION);
const { result, onResult } = useQuery(VIP_QUERY);
onResult(() => {
  xp.value = result.value.vip.xp;
});
const { me } = inject(AUTH)!;
const { preferences } = inject(PREFERENCE)!;
const xp = ref<number>(0);
const username = ref<string>("");
const amount = ref<number>(0);
const usernameErrorString = ref<string>("");
const route = useRoute();
const verifyCode = ref<string>("");
const router = useRouter();
const fee = ref<number>(0);
const { screen } = inject(THEME)!;
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
const maxAmount = computed(() => {
  if (preferences?.value?.displayInfiatEnabled) {
    return Number((wallet.value?.free_amount * fiatPrice.value).toFixed(2));
  } else {
    return wallet.value?.free_amount;
  }
});
const isUsernameError = computed(() => !!usernameErrorString.value);
const isConfirmOpen = ref<boolean>(false);

const checkNameLetters = helpers.regex(/^[a-zA-Z0-9]+$/);
const rules = computed(() => {
  return {
    username: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(14),
      checkNameLetters,
    },
    amount: {
      maxValue: maxValue(maxAmount.value),
      minValue: minValue(
        preferences?.value.displayInfiatEnabled
          ? (1 / wallet.value?.currency.quotes.values["USD"]) * fiatPrice.value
          : 1 / wallet.value?.currency.quotes.values["USD"]
      ),
      required,
    },
    verifyCode: { required, minLength: minLength(6), maxLength: maxLength(6) },
  };
});
const v$ = useVuelidate(rules, { username, amount, verifyCode });

const onSendTip = async () => {
  if (!(await v$.value.username.$validate())) return;
  tipsUsernameMutate({
    q: username.value,
  });
};
const onSubmit = async () => {
  if (!(await v$.value.verifyCode.$validate())) return;
  mutate({
    username: username.value,
    userId: Number(me.value?.id),
    currency: wallet.value?.currency.code,
    amount: preferences?.value.displayInfiatEnabled
      ? cryptoValue.value
      : Number(amount.value) * 1.0,
    code: verifyCode.value,
  });
};
onDone(async ({ data }) => {
  notify.success({
    title: data.tips.title,
    text: data.tips.description,
    icon: {
      href: tipsSentNotifyIcon,
      class: "w-10 h-[45px]",
    },
  });
  isConfirmOpen.value = false;
});
onError(async ({ graphQLErrors, networkError }) => {
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
  } else if (
    Array.isArray(graphQLErrors) &&
    graphQLErrors[0]?.extensions?.validation
  ) {
    const validationErrors = graphQLErrors[0]?.extensions?.validation;
    if (Array.isArray(validationErrors["input.username"])) {
      usernameErrorString.value = "Username is invalid";
    }
    isConfirmOpen.value = false;
  } else {
    notify.error(
      { title: "Error", text: error.value?.message || "Something went wrong" },
      4000
    );
    isConfirmOpen.value = false;
  }
});
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
const inputUsername = async () => {
  usernameErrorString.value = "";
  await v$.value.username.$validate();
};
const inputAmount = async (amountValue: number) => {
  amount.value = amountValue * 1.0;
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
onEmailTwoFaDone(async () => {
  notify.success({
    title: "Confirmation Email Sent",
    text: "Address whitelist pending. Check your email for a 6-digit code to confirm.",
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
onTipsUsernameDone(async ({ data }) => {
  const users: string[] = data.tipsUsername || [];
  if (users.find((user) => user.username === username.value)) {
    if (me.value?.username === username.value) {
      usernameErrorString.value = "You cannot tip yourself.";
      return;
    }
    if (loading.value) return;
    if (me.value.enable2fa) {
      if (!(await v$.value.$validate())) return;
      mutate({
        username: username.value,
        userId: Number(me.value?.id),
        currency: wallet.value?.currency.code,
        amount: preferences?.value.displayInfiatEnabled
          ? cryptoValue.value
          : Number(amount.value) * 1.0,
        code: verifyCode.value,
      });
    } else {
      if (!(await v$.value.username.$validate())) return;
      if (!(await v$.value.amount.$validate())) return;
      emailTwoFaMutate({
        userId: Number(me?.value.id),
        action: "tipsConfirmation",
      });
    }
  } else {
    usernameErrorString.value = "Username does not exist.";
    return;
  }
});
</script>
<template>
  <div class="TipForm font-semibold">
    <div
      class="
        p-5
        md:p-[30px]
        bg-secondary-gradient
        rounded-lg
        flex
        items-center
        flex-col
        drop-shadow-[0_7.5px_31px_rgba(0,0,
        0,0)]
      "
      v-if="xp < 5000"
    >
      <img
        src="https://imagedelivery.net/ud0nKgC6_aGi3aA3QSI9OA/vip/Tip.png/public"
        style="max-width: 240px"
      />
      <div class="text-2xl font-extrabold text-[#23c1A2] mb-5">LOCKED</div>
      <div class="text-white font-semibold g-text-base g-mb-md">
        Unlock sending Tips at rank Bronze 1
      </div>
      <GProgressbar
        height="6px"
        :percentage="Number((100 * xp) / 5000)"
        class="rounded-[12px]"
      />
      <div class="flex justify-between w-full mt-2.5">
        <span class="text-sm font-semibold"> {{ xp }}XP</span>
        <span class="text-sm font-semibold"> 5000XP</span>
      </div>
    </div>
    <div class="Tipclass" v-else>
      <form @submit.prevent="onSendTip">
        <div class="g-form-item g-mb-md">
          <div class="flex justify-between mb-2.5">
            <label class="g-text-base block">Currency</label>
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
            <TokenPopover />
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
                      Number(
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
        <div class="g-form-item g-mb-md">
          <label class="g-text-base block mb-2 md:mb-3">Username</label>
          <GInput v-model="username" @update:model-value="inputUsername" />
          <GInputMessage v-if="v$.username.$error || isUsernameError">{{
            isUsernameError
              ? usernameErrorString
              : v$.username.minLength.$invalid
              ? ERRORS.TIP_USERNAME_MIN_LENGTH
              : v$.username.maxLength.$invalid
              ? ERRORS.TIP_USERNAME_MAX_LENGTH
              : v$.username.checkNameLetters.$invalid
              ? ERRORS.USERNAME_INVALID
              : ERRORS.USERNAME_REQUIRED
          }}</GInputMessage>
        </div>
        <div class="g-mb-md">
          <div class="flex justify-between">
            <span
              class="text-steel-color g-text-base mb-2 md:mb-3 font-semibold"
            >
              Tip amount
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
            @update:model-value="inputAmount"
            v-model="amount"
            @set:max-amount="setMaxAmount"
          />
          <GInputMessage v-if="v$.amount.$error && v$.amount.required.$invalid"
            >Input amount.</GInputMessage
          >
          <GInputMessage
            v-if="v$.amount.$error && preferences?.displayInfiatEnabled"
            >{{
              v$.amount.minValue.$invalid
                ? `The minimum tip amount is ${
                    currencyItems[preferences?.activeFiatCode].text
                  }${(
                    (1 / wallet?.currency.quotes.values["USD"]) *
                    fiatPrice
                  ).toFixed(2)}.`
                : "Tip amount exceeds available balance."
            }}</GInputMessage
          >
          <GInputMessage
            v-if="
              v$.amount.$error &&
              !preferences?.displayInfiatEnabled &&
              v$.amount.minValue.$invalid
            "
            >{{
              `The minimum tip amount is ${
                1 / wallet?.currency.quotes.values["USD"]
              }.`
            }}</GInputMessage
          >
          <GInputMessage
            v-if="
              v$.amount.$error &&
              !preferences?.displayInfiatEnabled &&
              v$.amount.maxValue.$invalid
            "
            >{{ "Tip amount exceeds available balance." }}</GInputMessage
          >
        </div>
        <div class="mt-5 md:mt-[30px] g-mb-md" v-if="me?.enable2fa">
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
        <GButton style-type="primary" :loading="loading">Send Tip</GButton>
      </form>
      <div class="mt-5 md:mt-[30px]" v-if="!me?.enable2fa">
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
            <svg class="w-[22px] h-[23px]">
              <use :xlink:href="safeguardIcon"></use>
            </svg>
            <span> Enable 2FA </span>
          </div>
        </GButton>
      </div>
    </div>
    <GModal v-model="isConfirmOpen" width="412px">
      <div class="p-5 font-semibold">
        <div class="flex gap-2 items-center g-mb-md">
          <svg class="w-[18px] h-[18px] text-steel-color">
            <use :xlink:href="walletIcon"></use>
          </svg>
          <span class="text-white g-text-base">Tips Confirmation</span>
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
          <GButton :loading="loading">Confirm</GButton>
        </form>
      </div>
    </GModal>
  </div>
</template>
