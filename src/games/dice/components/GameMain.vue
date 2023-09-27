<template>
  <div class="gamestatus xl:px-[70px] lg:px-4 px-0">
    <div class="w-full">
      <RandomDice :result="betresult" />
    </div>
    <GRangeSlider
      :audio-tick-interval="40"
      :audio-tick-volume="70"
      :model-value="rangeValue"
      :rollvalue="rollover"
      @update:model-value="handleRangeValue"
      :class="gameinprocess && 'pointer-events-none'"
    />
  </div>
  <div class="calculator xl:px-[70px] lg:px-4 px-0">
    <Calculator
      :model-value="rangeValue"
      :rollvalue="rollover"
      :static="gameinprocess"
      @update:model-value="handleRangeValue"
      @roll="handleRoll"
    />
  </div>
</template>
<script setup lang="ts">
import Calculator from "~/components/organisms/Calculator.vue";
import GRangeSlider from "~/components/organisms/GRangeSlider.vue";
import RandomDice from "~/components/molecules/games/RandomDice.vue";
import { BetGameResponse } from "~/graphql/bet";
const props = withDefaults(
  defineProps<{
    betresult: BetGameResponse;
    gameinprocess: boolean;
    conditionValue: boolean;
    rangeValue: number;
  }>(),
  {
    conditionValue: false,
  }
);
const emits =
  defineEmits<{
    (e: "update:targetValue", value: number): void;
    (e: "update:conditionValue", value: boolean): void;
  }>();
const range = ref<number>(props.rangeValue);
const rollover = ref<boolean>(props.conditionValue);
const handleRoll = () => {
  rollover.value = !rollover.value;
  emits("update:conditionValue", rollover.value);
};
const handleRangeValue = (value: number | string) => {
  range.value = Number(value);
  emits("update:targetValue", range.value);
};
watch(
  () => props.conditionValue,
  () => {
    rollover.value = props.conditionValue;
  }
);
watch(
  () => props.rangeValue,
  () => {
    range.value = props.rangeValue;
  }
);
</script>
