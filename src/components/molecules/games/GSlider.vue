<script setup lang="ts">
import { RangeSlider } from "@/libraries/range-slider";

defineProps({
  modelValue: {
    type: Number,
    default: 50,
  },
});
const emits =
  defineEmits<{ (e: "update:modelValue", value: string | number): void }>();

const handleRangeValue = (value: number) => {
  emits("update:modelValue", value);
};
</script>
<template>
  <div class="w-full">
    <div class="rounded-full bg-dark-color">
      <range-slider
        :model-value="modelValue"
        :min="0"
        @update:model-value="handleRangeValue"
        :max="100"
      >
        <div class="h-2 rounded-full relative bg-secondary-color">
          <!-- preserve enough area to click on range line -->
        </div>
        <template #process>
          <div class="h-2 rounded-full bg-primary-color"></div>
        </template>
        <template #dot>
          <div
            class="
              w-[12px]
              h-[12px]
              cursor-grab
              active:cursor-grabbing
              bg-primary-gradient
              rounded-full
            "
          ></div>
        </template>
      </range-slider>
    </div>
  </div>
</template>
