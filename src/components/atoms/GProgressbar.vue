<script setup lang="ts">
const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 100,
  },
  height: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div
    class="
      GProgressbar
      w-full
      bg-cloud-burst-color
      overflow-hidden
      relative
      p-[1px]
    "
    :style="{ height: props.height }"
  >
    <div class="w-full h-full bg-dark-color rounded-[inherit]"></div>
    <div
      class="
        bg-primary-gradient
        shadow-progress-box
        border-t border-t-primary-color
        box-border
        h-full
        rounded-[inherit]
        flex flex-row
        items-center
        justify-end
        absolute
        top-0
        left-0
      "
      :style="{ width: `${props.percentage}%` }"
    >
      <slot></slot>
    </div>
  </div>
</template>
