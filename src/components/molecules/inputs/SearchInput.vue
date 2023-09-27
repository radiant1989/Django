<template>
  <label class="text-white text-lg mb-3 block"> Search by Username </label>
  <GInput
    :model-value="modelValue"
    style-type="dark-sm"
    placeholder="Search by Username"
  >
    <template #suffix>
      <div class="flex h-full items-center pr-[15px]">
        <svg class="w-[15px] h-[15px] text-steel-color">
          <use :xlink:href="searchIcon"></use>
        </svg>
      </div>
    </template>
  </GInput>
</template>
<script setup lang="ts">
import { GInput } from "~/components/atoms";
import { searchIcon } from "~/icons/index";
const props = defineProps(["modelValue"]);
const emits = defineEmits<{ (e: "update:modelValue", value: number): void }>();
</script>
<style scoped>
.GInput {
  height: 40px;
}
</style>
