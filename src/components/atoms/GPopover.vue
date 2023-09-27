<script setup lang="ts">
import { type PlacementProps } from "./placement";
import GPlacement from "./GPlacement.vue";

const props = withDefaults(
  defineProps<PlacementProps & {
    block?: boolean;
    width?: string; // popover panel width
  }>(),
  {
    block: true,
    width: "max-content",
    arrow: false,
    placement: "bottom",
    trigger: "click",
    border: true,
    leftDeviation: '0',
    topDeviation: '0',
    zIndex: 300,
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
<template>
  <GPlacement
    :modelValue="modelValue"
    :placement="placement"
    :border="border"
    :arrow="arrow"
    :trigger="trigger"
    :transition="transition"
    :leftDeviation="leftDeviation"
    :topDeviation="topDeviation"
    :zIndex="zIndex"
    class="GPopover"
    :class="[!block && 'inline-block']"
    :gap="gap"
  >
    <template #trigger="{ open }">
      <slot name="trigger" :open="open"></slot>
    </template>
    <template #content="{ open, close }">
      <div
        class="
          relative
          overflow-hidden
          rounded-lg
          shadow-popover
          bg-ebony-clay-color
          text-slate-color
        "
        :class="{ 'border-2 border-ash': border }"
        :style="{ width: width }"
      >
        <slot name="panel" :open="open" :close="close"></slot>
      </div>
    </template>
  </GPlacement>
</template>
