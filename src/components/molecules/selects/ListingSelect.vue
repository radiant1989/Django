<script setup lang="ts">
import { GSelect, GDropdownArrow } from "@/components/atoms";

type Value = string | number;
withDefaults(
  defineProps<{
    options: Array<{ label: string; value: Value }>;
    modelValue: Value;
    dropdownHeight?: string;
  }>(),
  { dropdownHeight: "176px" }
);
defineEmits<{
  (e: "update:modelValue", value: Value): void;
}>();
</script>
<template>
  <GSelect
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :options="options"
    :dropdownHeight="dropdownHeight"
  >
    <template #default="{ open, value, label }">
      <div
        class="
          h-10
          md:h-[45px]
          flex flex-col
          justify-center
          px-[13px]
          rounded-lg
          bg-secondary-gradient
          hover:bg-secondary-hover-gradient
          border-2 border-secondary-color
          text-white
        "
      >
        <div class="flex items-center group-active:scale-95">
          <span class="font-medium flex-1 text-left text-sm md:text-base mr-2">{{
            label
          }}</span>
          <GDropdownArrow :open="open" />
        </div>
      </div>
    </template>
    <!-- forward slots -->
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </GSelect>
</template>
