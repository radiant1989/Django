<script setup lang="ts">
defineProps({
  width: {
    type: Number,
  },
  rectBorder: {
    type: String,
  },
  rectBackgroundColor: {
    type: String,
  },
});
</script>
<template>
  <div
    class="Border p-[2px] rounded-lg shadow-dropdown-box"
    :style="{
      '--rect-border': `${rectBorder}`,
    }"
  >
    <div
      class="Container flex flex-col rounded-lg relative"
      :style="{ '--rect-background': rectBackgroundColor, width: `${width}px` }"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style scoped>
.Border {
  background: var(--rect-border);
}
.Container {
  background: var(--rect-background);
}
</style>
