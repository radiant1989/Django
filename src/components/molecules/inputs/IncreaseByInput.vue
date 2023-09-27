<script setup lang="ts">
import { ref } from "vue";
import { GInputNumber } from "~/components/atoms";

withDefaults(
  defineProps<{
    modelValue: number | "";
    static?: boolean;
  }>(),
  {
    static: false,
  }
);

const emits =
  defineEmits<{
    (e: "update:modelValue", value: number | ""): void;
    (e: "update:reset", value: boolean | ""): void;
  }>();
const reset = ref<boolean>(true);
const handleOption = (value: boolean) => {
  reset.value = value;
  emits("update:reset", reset.value);
};
const handleAmount = (val) => {
  emits("update:modelValue", val);
};
const handleReset = () => {
  handleOption(true);
  emits("update:modelValue", 0);
};
</script>
<template>
  <GInputNumber
    :model-value="modelValue"
    @update:model-value="handleAmount"
    :static="static || reset"
  >
    <template #prefix>
      <div class="pr-2.5 h-full">
        <div
          class="
            bg-secondary-gradient
            rounded-md
            text-sm
            md:text-base
            text-steel-color
            font-medium
            h-full
            border
            md:border-2
            border-secondary-color
          "
        >
          <div class="flex items-center h-full">
            <button
              :class="[
                'md:py-2 py-[6.5px] px-2.5 hover:bg-secondary-hover-color h-full rounded-l-md hover:text-white font=semibold',
                reset && !static ? 'text-white' : 'text-danger-color',
                static && 'cursor-not-allowed',
              ]"
              :disabled="static"
              type="button"
              @click="handleReset"
            >
              Reset
            </button>
            <div class="g-divider-in-btn"></div>
            <button
              :class="[
                'md:py-2 py-[6.5px] px-2.5 hover:bg-secondary-hover-color h-full rounded-r-md hover:text-white font-semibold',
                !reset && !static ? 'text-white' : 'text-danger-color',
                static && 'cursor-not-allowed',
              ]"
              :disabled="static"
              type="button"
              @click="handleOption(false)"
            >
              Increase by
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #suffix>
      <div class="flex h-full items-center pr-[15px]">
        <span class="text-steel-color text-xs sm:text-base font-semibold"
          >%</span
        >
      </div>
    </template>
  </GInputNumber>
</template>
