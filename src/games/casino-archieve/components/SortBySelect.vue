<script setup lang="ts">
import { SortBy } from "../types";
import ListingSelect from "~/components/molecules/selects/ListingSelect.vue";
import { POPULAR, AZ, ZA, NEWEST } from "../constants";
import { azIcon, newestIcon, popularIcon, zaIcon } from "@/icons";

const props =
  defineProps<{
    modelValue: SortBy;
  }>();

defineEmits<{
  (e: "update:modelValue", v: SortBy): void;
}>();

const options = [
  {
    label: "Popular",
    value: POPULAR,
    icon: popularIcon,
  },
  {
    label: "A-Z",
    value: AZ,
    icon: azIcon,
  },
  {
    label: "Z-A",
    value: ZA,
    icon: zaIcon,
  },
  {
    label: "Newest",
    value: NEWEST,
    icon: newestIcon,
  },
];
</script>
<template>
  <ListingSelect
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :options="options"
    style="min-width: 106px"
  >
    <template #option="{ option, selected, active }">
      <li
        :class="[
          'relative list-none select-none',
        ]"
      >
        <button class="ml-0 py-2 pl-2.5 cursor-pointer group">
          <div
            class="flex items-center gap-1.5 group-active:scale-95"
            :class="[selected && 'text-white', active && 'text-white/80']"
          >
            <svg class="w-4 h-4">
              <use :xlink:href="option.icon"></use>
            </svg>
            <span :class="['font-semibold', 'block truncate']">{{
              option.label
            }}</span>
          </div>
        </button>
      </li>
    </template>
  </ListingSelect>
</template>
