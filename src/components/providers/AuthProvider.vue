<script setup lang="ts">
import { ME_QUERY } from "~/graphql";
import {
  AUTH,
  CREATE_USER,
  LOGIN,
  LOGOUT,
  TWOFA,
  FINISH_REGISTRATION,
  NEEDS_MERGE,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  SITE_LOADING,
} from "~/constants";
import { User } from "~/types";

import { GModal, notify } from "~/components/atoms";
import Auth from "~/components/organisms/auth/Auth.vue";
import Logout from "~/components/organisms/auth/Logout.vue";
import TwoFa from "~/components/organisms/auth/TwoFa.vue";
import ForgotPassword from "~/components/organisms/auth/ForgotPassword.vue";
import ResetPassword from "~/components/organisms/auth/ResetPassword.vue";
import Apollo from "#apollo";

const clientConfig = Apollo.clients.default;
const { onInitialRendering, addLoading } = inject(SITE_LOADING)!;
const cookie = useCookie(clientConfig.tokenName);
const { loading, result, options, onError, error, subscribeToMore, refetch } =
  useQuery<{
    me: User;
  }>(
    ME_QUERY,
    {},
    {
      errorPolicy: process.server ? "ignore" : "all", // ignore error on SSR mode because that crashes page render
      enabled: !!cookie.value, // enable only if auth token is present on cookie
      notifyOnNetworkStatusChange: true,
    }
  );

const route = useRoute();
const authType = computed(() => route.query.tab);
const modalVisible = computed(() => route.query.modal === "auth");
const emailOrUsername = ref<string>("");
const password = ref<string>("");
const me = computed(() => result.value?.me || null);
const isLoggedIn = computed(() => !!me?.value);
const login = () => {
  cookie.value = useCookie(clientConfig.tokenName).value;
  // @ts-ignore
  options.enabled = true;
  refetch();
  router.push({
    path: router.currentRoute.value.path,
  });
};
provide(AUTH, {
  isLoggedIn,
  me,
  loading,
  modalVisible,
  authType,
  emailOrUsername,
  password,
  login,
  refetch,
  subscribeToMore,
});

onInitialRendering(() => {
  // check if browser is checking logged in
  if (loading.value) {
    const removeLoading = addLoading();
    const stopWatch = watch(
      () => loading.value,
      (isLoading) => {
        if (!isLoading) {
          removeLoading();
          stopWatch();
        }
      }
    );
  }
});
onError(() => {
  notify.error(
    { title: "Error", text: error.message || "Something went wrong" },
    4000
  );
});
const nuxtApp = useNuxtApp();
// TODO: apply typescript
// @ts-ignore
const { token, onReady } = nuxtApp.$csrfToken();
const router = useRouter();
onReady((token: string) => {
  console.log("csrftoken", token);
});

const onCloseModal = () => {
  router.push({
    path: router.currentRoute.value.path,
  });
};
</script>
<template>
  <slot></slot>
  <ClientOnly>
    <GModal :model-value="modalVisible" @update:model-value="onCloseModal">
      <Logout v-if="authType === LOGOUT" />
      <Auth
        @login="login"
        @create-user="login"
        v-else-if="
          authType === LOGIN ||
          authType === CREATE_USER ||
          authType === FINISH_REGISTRATION ||
          authType === NEEDS_MERGE
        "
      />
      <TwoFa @login="login" v-else-if="authType === TWOFA" />
      <ForgotPassword v-else-if="authType === FORGOT_PASSWORD" />
      <ResetPassword v-else-if="authType === RESET_PASSWORD" />
    </GModal>
  </ClientOnly>
</template>
