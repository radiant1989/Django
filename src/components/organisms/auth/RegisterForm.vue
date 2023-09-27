<script setup lang="ts">
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, maxLength } from "@vuelidate/validators";
import {
  GButton,
  GInput,
  GInputMessage,
  GTransitionHeight,
  notify,
} from "~/components/atoms";
import { mustBeTrue } from "~/utilities";
import GCheckbox from "~/components/atoms/checkboxes/GCheckbox.vue";
import PasswordInput from "~/components/molecules/inputs/PasswordInput.vue";
import { CREATE_USER_MUTATION, FINISH_REGISTRATION_MUTATION } from "~/graphql";
import { useMutation } from "@vue/apollo-composable";
import { User } from "~/types";
import {
  checkNumberandSymbol,
  checkLetters,
  checkNameLetters,
  checkAtLetter,
  checkDotLetter,
} from "./helper";
import { userIcon, checkmarkIcon, arrowBelowIcon } from "~/icons";
import { AUTH, FINISH_REGISTRATION, CREATE_USER, ERRORS } from "@/constants";

const emits =
  defineEmits<{
    (e: "createUser", value: User): void;
  }>();

const { authType, emailOrUsername } = inject(AUTH)!;
const form = reactive({
  email: "",
  username: "",
  password: "",
  agreement: false,
});

const referralCodeVisible = ref<boolean>(false);
const emailErrorString = ref<string>("");
const isEmailError = computed(() => !!emailErrorString.value);

const usernameErrorString = ref<string>("");
const isUsernameError = computed(() => !!usernameErrorString.value);
const rules = {
  email: { required, email, checkAtLetter, checkDotLetter },
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(14),
    checkNameLetters,
  },
  password: {
    required,
    minLength: minLength(8),
    checkNumberandSymbol,
    checkLetters,
  },
  agreement: { mustBeTrue },
};
const $externalResults = reactive({});
const v$ = useVuelidate(rules, form, { $externalResults });
const { onLogin } = useApollo();
const { mutate, loading, onDone, onError, error } =
  useMutation(CREATE_USER_MUTATION);
