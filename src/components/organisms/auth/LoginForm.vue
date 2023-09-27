<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { GInput, GButton, GInputMessage, notify } from "~/components/atoms";
import PasswordInput from "~/components/molecules/inputs/PasswordInput.vue";
import { LOGIN_MUTATION, MERGE_ACCOUNTS_MUTATION } from "~/graphql";
import { useMutation } from "@vue/apollo-composable";
import { User } from "~/types";
import { userIcon } from "~/icons";
import {
  AUTH,
  TWOFA,
  FORGOT_PASSWORD,
  NEEDS_MERGE,
  LOGIN,
  ERRORS,
} from "~/constants";

const emits =
  defineEmits<{
    (e: "login", value: User): void;
  }>();

const { authType, emailOrUsername, password } = inject(AUTH)!;

const form = reactive({
  emailOrUsername: "",
  password: "",
});
const route = useRoute();
const router = useRouter();
const rules = {
  emailOrUsername: { required, minLength: minLength(3) },
  password: {
    required,
    minLength: minLength(6),
  },
};
const v$ = useVuelidate(rules, form);
const { onLogin } = useApollo();

const { mutate, loading, onDone, onError, error } = useMutation(LOGIN_MUTATION);
const {
  mutate: mergeMutate,
  loading: mergeLoading,
  onDone: onMergeDone,
  onError: onMergeError,
  error: mergeError,
} = useMutation(MERGE_ACCOUNTS_MUTATION);
onMounted(() => {
  if (authType.value === NEEDS_MERGE) {
    form.emailOrUsername = emailOrUsername.value;
  }
});
const onMerge = async () => {
  if (!(await v$.value.$validate())) return;
  mergeMutate({
    hash: route.query.logid,
    email: form.emailOrUsername,
    username: "",
    password: form.password,
  });
};
const onSubmit = async () => {
  if (!(await v$.value.$validate())) return;
  emailOrUsername.value = form.emailOrUsername;
  password.value = form.password;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  pattern.test(form.emailOrUsername)
    ? mutate({
        email: form.emailOrUsername,
        password: form.password,
        code: "",
      })
    : mutate({
        username: form.emailOrUsername,
        password: form.password,
        code: "",
      });
};
onMergeDone(async ({ data }) => {
  await onLogin(data.mergeAccounts.token);
  emits("login", data.mergeAccounts.user);
  notify.success({
    title: "Welcome!",
    text: `Lets have some fun “${data.mergeAccounts.user.username}”!`,
    icon: {
      class: "w-10 h-8 text-[#FFDB41]",
      href: userIcon,
    },
  });
  await navigateTo("/");
});
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
onMergeError((error) => {
  if (error.value?.graphQLErrors[0].extensions.errors?.code === 401) {
    router.push({
      ...route,
      query: {
        tab: TWOFA,
        modal: "auth",
      },
    });
  } else {
    notify.error(
      { title: "Error", text: error.message || "Something went wrong" },
      4000
    );
  }
});
onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors[0].extensions.errors?.code === 401) {
    router.push({
      ...route,
      query: {
        tab: TWOFA,
        modal: "auth",
      },
    });
  } else {
    notify.error(
      { title: "Error", text: error.value?.message || "Something went wrong" },
      4000
    );
  }
});
const onClickForgotPassword = () => {
  authType.value = FORGOT_PASSWORD;
};
const inputPassword = async () => {
  await v$.value.password.$validate();
};
const inputEmailOrUsername = async () => {
  await v$.value.emailOrUsername.$validate();
};
</script>
<template>
  <form
    class="LoginForm"
    @submit.prevent="authType === NEEDS_MERGE ? onMerge() : onSubmit()"
  >
    <div class="g-form-item">
      <label class="text-sm block mb-2.5" for="emailOrUsername"
        >Email or Username
      </label>
      <GInput
        id="emailOrUsername"
        v-model="form.emailOrUsername"
        @update:model-value="inputEmailOrUsername"
        :static="authType === NEEDS_MERGE"
        :status="v$.emailOrUsername.$error ? 'error' : 'normal'"
      />
      <GInputMessage v-if="v$.emailOrUsername.$error">{{
        ERRORS.EMAIL_OR_USERNAME_MIN_LENGTH
      }}</GInputMessage>
    </div>
    <div class="g-form-item">
      <label class="text-sm block mb-2.5">Password</label>
      <PasswordInput
        v-model="form.password"
        @update:model-value="inputPassword"
        :status="v$.password.$error ? 'error' : 'normal'"
      />
      <GInputMessage v-if="v$.password.$error">{{
        v$.password.minLength.$invalid
          ? ERRORS.LOGIN_PASSWORD_MIN_LENGTH
          : ERRORS.PASSWORD_REQUIRED
      }}</GInputMessage>
    </div>
    <div class="flex w-full justify-end mb-5">
      <GButton
        style-type="transparent"
        :block="false"
        type="button"
        @click="onClickForgotPassword"
      >
        <div
          class="
            bg-primary-gradient bg-clip-text
            font-medium
            text-xs
            cursor-pointer
            text-transparent
          "
        >
          Forgot password?
        </div>
      </GButton>
    </div>
    <div class="w-full mt-[30px]">
      <GButton
        style-type="primary-lg"
        :loading="authType === NEEDS_MERGE ? mergeLoading : loading"
        class="!h-[50px]"
        >{{ authType === NEEDS_MERGE ? "Log in and Merge" : "Log in" }}</GButton
      >
    </div>
  </form>
</template>
<style scoped></style>
