<script setup lang="ts">
import { GInput } from "@/components/atoms";
import { searchIcon } from "@/icons";

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();
</script>
<template>
  <GInput
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #prefix>
      <div class="w-[57px] h-full flex items-center justify-center">
        <svg class="w-5 h-5 text-steel-color">
          <use :xlink:href="searchIcon"></use>
        </svg>
      </div>
    </template>
  </GInput>
</template>
