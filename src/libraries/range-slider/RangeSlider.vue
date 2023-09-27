<script setup lang="ts">
import { reactive, ref, computed, watch, nextTick } from "vue";
import { useDragHandler, useSliderLine } from "./hooks";
import { useElementRect } from "@/hooks";
import { roundNumberByStep } from "./utils";

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emits =
  defineEmits<{
    (e: "update:modelValue", value: number): void;
  }>();
const localValue = ref<number>(props.modelValue);
const processPercent = computed<number>(() => {
  let percent: number =
    localValue.value > 100 ? 100 : localValue.value < 0 ? 0 : localValue.value;
  return percent / (props.max + props.min);
});
const elRef = ref<HTMLDivElement | null>(null);

const { width: elWidth } = useElementRect(elRef);
const { clickOnLine } = useSliderLine({
  lineElementRef: elRef,
  onChange(processX, { event }) {
    const value = calculateValueByProcessX(processX);
    localValue.value = value;
    emits("update:modelValue", value);
    nextTick(() => {
      startDrag(event, elWidth.value * processPercent.value);
    });
  },
});

const { startDrag } = useDragHandler({
  onChange(processX) {
    const value = calculateValueByProcessX(processX);
    localValue.value = value;
    emits("update:modelValue", value);
  },
});

const calculateValueByProcessX = (processX: number): number => {
  const validProcessX = Math.max(Math.min(elWidth.value, processX), 0);
  const process = validProcessX / elWidth.value;
  return (
    props.min + roundNumberByStep((props.max - props.min) * process, props.step)
  );
};

watch(
  () => props.modelValue,
  (value) => {
    localValue.value = value;
  }
);
</script>
<template>
  <div class="RangeSlider">
    <!-- slider rail -->
    <div
      class="relative cursor-pointer"
      ref="elRef"
      @mousedown="clickOnLine($event)"
    >
      <!-- slider base -->
      <div>
        <slot></slot>
      </div>
      <!-- slider process -->
      <div
        class="absolute left-0 top-0 h-full"
        :style="{ width: `${processPercent * 100}%` }"
      >
        <slot name="process"></slot>
      </div>
      <!-- slider dot -->
      <div
        class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
        :style="{ left: `${processPercent * 100}%` }"
        @mousedown="startDrag($event, elWidth * processPercent)"
        @touchstart="startDrag($event, elWidth * processPercent)"
      >
        <slot name="dot"></slot>
      </div>
    </div>
  </div>
</template>
