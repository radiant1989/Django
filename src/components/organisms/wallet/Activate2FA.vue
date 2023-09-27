<script setup lang="ts">
import copy from "copy-to-clipboard";
import { useMutation } from "@vue/apollo-composable";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import QrcodeVue from "qrcode.vue";
import { AUTH, THEME, ERRORS } from "~/constants";
import { copyIcon } from "~/icons";
import { GButton, notify, GInputMessage, GTooltip } from "~/components/atoms";
import GVerifyInput from "~/components/atoms/inputs/GVerifyInput.vue";
import PasswordInput from "~/components/molecules/inputs/PasswordInput.vue";

import {
  walletIcon,
  transactionsIcon,
  roundLeftArrowIcon,
  userIcon,
  confirmCodeNotifyIcon,
  incorrectNotifyIcon,
} from "~/icons";
import {
  MAKE_QR_MUTATION,
  CONFIRM_QR_MUTATION,
  DISABLE_TWOFA_MUTATION,
} from "~/graphql";
const { screen } = inject(THEME)!;
const secretKey = ref<string>("");
const copyButtonLabel = ref<string>("Copy");
const password = ref<string>("");
const verifyCode = ref<string>("");
const urlQrCode = ref<string>("");
const { me } = inject(AUTH)!;
const router = useRouter();
const isTooltipVisible = ref<boolean>(false);

const copyToClipbaord = () => {
  copy(secretKey.value);
  isTooltipVisible.value = true;
  setTimeout(() => {
    isTooltipVisible.value = false;
  }, 1000);
};
const rules = computed(() => {
  return {
    verifyCode: { required, minLength: minLength(6), maxLength: maxLength(6) },
  };
});
const v$ = useVuelidate(rules, { verifyCode });

const updateVerifyCode = async (code: string) => {
  verifyCode.value = code;
  await v$.value.verifyCode.$validate();
};
const {
  mutate: makeQrMutate,
  loading: makeQrLoading,
  onDone: onMakeQrDone,
  onError: onMakeQrError,
  error: makeQrError,
} = useMutation(MAKE_QR_MUTATION);
const {
  mutate: confirmQrMutate,
  loading: confirmQrLoading,
  onDone: onConfirmQrDone,
  onError: onConfirmQrError,
  error: confirmQrError,
} = useMutation(CONFIRM_QR_MUTATION);
const {
  mutate: deactivateMutate,
  loading: deactivateLoading,
  onDone: onDeactivateDone,
  onError: onDeactivateError,
  error: deactivateError,
} = useMutation(DISABLE_TWOFA_MUTATION);
onMakeQrDone(async ({ data }) => {
  secretKey.value = data.makeQr.secret;
  urlQrCode.value = data.makeQr.urlQrCode;
});

