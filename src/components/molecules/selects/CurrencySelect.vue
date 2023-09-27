<script setup lang="ts">
import {
  GPopover,
  GButton,
  GScrollbar,
  GInput,
  GDropdownArrow,
} from "~/components/atoms";
import { currencyItems as allCurrencyItems } from "@/constants";
import { arrowBelowIcon, searchIcon } from "~/icons";
const props = withDefaults(
  defineProps<{
    modelValue: string;
    inline?: boolean;
  }>(),
  { inline: false }
);
const emits =
  defineEmits<{
    (e: "update:modelValue", v: string): void;
  }>();

const currencyItems = Object.values(allCurrencyItems).filter(
  (c) => c.value !== "none"
);
const searchTerm = ref("");
const searchedItems = computed(() =>
  currencyItems.filter((c) =>
    c.label.toLocaleLowerCase().includes(searchTerm.value.toLowerCase())
  )
);
const selectedCurrency = computed(() =>
  currencyItems.find((item) => item.value === props.modelValue)
);

const onSelect = (value: string, close: () => void) => {
  emits("update:modelValue", value);
  nextTick(() => {
    close();
  });
};
</script>
<template>
  <GPopover
    :block="true"
    width="225px"
    arrow
    :gap="inline ? '20px' : 'default'"
  >
    <template #trigger="{ open }">
      <button v-if="inline" class="group block">
        <div class="flex items-center gap-x-[5px] group-active:scale-95">
          <svg class="w-[14px] h-[14px] md:w-4 md:h-4">
            <use :xlink:href="selectedCurrency?.icon" />
          </svg>
          <span
            class="
              flex-1
              font-semibold
              text-steel-color
              group-hover:text-white
              text-left text-sm
            "
            >{{ selectedCurrency?.label }}</span
          >
          <GDropdownArrow :open="open" />
        </div>
      </button>
      <GButton
        v-else
        style-type="secondary"
        class="pl-3 pr-3 md:pl-3 md:pr-3"
        style="min-width: 120px"
      >
        <div class="flex items-center gap-x-2">
          <svg class="w-[14px] h-[14px] md:w-4 md:h-4">
            <use :xlink:href="selectedCurrency?.icon" />
          </svg>
          <span
            class="
              flex-1
              font-semibold
              text-steel-color
              group-hover:text-white
              text-left text-sm
            "
            >{{ selectedCurrency?.label }}</span
          >
          <GDropdownArrow :open="open" />
        </div>
      </GButton>
    </template>
    <template #panel="{ open, close }">
      <div class="py-[13px] px-[17px]">
        <div class="mb-3">
          <GInput placeholder="Search Currency" v-model="searchTerm">
            <template #suffix>
              <div class="h-full pr-[15px] flex items-center">
                <svg class="w-[15px] h-[15px] text-white">
                  <use :xlink:href="searchIcon"></use>
                </svg>
              </div>
            </template>
          </GInput>
        </div>
        <GScrollbar
          v-if="searchedItems.length"
          height="273px"
          class="-mx-[17px]"
          style-type="content"
        >
          <div>
            <div
              v-for="item in searchedItems"
              class="py-2 cursor-pointer group z-20 px-[17px]"
              :class="{
                'bg-menu-active': item.value === modelValue,
                'hover:bg-ash': item.value !== modelValue,
              }"
              :key="item.value"
              @click="onSelect(item.value, close)"
            >
              <div class="flex flex-row gap-[6px] items-center text-white">
                <svg class="w-[14px] h-[14px] md:w-4 md:h-4 mr-1">
                  <use :xlink:href="item.icon" />
                </svg>
                <label class="g-text-base font-semibold cursor-pointer">{{
                  item.label
                }}</label>
              </div>
            </div>
          </div>
        </GScrollbar>
        <div v-else class="font-medium">Currency not avaialble</div>
      </div>
    </template>
  </GPopover>
</template>
