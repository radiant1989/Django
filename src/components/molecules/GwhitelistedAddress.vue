<script setup lang="ts">
import { GButton } from "~/components/atoms";
defineProps({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  flag: {
    type: Boolean,
  },
});
</script>
<template>
  <div
    class="flex flex-row justify-between items-center px-[20px]"
    :class="
      flag
        ? 'bg-secondary-gradient ring-[2px] ring-secondary-color rounded-lg py-[12px]'
        : 'py-[18px]'
    "
  >
    <div class="flex flex-col font-proximanova font-medium leading-[16px]">
      <label class="text-sm text-[#fff]">{{ name }}</label>
      <span class="text-[12px] text-slate-color mt-[4px]">{{ address }}</span>
    </div>
    <GButton style-type="primary-sm" class="select-btn" :block="false"
      ><div style="transform: matrix(1, 0, 0, -1, 0, 0)">Select</div>
    </GButton>
  </div>
</template>
<style scoped>
.select-btn {
  transform: matrix(1, 0, 0, -1, 0, 0);
  padding: 10px 24px 10px 24px;
}
</style>
