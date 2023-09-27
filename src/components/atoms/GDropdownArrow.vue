<script setup lang="ts">
import { arrowBelowIcon } from "~/icons";

withDefaults(
  defineProps<{
    open?: boolean;
  }>(),
  {
    open: false,
  }
);
</script>
<template>
  <svg
    class="
      text-steel-color
      group-hover:text-white
      mx-auto
      w-[9px]
      h-[6px]
      transition-transform
      duration-100
    "
    :style="{
      transform: `rotateX(${open ? '180deg' : '0deg'})`,
    }"
  >
    <use :xlink:href="arrowBelowIcon"></use>
  </svg>
</template>
