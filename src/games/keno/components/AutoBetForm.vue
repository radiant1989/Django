<script setup lang="ts">
import { reactive } from "vue";
import { GButton, GInputNumber, GSelect } from "~/components/atoms";
import BetAmountInput from "~/components/molecules/inputs/BetAmountInput.vue";
import BitcoinInput from "~/components/molecules/inputs/BitcoinInput.vue";
import IncreaseByInput from "~/components/molecules/inputs/IncreaseByInput.vue";
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
const formData = reactive({
  betAmount: 0,
  numberOfbets: 0,
  increaseOnWin: 0,
  stopOnProfit: 0,
  IncreaseOnLoss: 0,
  stopOnLoss: 0,
  risk: risks[0].value,
});

const handleFormSubmit = () => {
  // TODO: form submit logic
};
</script>
<template>
  <form class="AutoBetForm" @submit.prevent="handleFormSubmit">
    <div class="lg:hidden g-form-item">
      <GButton>Bet</GButton>
    </div>
    <div class="g-form-item">
      <div class="flex justify-between mb-[5px] sm:mb-2.5">
        <label class="g-label">Bet Amount</label>
        <label class="g-label">0.000000 USD</label>
      </div>
      <BetAmountInput :model-value="formData.betAmount" />
    </div>
    <div class="g-form-item">
      <label class="g-label block mb-[5px] sm:mb-2.5">Number of bets</label>
      <GInputNumber :model-value="formData.numberOfbets" />
    </div>
    <div class="g-form-item">
      <label class="g-label block mb-2.5">Risk</label>
      <GSelect v-model="formData.risk" :options="risks" />
    </div>
    <div class="g-form-item">
      <label class="g-label block mb-[5px] sm:mb-2.5">On Win</label>
      <IncreaseByInput :model-value="formData.increaseOnWin" />
    </div>
    <div class="g-form-item">
      <div class="flex justify-between mb-[5px] sm:mb-2.5">
        <label class="g-label">Stop on Profit</label>
        <label class="g-label">0.000000 USD</label>
      </div>
      <BitcoinInput :model-value="formData.stopOnProfit" />
    </div>
    <div class="g-form-item">
      <label class="g-label block mb-[5px] sm:mb-2.5">On Loss</label>
      <IncreaseByInput :model-value="formData.IncreaseOnLoss" />
    </div>
    <div class="g-form-item">
      <div class="flex justify-between mb-[5px] sm:mb-2.5">
        <label class="g-label">Stop on Loss</label>
        <label class="g-label">0.000000 USD</label>
      </div>
      <BitcoinInput :model-value="formData.stopOnLoss" />
    </div>
    <div class="hidden lg:block">
      <GButton>Bet</GButton>
    </div>
  </form>
</template>
