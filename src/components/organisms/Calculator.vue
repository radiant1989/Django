<template>
  <div class="Calculator bg-ash">
    <div class="flex flex-wrap -mx-3 gap-y-[15px] pt-3 pb-4 px-5">
      <div class="flex-none w-1/3 md:px-3 px-1">
        <label
          class="g-label block mb-[5px] md:text-base text-sm font-semibold"
          for="calculator_multiplier"
          >Multiplier</label
        >
        <MultiplierInput
          id="calculator-multiplier"
          :model-value="multiplier"
          @update:model-value="handleMultiplierChange"
          :static="static"
          :min="1.0102"
          :max="9900"
        />
      </div>
      <div class="flex-none w-1/3 md:px-3 px-1">
        <label
          class="g-label block mb-[5px] md:text-base text-sm font-semibold"
          for="calculator-roll-over"
          >{{ rollvalue ? "Roll Over" : "Roll Under" }}</label
        >
        <RollInput
          id="calculator-roll-over"
          :model-value="rollOver"
          @update:model-value="handleRollOverChange"
          :static="static"
        />
      </div>
      <div class="flex-none w-1/3 md:px-3 px-1">
        <label
          class="g-label block mb-[5px] md:text-base text-sm font-semibold"
          for="calculator-chance"
          >Win Chance</label
        >
        <ChanceInput
          id="calculator-chance"
          :model-value="winChance"
          @update:model-value="handleWinChanceChance"
          :static="static"
          :min="0.01"
          :max="98"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onUpdated } from "vue";
import MultiplierInput from "~/components/molecules/inputs/MultiplierInput.vue";
import ChanceInput from "~/components/molecules/inputs/ChanceInput.vue";
import RollInput from "~/components/molecules/inputs/RollInput.vue";
const props = defineProps({
  modelValue: {
    type: Number,
    default: 50,
  },
  rollvalue: {
    type: Boolean,
    default: true,
  },
  static: {
    type: Boolean,
    default: false,
  },
});
const emits =
  defineEmits<{
    (e: "update:modelValue", value: string | number): void;
    (e: "roll"): void;
  }>();

const houseEdge = ref<number>(1);
const rollOver = computed<number>(() =>
  Number(Number(props.modelValue ?? 50).toFixed(2))
);
const winChance = computed<number>(() =>
  props.rollvalue ? 100 - rollOver.value : rollOver.value
);
const multiplier = computed<number>(
  () => (100 - houseEdge.value) / winChance.value
);

const handleMultiplierChange = (v: string) => {
  let target: number;
  if (props.rollvalue) target = 100 - (100 - houseEdge.value) / Number(v);
  else target = (100 - houseEdge.value) / Number(v);
  if (props) emits("update:modelValue", target);
};
const handleRollOverChange = (v: string) => {
  emits("update:modelValue", v);
  emits("roll");
};
const handleWinChanceChance = (v: string) => {
  let target: number;
  if (props.rollvalue) target = 100 - Number(v);
  else target = Number(v);
  emits("update:modelValue", target);
};
</script>
<style scoped>
.Calculator {
  /* background-image: linear-gradient(180deg, #343a47 0%, #2c3140 100%); */
  border-radius: 7px;
}
</style>
