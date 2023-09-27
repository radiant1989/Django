<script setup lang="ts">
import { closeBoldIcon } from "@/icons";
withDefaults(
  defineProps<{
    closeLabel?: string;
  }>(),
  { closeLabel: "close popup" }
);
</script>
<template>
  <button
    class="
      border-0
      duration-150
      hover:transform
      hover:-rotate-90
      hover-transition-all
      hover:ease-in-out
      hover:text-white
      text-steel-color
    "
  >
    <span class="sr-only">{{ closeLabel }}</span>
    <slot>
      <svg class="w-5 h-5">
        <use :xlink:href="closeBoldIcon"></use>
      </svg>
    </slot>
  </button>
</template>
