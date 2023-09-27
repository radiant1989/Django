<script setup lang="ts">
import { ref } from "vue";
import { useBitcoin } from "~/hooks";
import { GButton } from "~/components/atoms";
import BetAmountInput from "~/components/molecules/inputs/BetAmountInput.vue";
import BitcoinInput from "~/components/molecules/inputs/BitcoinInput.vue";

const betAmount = ref(0);
const { dollarAmount } = useBitcoin(betAmount);

const handleSubmit = () => {};
</script>
<template>
  <form class="ManualBetForm" @submit.prevent="handleSubmit">
    <div class="g-form-item">
      <div class="flex justify-between mb-2.5">
        <label class="g-label">Bet Amount</label>
        <label class="g-label">{{ dollarAmount.toFixed(6) }} USD</label>
      </div>
      <BetAmountInput v-model="betAmount" />
    </div>
    <div class="g-form-item">
      <div class="flex justify-between mb-2.5">
        <label class="g-label">Profit on Win</label>
        <label class="g-label">0.000000 USD</label>
      </div>
      <BitcoinInput model-value="0" static />
    </div>
    <div class="mt-10">
      <GButton>Bet</GButton>
    </div>
  </form>
</template>
