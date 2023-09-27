<script setup lang="ts">
import { THEME } from "~/constants";
import { CONTAINER } from "~/constants";
import { useElementRect } from "~/hooks";

// TODO: should suppport Symbol type and default providerKey is CONTAINER
const props = defineProps<{
  providerKey?: string
}>();

const el = ref<HTMLDivElement>();
const { breakpoints, screen } = inject(THEME)!;
const { width, height } = useElementRect(el);
const containerScreen = computed(() => {
  return {
    width: width.value,
    height: height.value,
    sm: width.value >= breakpoints.sm,
    md: width.value >= breakpoints.md,
    lg: width.value >= breakpoints.lg,
    xl: width.value >= breakpoints.xl,
  };
});
provide(props.providerKey || CONTAINER, { containerScreen });
</script>
<template>
  <div class="ContainerProvider" ref="el">
    <slot></slot>
  </div>
</template>
