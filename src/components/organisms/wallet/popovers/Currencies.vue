<script setup lang="ts">
import {
  GPopover,
  GButton,
  GInput,
  GScrollbar,
  GHoverDot,
} from "~/components/atoms";
import {
  arrowBelowIcon,
  SolIcon,
  MaticIcon,
  searchIcon,
  AllIcon,
} from "~/icons";
import { cryptoCurrencies } from "~/constants/micro-constants";

withDefaults(
  defineProps<{
    modelValue: string;
  }>(),
  {
    modelValue: "BTC",
  }
);
const emit =
  defineEmits<{
    (e: "update:modelValue", value: string): void;
  }>();
const searchWord = ref<string>("");
const onSelect = (code: string, close: Function) => {
  emit("update:modelValue", code);
  searchWord.value = "";
  close();
};
const onSelectAll = (close: Function) => {
  emit("update:modelValue", "ALL");
  searchWord.value = "";
  close();
};
</script>
<template>
  <GPopover :block="true" width="225px" :arrow="true">
    <template #trigger="{ open }">
      <GButton style-type="transparent" :block="true" type="button">
        <div class="flex flex-row justify-between gap-1 items-center">
          <span
            class="g-text-sm"
            :style="open ? { color: 'white' } : { color: '#858DA0' }"
            >{{ modelValue }}</span
          >
          <svg
            class="w-[9px] h-[6px] transition-transform duration-200"
            :class="
              open ? 'text-white' : 'text-steel-color group-hover:text-white'
            "
            :style="{ transform: `rotateX(${open ? '180deg' : '0deg'})` }"
          >
            <use :xlink:href="arrowBelowIcon"></use>
          </svg>
        </div>
      </GButton>
    </template>
    <template #panel="{ open, close }">
      <div class="px-4">
        <div class="mt-3 w-full relative mb-2.5">
          <GInput placeholder="Search for Token" v-model="searchWord">
            <template #suffix>
              <svg
                class="
                  w-4
                  h-4
                  absolute
                  top-1/2
                  right-3
                  -translate-y-1/2
                  text-white
                "
              >
                <use :xlink:href="searchIcon"></use>
              </svg>
            </template>
          </GInput>
        </div>
      </div>
      <div class="pr-1.5">
        <GScrollbar height="300px" style-type="secondary">
          <div
            class="
              flex flex-row
              justify-between
              pb-[10px]
              pl-4
              cursor-pointer
              group
              z-20
            "
          >
            <div
              class="
                flex flex-row
                gap-[6px]
                items-center
                text-steel-color
                group-hover:bg-primary-gradient
                group-hover:bg-clip-text
                group-hover:text-transparent
              "
              @click="onSelectAll(close)"
            >
              <AllIcon />
              <label
                class="
                  text-xs
                  lg:text-base
                  font-medium
                  leading-[19px]
                  font-proximanova
                  cursor-pointer
                "
                >All</label
              >
              <GHoverDot class="hidden group-hover:block" />
            </div>
          </div>

          <div
            v-for="(currency, key) in cryptoCurrencies"
            class="
              flex flex-row
              justify-between
              pb-[10px]
              pl-4
              cursor-pointer
              group
              z-20
            "
            :key="key"
            v-on:click="onSelect(key, close)"
          >
            <div
              class="
                flex flex-row
                gap-[6px]
                items-center
                text-steel-color
                group-hover:bg-primary-gradient
                group-hover:bg-clip-text
                group-hover:text-transparent
              "
            >
              <SolIcon v-if="key === 'SOL'" />
              <MaticIcon v-else-if="key === 'MATIC'" />
              <svg
                class="
                  w-[14px]
                  h-[14px]
                  md:w-4
                  md:h-4
                  text-steel-color
                  group-hover:text-white
                "
                v-else
              >
                <use :xlink:href="currency.icon"></use>
              </svg>
              <label
                class="
                  text-xs
                  lg:text-base
                  font-medium
                  leading-[19px]
                  font-proximanova
                  cursor-pointer
                "
                >{{ key }}</label
              >
              <GHoverDot class="hidden group-hover:block" />
            </div>
          </div>
        </GScrollbar>
      </div>
    </template>
  </GPopover>
</template>