const {
  mutate: finishMutate,
  loading: finishLoading,
  onDone: onFinishDone,
  onError: onFinishError,
  error: finishError,
} = useMutation(FINISH_REGISTRATION_MUTATION);
const route = useRoute();
onMounted(() => {
  form.email = emailOrUsername.value;
});
const updatePassword = async () => {
  await v$.value.password.$validate();
};
const inputUsername = async () => {
  usernameErrorString.value = "";
  await v$.value.username.$validate();
};
const inputEmail = async () => {
  emailErrorString.value = "";
  await v$.value.email.$validate();
};
const onFinishRegistration = async () => {
  if (!(await v$.value.$validate())) return;
  finishMutate({
    hash: route.query.logid,
    email: form.email,
    password: form.password,
    username: form.username,
  });
};
onFinishDone(async ({ data }) => {
  try {
    await onLogin(data.finishRegistration.token);
    emits("createUser", data.finishRegistration.user);
    notify.success({
      title: "Welcome!",
      text: `Lets have some fun “${data.finishRegistration.user.username}”!`,
      icon: {
        class: "w-10 h-8 text-[#FFDB41]",
        href: userIcon,
      },
    });
    await navigateTo("/");
  } catch (e) {
    notify.error(
      {
        title: "Error",
        text: "Something went wrong. please reload browser",
      },
      4000
    );
  }
});
const onSubmit = async () => {
  if (!(await v$.value.$validate())) return;
  mutate({
    input: {
      email: form.email,
      password: form.password,
      username: form.username,
    },
  });
};
onDone(async ({ data }) => {
  try {
    await onLogin(data.createUser.token);
    emits("createUser", data.createUser.user);
    notify.success({
      title: "Welcome!",
      text: `Lets have some fun “${data.createUser.user.username}”!`,
      icon: {
        class: "w-10 h-8 text-[#FFDB41]",
        href: userIcon,
      },
    });
  } catch (e) {
    notify.error(
      {
        title: "Error",
        text: "Something went wrong. please reload browser",
      },
      4000
    );
  }
});
onFinishError(({ graphQLErrors, networkError }) => {
  if (
    Array.isArray(graphQLErrors) &&
    graphQLErrors[0]?.extensions?.validation
  ) {
    const validationErrors = graphQLErrors[0]?.extensions?.validation;
    if (Array.isArray(validationErrors["input.username"])) {
      usernameErrorString.value = validationErrors["input.username"][0];
    }
  } else {
    notify.error(
      { title: "Error", text: error.value?.message || "Something went wrong" },
      4000
    );
  }
});
onError(({ graphQLErrors, networkError }) => {
  if (
    Array.isArray(graphQLErrors) &&
    graphQLErrors[0]?.extensions?.validation
  ) {
    const validationErrors = graphQLErrors[0]?.extensions?.validation;
    if (Array.isArray(validationErrors["input.email"])) {
      emailErrorString.value = validationErrors["input.email"][0];
    }
    if (Array.isArray(validationErrors["input.username"])) {
      usernameErrorString.value = validationErrors["input.username"][0];
    }
  } else {
    notify.error(
      { title: "Error", text: error.value?.message || "Something went wrong" },
      4000
    );
  }
});
</script>
<template>
  <form
    class="RegisterForm"
    @submit.prevent="
      authType === FINISH_REGISTRATION ? onFinishRegistration() : onSubmit()
    "
  >
    <div class="g-form-item">
      <label class="text-sm block mb-2.5">Email Address</label>
      <GInput
        v-model="form.email"
        name="email"
        type="email"
        @update:model-value="inputEmail"
        requried
        :static="authType === FINISH_REGISTRATION"
        :status="v$.email.$error ? 'error' : 'normal'"
      />
      <GInputMessage v-if="v$.email.$error || isEmailError">{{
        isEmailError
          ? emailErrorString
          : v$.email.checkAtLetter.$invalid
          ? ERRORS.EMAIL_AT_LETTER_REQUIRED
          : v$.email.required.$invalid
          ? ERRORS.EMAIL_REQUIRED
          : ERRORS.EMAIL_INVALID
      }}</GInputMessage>
    </div>
    <div class="g-form-item">
      <label class="g-label text-sm block mb-2.5">Username</label>
      <GInput
        v-model="form.username"
        @update:model-value="inputUsername"
        :status="v$.username.$error ? 'error' : 'normal'"
      />
      <GInputMessage v-if="v$.username.$error || isUsernameError">{{
        isUsernameError
          ? usernameErrorString
          : v$.username.minLength.$invalid
          ? ERRORS.USERNAME_MIN_LENGTH
          : v$.username.maxLength.$invalid
          ? ERRORS.USERNAME_MAX_LENGTH
          : v$.username.checkNameLetters.$invalid
          ? ERRORS.USERNAME_INVALID
          : ERRORS.USERNAME_REQUIRED
      }}</GInputMessage>
    </div>
    <div class="g-form-item">
      <label class="text-sm block mb-2.5">Password</label>
      <PasswordInput
        v-model="form.password"
        @update:model-value="updatePassword"
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
      <div v-if="form.password.length > 0">
        <div class="flex items-center gap-2">
          <svg
            class="w-2 h-2 mt-2"
            :class="
              !v$.password.checkNumberandSymbol.$invalid
                ? 'text-primary-color'
                : 'text-steel-color'
            "
          >
            <use :xlink:href="checkmarkIcon"></use>
          </svg>
          <GInputMessage type="info"
            >At Least 1 Number and Symbol (like !$@?#)</GInputMessage
          >
        </div>
        <div class="flex items-center gap-2">
          <svg
            class="w-2 h-2 mt-2"
            :class="
              !v$.password.checkLetters.$invalid
                ? 'text-primary-color'
                : 'text-steel-color'
            "
          >
            <use :xlink:href="checkmarkIcon"></use>
          </svg>
          <GInputMessage type="info"
            >Includes Lowercase and Uppercase
          </GInputMessage>
        </div>
        <div class="flex items-center gap-2">
          <svg
            class="w-2 h-2 mt-2"
            :class="
              !v$.password.minLength.$invalid
                ? 'text-primary-color'
                : 'text-steel-color'
            "
          >
            <use :xlink:href="checkmarkIcon"></use>
          </svg>
          <GInputMessage type="info">Minimum 8 Characters</GInputMessage>
        </div>
      </div>
    </div>
    <div class="flex items-center text-sm justify-between my-[15px]">
      <!-- TODO: GDropdown is wrong name, renamed as GCollapse and UI and style logic should be created as new -->
      <GTransitionHeight
        :initial-state="referralCodeVisible"
        v-slot="{ state, setState }"
        class="w-full"
      >
        <div
          :class="state ? 'text-white' : 'text-steel-color '"
          class="text-sm relative cursor-pointer group"
          @click="setState(!state)"
        >
          <div class="absolute top-1/2 right-0 -translate-y-1/2">
            <svg
              class="w-[9px] h-[6px] transition-transform duration-200"
              :class="
                state ? 'text-white' : 'text-steel-color group-hover:text-white'
              "
              :style="{ transform: `rotateX(${state ? '180deg' : '0deg'})` }"
            >
              <use :xlink:href="arrowBelowIcon"></use>
            </svg>
          </div>
          <span
            :class="
              !state &&
              'md:group-hover:text-white transition-all duration-200  ease-in-out'
            "
            >Refferal Code (Optional)</span
          >
        </div>
        <template v-if="state">
          <div class="w-full relative origin-top mt-5">
            <GInput>
              <template #suffix>
                <div class="h-full flex items-center pr-2">
                  <div
                    class="
                      bg-primary-gradient bg-clip-text
                      text-xs
                      cursor-pointer
                      font-semibold
                      text-transparent
                    "
                  >
                    Commission %XX
                  </div>
                </div>
              </template>
            </GInput>
          </div>
        </template>
      </GTransitionHeight>
    </div>
    <div class="w-full my-[20px]">
      <!-- TODO: GCheckbox is not tailwind way, it's pure css way. should clean up -->
      <GCheckbox
        v-model="form.agreement"
        labelClass="text-steel-color text-[12px] leading-[14.62px] font-proximanova font-medium"
        label="I confirm that I am at least 18 years old and hereby agree to the Terms of Service."
      />
      <GInputMessage v-if="v$.agreement.$error"
        >Agree is required</GInputMessage
      >
    </div>
    <div class="w-full g-mb-md">
      <p
        class="g-text-sm font-semibold"
        v-if="authType === FINISH_REGISTRATION"
      >
        For future sign-ins, you can use either your social accounts or the
        credentials set above.
      </p>
    </div>
    <GButton
      style-type="primary-lg"
      :loading="authType === FINISHREGISTRATION ? finishLoading : loading"
      >Register</GButton
    >
  </form>
</template>
