<script setup lang="ts">
import { roundLeftArrowIcon, roundRightArrowIcon } from "~/icons";

const props = withDefaults(
  defineProps<{
    total: number;
    modelValue: number;
  }>(),
  { total: 0, modelValue: 0 }
);
const emits =
  defineEmits<{
    (e: "update:modelValue", value: number): void;
  }>();
const onInput = (e: Event) => {
  emits("update:modelValue", e.target.value - 1);
};
watch(
  () => props.total,
  (val) => {
    console.log(props.modelValue, val);
  }
);
</script>
<template>
  <div class="flex items-center md:gap-2.5 gap-1">
    <button
      class="
        w-[25px]
        h-[25px]
        md:w-[30px]
        md:h-[30px]
        rounded-full
        border-2 border-steel-color
        flex
        items-center
        justify-center
        hover:border-white
        group
        disabled:hover:border-steel-color
        disabled:hover:cursor-not-allowed
      "
      id="prev"
      @click="$emit('update:modelValue', modelValue - 1)"
      :disabled="modelValue === 0"
    >
      <div class="flex flex-row items-center justify-center">
        <svg
          class="text-steel-color"
          :class="[
            'w-1.5 h-[9px]',
            modelValue === 0
              ? 'group-hover:text-steel-color'
              : 'group-hover:text-white',
          ]"
        >
          <use :xlink:href="roundLeftArrowIcon"></use>
        </svg>
      </div>
    </button>
    <div class="md:w-[30px] md:h-[30px] w-[25px] h-[25px]">
      <input
        class="
          w-full
          h-full
          focus:ring-0
          focus:outline-none
          bg-dark-color
          shadow-dark-box
          rounded-[6px]
          text-white text-center
        "
        type="number"
        :min="1"
        :max="total"
        :value="modelValue + 1"
        @input="onInput"
      />
    </div>
    <button
      :disabled="modelValue === total"
      class="
        w-[25px]
        h-[25px]
        md:w-[30px]
        md:h-[30px]
        rounded-full
        border-2 border-steel-color
        flex
        items-center
        justify-center
        group
        disabled:hover:border-steel-color
        disabled:hover:cursor-not-allowed
        hover:border-white
      "
      id="next"
      @click="$emit('update:modelValue', modelValue + 1)"
    >
      <svg
        class="text-steel-color"
        :class="[
          'w-1.5 h-[9px]',
          modelValue === total
            ? 'group-hover:text-steel-color'
            : 'group-hover:text-white',
        ]"
      >
        <use :xlink:href="roundRightArrowIcon"></use>
      </svg>
    </button>
  </div>
</template>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
