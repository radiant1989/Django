<script setup lang="ts">
import { GTabs, TabItem, TabsStyleType } from "~/components/atoms";

type TabItemWithIcon = TabItem & {
  icon: string;
};

defineProps<{
  styleType?: TabsStyleType;
  modelValue: string;
  tabs: TabItemWithIcon[];
}>();
defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
<template>
  <GTabs :model-value="modelValue" :tabs="tabs" :style-type="styleType">
    <template #default="{ option, cssClass, selected }">
      <button
        :class="[cssClass, selected && 'text-white']"
        @click="$emit('update:modelValue', option.value)"
      >
        <div class="flex items-center gap-x-[5px] justify-center">
          <svg class="w-4 h-4 md:w-5 md:h-5">
            <use :xlink:href="option.icon"></use>
          </svg>
          <span>{{ option.label }}</span>
        </div>
      </button>
    </template>
  </GTabs>
</template>
