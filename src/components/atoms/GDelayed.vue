<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    timeout?: number;
  }>(),
  { timeout: 100 }
);
const show = ref(false);
onMounted(() => {
  setTimeout(() => {
    show.value = true;
  }, props.timeout);
});
</script>
<template>
  <div class="GDelayed">
    <slot v-if="show"></slot>
  </div>
</template>
