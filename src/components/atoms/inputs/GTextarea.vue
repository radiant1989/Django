<script setup lang="ts">
defineProps({
  rows: {
    type: Number,
  },
  customClass: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <textarea
    :rows="rows"
    class="bg-dark-color shadow-dark-box rounded-lg pl-[8px] text-white"
  />
</template>
<style scoped>
textarea:focus {
  outline: none !important;
  border: 1px solid theme(colors.primary-color);
}
textarea {
  resize: none;
}
</style>
