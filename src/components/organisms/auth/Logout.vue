<script setup lang="ts">
import { GButton, notify } from "~/components/atoms";
import { logoutIcon } from "~/icons";
import { LOGOUT_MUTATION } from "~/graphql";
import { useMutation } from "@vue/apollo-composable";
const { mutate, loading, onError, onDone, error } =
  useMutation(LOGOUT_MUTATION);
const { onLogout } = useApollo();

const logout = async () => {
  // TODO: this is client only logout, need api logout
  await mutate();
};
const router = useRouter();
onDone(() => {
  onLogout()
    .then(() => {
      router.replace({
        query: {},
      });
      location.href = router.currentRoute.value.path;
    })
    .catch(() => false);
});
onError(() => {
  notify.error(
    { title: "Error", text: error.value?.message || "Something went wrong" },
    4000
  );
});
</script>
<template>
  <div class="p-5">
    <div class="flex gap-1 items-center">
      <svg class="w-5 h-5 text-steel-color">
        <use :xlink:href="logoutIcon"></use>
      </svg>
      <span class="text-white font-semibold text-sm md:text-base">Logout</span>
    </div>
    <div class="text-center my-5 text-xs md:text-sm text-steel-color">
      Are you sure you want to logout from Gamba.com?
    </div>
    <GButton @click="logout" :loading="loading">Log Out</GButton>
  </div>
</template>
