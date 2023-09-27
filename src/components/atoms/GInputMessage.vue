<template>
  <div :class="[typeClass, 'mt-2']">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: "error" | "info" | "success";
  }>(),
  { type: "error" }
);
const typeClassMap = {
  error: "text-error g-text-sm font-semibold",
  info: "g-text-sm", // TODO: style when info message is used
  success: "text-primary-color g-text-sm",
};
const typeClass = computed(() => typeClassMap[props.type]);
</script>
