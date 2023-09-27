<script setup lang="ts">
import { CONTAINER } from "~/constants";

withDefaults(
  defineProps<{
    enable?: boolean;
  }>(),
  { enable: true }
);

const { containerScreen } = inject(CONTAINER)!;
const styles = computed(() => ({
  marginLeft: `calc((100% - ${containerScreen.value.width}px)/2)`,
  marginRight: `calc((100% - ${containerScreen.value.width}px)/2)`,
}));
</script>
<template>
  <div class="EscapeContainer" :style="enable ? styles : {}">
    <slot></slot>
  </div>
</template>
