<script setup lang="ts">
import { AUTH, RESET_PASSWORD } from "~/constants";

const { modalVisible, authType } = inject(AUTH)!;
onMounted(() => {
  modalVisible.value = true;
  authType.value = RESET_PASSWORD;
});
</script>
<template></template>
