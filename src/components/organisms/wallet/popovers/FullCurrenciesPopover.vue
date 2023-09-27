<script setup lang="ts">
import { GPopover, GButton, GScrollbar } from "~/components/atoms";
import { arrowBelowIcon, SolIcon, MaticIcon } from "~/icons";
import { cryptoCurrencies } from "~/constants/micro-constants";
import { THEME, CONTAINER } from "~/constants";

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
const { screen } = inject(THEME)!;
const { containerScreen } = inject(CONTAINER)!;
const onSelect = (code: string, close: Function) => {
  emit("update:modelValue", code);
  close();
};
</script>
<template>
  <GPopover
    :block="true"
    :arrow="true"
    :width="screen.md ? '461px' : `${containerScreen.width - 40}px`"
  >
    <template #trigger="{ open }">
      <GButton style-type="secondary" :block="true" type="button">
        <div class="flex flex-row justify-between gap-4 items-center">
          <div class="flex flex-row gap-2 items-center">
            <SolIcon v-if="modelValue === 'SOL'" />
            <MaticIcon v-else-if="modelValue === 'MATIC'" />
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
              <use :xlink:href="cryptoCurrencies[modelValue].icon"></use>
            </svg>
            <span
              class="g-text-base"
              :style="open ? { color: 'white' } : { color: '#858DA0' }"
              >{{ modelValue }}</span
            >
          </div>
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
      <GScrollbar height="273px" class="-mx-[17px] py-2.5" style-type="content">
        <div
          v-for="(currency, key) in cryptoCurrencies"
          class="py-2 cursor-pointer group z-20 px-[27px]"
          :class="{
            'bg-[#12151E]': key === modelValue,
            'hover:bg-secondary-hover-color': key !== modelValue,
          }"
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
                w-3.5
                md:w-4
                h-3.5
                md:h-4
                text-steel-color
                group-hover:text-white
              "
              v-else
            >
              <use :xlink:href="currency.icon"></use>
            </svg>
            <label class="g-text-base font-semibold cursor-pointer">{{
              key
            }}</label>
            <GHoverDot class="hidden group-hover:block" />
          </div>
        </div>
      </GScrollbar>
    </template>
  </GPopover>
</template>
