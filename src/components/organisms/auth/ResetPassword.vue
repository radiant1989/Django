<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, minLength, maxLength } from "@vuelidate/validators";

import { GInputMessage, GButton, notify } from "~/components/atoms";
import PasswordInput from "~/components/molecules/inputs/PasswordInput.vue";
import GVerifyInput from "~/components/atoms/inputs/GVerifyInput.vue";
import { LOGIN, AUTH, THEME, ERRORS } from "~/constants";

import { RESET_PASSWORD_MUTATION } from "~/graphql";
import { settingsIcon, userIcon } from "~/icons";
import { checkNumberandSymbol, checkLetters } from "./helper";
const { mutate, onDone, onError, error, loading } = useMutation(
  RESET_PASSWORD_MUTATION
);
const form = reactive({
  password: "",
  confirmPassword: "",
});

const route = useRoute();
const { authType } = inject(AUTH)!;
const { screen } = inject(THEME)!;
const token = ref<string>("");
const emailAddress = ref<string>("");
const enable2fa = ref<string>("false");
const verifyCode = ref<string>("");
const rules = () => {
  return {
    password: {
      required,
      minLength: minLength(8),
      checkNumberandSymbol,
      checkLetters,
    },
    confirmPassword: {
      required,
      sameAs: sameAs(form.password),
    },
    verifyCode: { required, minLength: minLength(6), maxLength: maxLength(6) },
  };
};
const v$ = useVuelidate(rules, { form, verifyCode });
onMounted(async () => {
  token.value = route.params.id;
  emailAddress.value = route.query.email;
  enable2fa.value = route.query.enable2fa;
  await navigateTo("/");
});
const updateVerifyCode = async (value: string) => {
  verifyCode.value = value;
  await v$.value.$validate();
};
const onSubmit = async () => {
  if (!(await v$.value.$validate())) return;
  mutate({
    password: form.password,
    password_confirmation: form.confirmPassword,
    token: token.value,
    email: emailAddress.value,
    code: verifyCode.value,
  });
};
onDone(async ({ data }) => {
  notify.success({
    title: "Welcome!",
    text: data.resetPassword[0],
    icon: {
      class: "w-10 h-8 text-[#FFDB41]",
      href: userIcon,
    },
  });
  authType.value = LOGIN;
});
onError(() => {
  notify.error(
    { title: "Error", text: error.value?.message || "Something went wrong" },
    4000
  );
});
const inputPassword = async () => {
  await v$.value.password.$validate();
};
</script>
<template>
  <div class="p-5 font-semibold">
    <div class="flex gap-2 text-white g-text-base g-mb-md">
      <svg class="w-[21px] h-[21px] text-steel-color">
        <use :xlink:href="settingsIcon"></use>
      </svg>
      <span>Reset Password</span>
    </div>
    <form class="ForgotPasswordForm" @submit.prevent="onSubmit">
      <div class="g-form-item">
        <label class="g-label block mb-2.5" for="newPasword"
          >New Password
        </label>
        <PasswordInput
          v-model="form.password"
          @update:model-value="inputPassword"
          :status="v$.password.$error ? 'error' : 'normal'"
        />
        <GInputMessage v-if="v$.password.$error">{{
          v$.password.minLength.$invalid
            ? ERRORS.PASSWORD_MIN_LENGTH
            : v$.password.checkLetters.$invalid
            ? ERRORS.PASSWORD_LETTERS
            : v$.password.checkNumberandSymbol.$invalid
            ? ERRORS.PASSWORD_SYMBOL_NUMBER
            : ERRORS.PASSWORD_REQUIRED
        }}</GInputMessage>
      </div>
      <div class="g-form-item">
        <label class="g-label block mb-2.5" for="newPasword"
          >Confirm New Password
        </label>
        <PasswordInput
          v-model="form.confirmPassword"
          :status="v$.confirmPassword.$error ? 'error' : 'normal'"
        />
        <GInputMessage v-if="v$.confirmPassword.$error">
          Passwords do not match. Please try again.</GInputMessage
        >
      </div>
      <div class="g-form-item" v-if="enable2fa === 'true'">
        <label class="g-label block mb-2.5">Verification code</label>
        <div class="mt-5 flex items-center flex-col">
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
      <GButton :loading="loading">Set New Password</GButton>
    </form>
  </div>
</template>
