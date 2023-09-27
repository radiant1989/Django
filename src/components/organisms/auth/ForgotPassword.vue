<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { GInput, GInputMessage, GButton, notify } from "~/components/atoms";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { SEND_RESET_LINK_MUTATION } from "~/graphql";
import { settingsIcon, userIcon } from "~/icons";

const { mutate, loading, onDone, onError } = useMutation(
  SEND_RESET_LINK_MUTATION
);
const form = reactive({
  email: "",
});
const rules = {
  email: { required, email },
};
const v$ = useVuelidate(rules, form);
const onSubmit = async () => {
  if (!(await v$.value.$validate())) return;
  mutate({
    email: form.email,
  });
};
onDone((response) => {
  notify.success({
    title: "Welcome!",
    text: response?.data?.sendResetLink[0],
    icon: {
      class: "w-10 h-8 text-[#FFDB41]",
      href: userIcon,
    },
  });
});
onError((error) => {
  notify.error({
    title: "Error!",
    text: error.message,
  });
});
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
        <label class="g-label block mb-2.5" for="email">Email </label>
        <GInput
          id="email"
          v-model="form.email"
          :status="v$.email.$error ? 'error' : 'normal'"
        /><GInputMessage v-if="v$.email.$error"
          >Please enter valid email address</GInputMessage
        >
      </div>
      <GButton :loading="loading">Submit</GButton>
    </form>
  </div>
</template>