onMakeQrError(async () => {
  notify.error({
    title: "Error",
    text: makeQrError.value?.message || "Something went wrong",
  });
});
onMounted(async () => {
  await makeQrMutate();
});
const onSubmit = async () => {
  if (!(await v$.value.$validate())) return;
  !me?.value?.enable2fa ? onActivate() : onDeactivate();
};
onConfirmQrDone(async () => {
  notify.success({
    title: "2FA Confirmation Email Sent.",
    text: "Please check your email to confirm and activate 2FA.",
    icon: {
      class: "w-10 h-[41px]",
      href: confirmCodeNotifyIcon,
    },
  });
});
onConfirmQrError(async ({ graphQLErrors, networkError }) => {
  notify.error({
    title: "Incorrect 2FA Code",
    text: `The 2FA code you entered doesn't match. Please try again.`,
    icon: {
      href: incorrectNotifyIcon,
      class: "w-10 h-[38px]",
    },
  });
});
const onActivate = async () => {
  await confirmQrMutate({
    code: verifyCode.value,
  });
};
onDeactivateDone(async () => {
  notify.success({
    title: "2FA Deactivated.",
    text: "You've successfully deactivated 2FA for your account.",
    icon: {
      class: "w-10 h-8 text-[#FFDB41]",
      href: userIcon,
    },
  });
});
onDeactivateError(async ({ graphQLErrors, networkError }) => {
  notify.error({
    title: "Incorrect 2FA Code",
    text: `The 2FA code you entered doesn't match. Please try again.`,
    icon: {
      href: incorrectNotifyIcon,
      class: "w-10 h-[38px]",
    },
  });
});
const onDeactivate = async () => {
  await deactivateMutate({
    code: verifyCode.value,
    password: password.value,
  });
};
const goBackUrl = () => {
  router.back();
};
</script>
<template>
  <div class="p-5 md:p-[30px]">
    <!-- The header of enable 2fa pop up -->
    <div class="w-full flex items-center justify-between pr-[35px]">
      <div class="flex flex-row items-center">
        <GButton style-type="transparent" :block="false" @click="goBackUrl">
          <svg class="w-3 h-4 text-steel-color group-hover:text-white">
            <use :xlink:href="roundLeftArrowIcon"></use>
          </svg>
        </GButton>
        <svg class="w-[22px] h-[22px] text-steel-color ml-3">
          <use :xlink:href="walletIcon"></use>
        </svg>
        <span class="text-base text-steel-color ml-2 font-semibold g-text-base">
          2FA
        </span>
      </div>
      <div class="flex flex-row items-center gap-[5px] font-semibold">
        <svg class="w-[22px] h-[22px] text-steel-color">
          <use :xlink:href="transactionsIcon"></use>
        </svg>
        <span class="text-sm text-steel-color"> Transactions </span>
      </div>
    </div>
    <!-- The content of enable 2FA pop up-->

    <div
      class="mt-5 md:mt-[30px] font-semibold"
      :class="!me?.enable2fa && 'mb-5 md:mb-[30px]'"
    >
      <h3 class="text-sm md:text-lg text-left text-white">
        Two-factor Authentication
      </h3>
      <article
        class="text-xs md:text-sm text-steel-color mt-5 md:mt-[30px]"
        v-if="!me?.enable2fa"
      >
        <p>
          Download and install Google Authenticator. Enable Two-factor
          Authenticator to protect your account from unathorized access.
        </p>
        <p class="mt-5 md:mt-[30px]">
          Scan the QR code with your Google Authenticator App or enter the
          secret key manually.
        </p>
      </article>
      <p class="text-xs md:text-sm text-steel-color mt-5 md:mt-[30px]" v-else>
        To disable Two-Factor authentication, enter your one-time Password (OTP)
        and login Password.
      </p>
    </div>
    <div class="flex md:flex-row flex-col gap-5" v-if="!me?.enable2fa">
      <qrcode-vue
        :value="urlQrCode"
        render-as="svg"
        foreground="white"
        background="transparent"
        :width="138"
        class="min-w-[138px] h-[138px] hidden md:block"
      />
      <div
        class="
          flex flex-col
          items-start
          justify-between
          w-full
          gap-[15px]
          font-semibold
        "
      >
        <p class="text-sm text-steel-color">Your secret key</p>
        <div class="flex flex-row w-full">
          <div
            class="
              bg-dark-color
              shadow-dark-box
              h-10
              md:h-[45px]
              rounded-l-lg
              w-full
              text-xs
              flex
              items-center
              justify-center
              text-white
            "
          >
            {{ secretKey }}
          </div>
          <GTooltip
            position="absolute"
            width="90px"
            placement="top"
            :trigger="isTooltipVisible"
          >
            <template #trigger>
              <button
                class="
                  text-steel-color
                  bg-secondary-gradient
                  border-2 border-secondary-color
                  h-10
                  md:h-[45px]
                  px-3
                  hover:text-white
                  hover:bg-secondary-hover-gradient
                  hover:border-secondary-hover-color
                  rounded-r-lg
                  active:scale-95
                  group
                "
                @click="copyToClipbaord"
              >
                <svg
                  class="
                    w-[18px]
                    h-[18px]
                    text-steel-color
                    group-hover:text-white
                  "
                >
                  <use :xlink:href="copyIcon"></use>
                </svg>
              </button>
            </template>
            <template #panel>
              <div class="text-white text-base">Copied</div>
            </template>
          </GTooltip>
        </div>
        <p class="text-xs md:text-sm text-steel-color">
          Write down this code, never reveal it to others, You can use it to
          regain access to your account if there is no access to the
          authenticator.
        </p>
        <qrcode-vue
          :value="urlQrCode"
          render-as="svg"
          foreground="white"
          background="transparent"
          :width="138"
          class="min-w-[138px] h-[138px] mx-auto block md:hidden"
        />
      </div>
    </div>
    <form class="ActivateForm" @submit.prevent="onSubmit">
      <div class="py-5 md:py-[30px] font-semibold">
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
          Verification code
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
      <div class="g-form-item">
        <label class="g-label block mb-2.5">Password</label>
        <PasswordInput v-model="password" />
      </div>
      <div class="w-full justify-center flex">
        <GButton
          style="transform: matrix(1, 0, 0, -1, 0, 0)"
          :loading="confirmQrLoading || deactivateLoading"
          ><div style="transform: matrix(1, 0, 0, -1, 0, 0)">
            {{ me?.enable2fa ? "Deactivate" : "Activate" }}
          </div></GButton
        >
      </div>
    </form>
  </div>
</template>
