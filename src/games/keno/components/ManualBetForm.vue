<script setup lang="ts">
import { ref } from "vue";
import { useBitcoin } from "~/hooks";
import { GButton, GSelect } from "~/components/atoms";
import BetAmountInput from "~/components/molecules/inputs/BetAmountInput.vue";

const betAmount = ref(0);
const { dollarAmount } = useBitcoin(betAmount);

const risks = [
  {
    label: "Classic",
    value: "classic",
  },
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];

const risk = ref(risks[0].value);
const handleSubmit = () => {};
</script>
<template>
  <form class="ManualBetForm" @submit.prevent="handleSubmit">
    <div class="g-form-item">
      <div class="flex justify-between mb-[5px] sm:mb-2.5">
        <label class="g-label">Bet Amount</label>
        <label class="g-label">{{ dollarAmount.toFixed(6) }} USD</label>
      </div>
      <BetAmountInput v-model="betAmount" />
    </div>
    <div class="lg:hidden g-form-item">
      <GButton>Bet</GButton>
    </div>
    <div class="g-form-item">
      <label class="g-label block mb-[5px] sm:mb-2.5">Risk</label>
      <GSelect v-model="risk" :options="risks" />
    </div>
    <div class="g-form-item">
      <GButton style-type="secondary-soft">Auto Pick</GButton>
    </div>
    <div class="g-form-item">
      <GButton style-type="secondary-soft">Clear Table</GButton>
    </div>
    <div class="hidden lg:block">
      <GButton>Bet</GButton>
    </div>
  </form>
</template>
