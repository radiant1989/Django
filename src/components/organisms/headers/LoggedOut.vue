<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";

import { GButton, GLogo, notify } from "~/components/atoms";
import {
  AUTH,
  LOGIN,
  CREATE_USER,
  FINISH_REGISTRATION,
  NEEDS_MERGE,
  THEME,
} from "~/constants";
import { LOGIN_SOCIAL_MUTATION } from "~/graphql";
import { userIcon } from "~/icons";

/*
  if selectedTab is 0, the login modal is opened default.
  if selectedTab is 1, the register modal is opened default.
  */
const { modalVisible, authType, emailOrUsername, login } = inject(AUTH)!;
const { screen } = inject(THEME)!;
const isSSR = process.server;
const { onLogin } = useApollo();
const route = useRoute();
const router = useRouter();

function onShowLoginModal() {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      tab: LOGIN,
      modal: "auth",
    },
  });
}

function onShowRegisterModal() {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      tab: CREATE_USER,
      modal: "auth",
    },
  });
}
const { mutate, loading, onDone, onError, error } = useMutation(
  LOGIN_SOCIAL_MUTATION
);

onMounted(() => {
  if (route.query.logid) {
    mutate({
      hash: route.query.logid,
    });
  }
});

onDone(async ({ data }) => {
  if (data.loginSocial.socialResponse.needsMerge) {
    router.push({
      query: { ...route.query, tab: NEEDS_MERGE, modal: "auth" },
    });
    emailOrUsername.value = data.loginSocial.socialResponse.email;
  } else if (data.loginSocial.user.incomplete_profile) {
    if (
      data.loginSocial.socialResponse.email === "" ||
      data.loginSocial.user.email === null
    ) {
      router.replace({
        query: { ...route.query, tab: LOGIN, modal: "auth" },
      });
    } else {
      router.replace({
        query: { ...route.query, tab: FINISH_REGISTRATION, modal: "auth" },
      });
      emailOrUsername.value = data.loginSocial.user.email;
    }
  } else {
    await onLogin(data.loginSocial.token);
    login();
    notify.success({
      title: "Welcome!",
      text: `Lets have some fun “${data.loginSocial.user.username}”!`,
      icon: {
        class: "w-10 h-8 text-[#FFDB41]",
        href: userIcon,
      },
    });
    await navigateTo("/");
  }
});

onError(() => {
  notify.error(
    { title: "Error", text: error.value?.message || "Something went wrong" },
    4000
  );
  navigateTo("/");
});
</script>
<template>
  <div class="w-full">
    <div
      class="flex items-center justify-between md:h-[90px] h-[54px] relative"
    >
      <GLogo :width="180" size="lg" class="hidden md:block" />
      <GLogo :width="30" size="sm" class="block md:hidden" />
      <div class="flex flex-row gap-5">
        <GButton
          @click="onShowLoginModal"
          styleType="transparent"
          class="text-sm md:text-base"
          ><div class="cursor-pointer login">Log in</div></GButton
        >
        <GButton
          @click="onShowRegisterModal"
          class="rounded-xl py-2.5 px-6 text-sm md:text-base md:py-4 md:px-7"
        >
          <div class="cursor-pointer register">Register</div>
        </GButton>
      </div>
    </div>
  </div>
</template>
