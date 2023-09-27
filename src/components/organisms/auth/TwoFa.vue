<script setup lang="ts">
import GVerifyInput from "~/components/atoms/inputs/GVerifyInput.vue";
import { GButton, notify, GInputMessage } from "~/components/atoms";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { THEME, AUTH, ERRORS } from "~/constants";
import { LOGIN_MUTATION } from "~/graphql";
import { useMutation } from "@vue/apollo-composable";
import { User } from "~/types";
import { userIcon, incorrectNotifyIcon } from "~/icons";

const { mutate, loading, onDone, onError, error } = useMutation(LOGIN_MUTATION);
const { onLogin } = useApollo();

const { screen } = inject(THEME)!;
const { emailOrUsername, password } = inject(AUTH)!;
const verifyCode = ref<string>("");
const emits =
  defineEmits<{
    (e: "login", value: User): void;
  }>();

const updateVerifyCode = async (value: string) => {
  verifyCode.value = value;
  await v$.value.$validate();
};
const rules = computed(() => {
  return {
    verifyCode: { required, minLength: minLength(6), maxLength: maxLength(6) },
  };
});
const v$ = useVuelidate(rules, { verifyCode });

const onSubmit = async () => {
  if (!(await v$.value.$validate())) return;
  mutate({
    email: emailOrUsername.value,
    password: password.value,
    code: verifyCode.value,
  });
};
onDone(async ({ data }) => {
  await onLogin(data.login.token);
  emits("login", data.login.user);
  notify.success({
    title: "Welcome!",
    text: `Lets have some fun “${data.login.user.username}”!`,
    icon: {
      class: "w-10 h-8 text-[#FFDB41]",
      href: userIcon,
    },
  });
});

onError(() => {
  notify.error({
    title: "Incorrect 2FA Code",
    text: `The 2FA code you entered doesn't match. Please try again.`,
    icon: {
      href: incorrectNotifyIcon,
      class: "w-10 h-[38px]",
    },
  });
});
</script>
<template>
  <div class="p-5 font-semibold">
    <div class="flex gap-2 g-mb-md">
      <span class="text-white text-base">2FA Authentication</span>
    </div>
    <form class="ActivateForm" @submit.prevent="onSubmit">
      <div class="g-form-item">
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
      <div class="w-full justify-center flex">
        <GButton :loading="loading">Log in</GButton>
      </div>
    </form>
  </div>
</template>
