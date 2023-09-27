<script setup lang="ts">
import { useTabs, TabsStyleType, TabItem } from "./hooks";

type Props = {
  styleType?: TabsStyleType;
  modelValue: string;
  tabs: TabItem[];
  barClass?: string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  styleType: "default",
  barClass: "",
  disabled: false,
});
defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const { typeClassMap } = useTabs();
const typeClass = typeClassMap[props.styleType];
const valueIndex = computed(() =>
  props.tabs.findIndex((tab) => tab.value === props.modelValue)
);
</script>
<template>
  <div class="GTabs relative">
    <div :class="['absolute inset-0', typeClass['tabs'], barClass]"></div>
    <div
      class="absolute inset-y-0 transition-all duration-300"
      :style="{
        left: `${(100 * valueIndex) / tabs.length}%`,
        width: `${100 / tabs.length}%`,
      }"
    >
      <div :class="typeClass['active']"></div>
    </div>
    <div class="relative font-medium">
      <div class="flex items-stretch">
        <div
          v-for="tabItem in tabs"
          :key="tabItem.value"
          :class="{
            'pointer-events-none': disabled || tabItem?.active === 'false',
            [`w-1/${tabs.length}`]: true,
          }"
        >
          <slot
            :option="tabItem"
            :cssClass="typeClass['tabItem']"
            :selected="tabItem.value === modelValue"
          >
            <button
              class="whitespace-nowrap text-center"
              :class="[
                typeClass['tabItem'],
                tabItem.value === modelValue && 'text-white',
              ]"
              @click="$emit('update:modelValue', tabItem.value)"
            >
              {{ tabItem.label }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
