<script setup lang="ts">
import { THEME } from "~/constants";
import { useWindowSize } from "~/hooks";
import Icons from "@/icons/Icons.vue";

const { width, height, ready } = useWindowSize();

// TODO: breakpoints should come from tailwind.config
const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  lxl: 1198,
  xl: 1368,
  xxl: 1440,
};
const screen = computed(() => ({
  width: width.value,
  height: height.value,
  sm: width.value >= breakpoints.sm,
  md: width.value >= breakpoints.md,
  lg: width.value >= breakpoints.lg,
  lxl: width.value >= breakpoints.lxl,
  xl: width.value >= breakpoints.xl,
}));
const muteBodyScroll = ref(0);
provide(THEME, { screen, breakpoints, muteBodyScroll });
const bodyClass = computed(() => {
  const classes = ["font-semibold"];
  if (muteBodyScroll.value > 0) {
    classes.push("overflow-hidden");
  }
  return classes.join(" ");
});
useHead({
  bodyAttrs: {
    class: bodyClass,
  },
});
watch(
  () => screen.value.width,
  (width) => {}
);
</script>
<template>
  <slot></slot>
  <Icons />
</template>
