<template>
  <GPlacement
    :placement="placement"
    :border="border"
    :arrow="arrow"
    :trigger="trigger"
    :transition="transition"
    :leftDeviation="leftDeviation"
    :topDeviation="topDeviation"
    class="GTooltip cursor-pointer"
  >
    <template #arrow="{ before, after }">
      <div
        class="rotate-45 w-4 h-4 rounded-[3px] bg-ash border-2"
        :class="{
          'border-secondary-color shadow-popover': before,
          'border-transparent bg-clip-padding': after,
        }"
      ></div>
    </template>
    <template #trigger="{ open }">
      <slot name="trigger" :open="open"></slot>
    </template>
    <template #content="{ open, close }">
      <div
        class="py-2 px-3 bg-ash text-white text-center text-sm rounded-lg"
        :class="{ 'border-2 border-secondary-color': border }"
        :style="{ width: width }"
      >
        <slot name="panel" :open="open" :close="close"></slot>
      </div>
    </template>
  </GPlacement>
</template>
<script setup lang="ts">
import { type PlacementProps } from "./placement";
import GPlacement from "./GPlacement.vue";
const props = withDefaults(
  defineProps<PlacementProps & {
    width?: string
  }>(),
  {
    width: "max-content",
    arrow: true,
    placement: "top",
    trigger: "hover",
    border: true,
    leftDeviation: '0',
    topDeviation: '0',
  }
);
const transition = props.transition || {
  "enter-active-class": "transition duration-200 ease-out",
  "enter-from-class": "translate-y-1 opacity-0",
  "enter-to-class": "translate-y-0 opacity-100",
  "leave-active-class": "transition duration-150 ease-in",
  "leave-from-class": "translate-y-0 opacity-100",
  "leave-to-class": "translate-y-1 opacity-0",
};
</script>
