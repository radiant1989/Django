<script setup lang="ts">
import { ref } from "vue";
import { GModal, GButton } from "~/components/atoms";

const visible = ref<boolean>(false);
const index = ref<boolean>(true);
</script>
<template>
  <GButton @click="visible = true" :block="false">Open Modal</GButton>
  <GModal v-model="visible">
    <div class="p-6" v-if="index">
      <h2 class="mb-5 text-lg font-medium">Here is Modal Content1</h2>
      <GButton @click="index = !index">Change</GButton>
    </div>
    <div class="p-6" v-if="!index">
      <h2 class="mb-5 text-lg font-medium">Here is ModalContent 2</h2>
      <GButton @click="index = !index">Change</GButton>
    </div>
  </GModal>
</template>
