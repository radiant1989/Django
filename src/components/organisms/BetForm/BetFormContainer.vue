<script setup lang="ts">
import { ref } from "vue";
import { GTabs } from "~/components/atoms";
import ManualBetForm from "./ManualBetForm.vue";
import AutoBetForm from "./AutoBetForm.vue";

const [MANUAL, AUTO] = ["MANUAL", "AUTO"];
const betType = ref(MANUAL);
const betTypeOptions = [
  {
    value: MANUAL,
    label: 'Manual'
  },
  {
    value: AUTO,
    label: 'Auto'
  }
];

</script>
<template>
  <div class="BetFormContainer">
    <div class="mb-5">
      <GTabs v-model="betType" :tabs="betTypeOptions" />
    </div>
    <div>
      <ManualBetForm v-if="betType === MANUAL" />
      <AutoBetForm v-else />
    </div>
  </div>
</template>
