<script setup lang="ts">
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";
import { GTabs, GButton, GLogo } from "~/components/atoms";
import { googleIcon, facebookIcon, twitterIcon, userroundIcon } from "~/icons";
import { User } from "~/types";
import {
  AUTH,
  CREATE_USER,
  LOGIN,
  FINISH_REGISTRATION,
  NEEDS_MERGE,
} from "~/constants";
import { GET_SOCIAL_URL_QUERY, GET_SOCIAL_TELEGRAM_URL_QUERY } from "~/graphql";

defineEmits<{
  (e: "createUser", value: User): void;
  (e: "login", value: User): void;
}>();

const { authType } = inject(AUTH)!;
const tabs = [
  {
    value: CREATE_USER,
    label: "Register",
  },
  {
    value: LOGIN,
    label: "Log in",
  },
];
const router = useRouter();
const route = useRoute();
const onTabChange = (value: string) => {
  router.replace({ query: { ...route.query, tab: value } });
};
const socialButtonClass = "!border-b !border-x-0 !border-t-0";
const onSocialLogin = async (provider: string) => {
  const { data } = await useAsyncQuery<{
    getSocialContent: {
      url: string;
    };
  }>(GET_SOCIAL_URL_QUERY, {
    provider: provider,
  });
  window.location.href = data.value.getSocialContent.url;
};
</script>
<template>
  <div class="Auth">
    <div class="ml-5 mt-5">
      <GLogo
        size="lg"
        :width="100"
        v-if="
          authType === LOGIN ||
          authType === CREATE_USER ||
          authType === FINISH_REGISTRATION
        "
      />
    </div>
    <div class="flex gap-2 pl-5 items-center" v-if="authType === NEEDS_MERGE">
      <svg class="w-[21px] h-[21px] text-steel-color">
        <use :xlink:href="userroundIcon"></use>
      </svg>
      <span class="g-text-base text-white font-semibold">
        Existing Account Detected
      </span>
    </div>
    <img
      src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Casino+landing+page/login-header.png"
      :width="400"
      alt="loading..."
      class="hidden md:block"
      v-if="
        authType === LOGIN ||
        authType === CREATE_USER ||
        authType === FINISH_REGISTRATION
      "
    />
    <div class="p-[20px] w-full">
      <div class="mb-5">
        <GTabs
          :tabs="tabs"
          v-model="authType"
          @update:model-value="onTabChange"
          v-if="authType === LOGIN || authType === CREATE_USER"
        />
        <div
          class="flex gap-2 items-center"
          v-if="authType === FINISH_REGISTRATION"
        >
          <svg class="w-[21px] h-[21px] text-steel-color">
            <use :xlink:href="userroundIcon"></use>
          </svg>
          <h4 class="font-semibold g-text-base text-white">
            Finish Registration Process
          </h4>
        </div>
        <h4
          class="font-semibold g-text-base text-steel-color"
          v-if="authType === NEEDS_MERGE"
        >
          We've noticed that the email address you're trying to register with
          already belongs to an existing account. If this is your account, you
          can choose to sign in instead and merge your accounts. Alternatively,
          you may use a different email address to create a new account.
        </h4>
      </div>
      <div>
        <LoginForm
          v-if="authType === LOGIN || authType === NEEDS_MERGE"
          @login="$emit('login', $event)"
        />
        <RegisterForm v-else @create-user="$emit('create-user', $event)" />
      </div>
      <div v-if="authType === LOGIN || authType === CREATE_USER">
        <div
          class="
            w-full
            mt-5
            flex
            justify-center
            items-center
            text-white text-[20px]
          "
        >
          <fieldset class="border-t-[1px] w-full border-secondary-color">
            <legend
              class="
                mx-auto
                px-4
                font-proximanova
                text-steel-color text-sm
                font-medium
                leading-[17px]
              "
            >
              OR
            </legend>
          </fieldset>
        </div>
        <div class="w-full mt-5 gap-2.5 flex justify-between">
          <GButton
            style-type="secondary-lg"
            :class="socialButtonClass"
            style="transform: matrix(1, 0, 0, -1, 0, 0)"
            @click="onSocialLogin('google')"
          >
            <svg class="w-7 h-7 mx-auto text-steel-color icon">
              <use :xlink:href="googleIcon"></use>
            </svg>
          </GButton>
          <GButton
            style-type="secondary-lg"
            :class="socialButtonClass"
            style="transform: matrix(1, 0, 0, -1, 0, 0)"
            @click="onSocialLogin('facebook')"
          >
            <svg class="w-[16px] h-[34px] mx-auto text-steel-color icon">
              <use :xlink:href="facebookIcon"></use>
            </svg>
          </GButton>
          <GButton
            style-type="secondary-lg"
            :class="socialButtonClass"
            style="transform: matrix(1, 0, 0, -1, 0, 0)"
            @click="onSocialLogin('twitter')"
          >
            <svg class="w-[36px] h-[36px] mx-auto text-steel-color icon">
              <use :xlink:href="twitterIcon"></use>
            </svg>
          </GButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.icon {
  transform: matrix(1, 0, 0, -1, 0, 0);
}
</style>
