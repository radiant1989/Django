<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { GInputNumber } from "~/components/atoms";
import { PREFERENCE } from "~/constants";
import { cryptoCurrencies } from "~/constants/micro-constants";
const props = withDefaults(
  defineProps<{
    static?: boolean;
    modelValue: number | string;
    isSuffix?: boolean;
    prefix?: string;
  }>(),
  {
    static: false,
    isSuffix: true,
    prefix: "",
  }
);
const { activeCryptoCode } = inject(PREFERENCE)!;
const currencyIcon = computed(
  () => cryptoCurrencies[activeCryptoCode.value ?? "BTC"].icon
);
</script>
<template>
  <div class="BetAmountInput">
    <GInputNumber
      step="0.001"
      placeholder="0.000000"
      :model-value="modelValue"
      v-bind="$attrs"
      :static="static"
      style-type="dark"
    >
      <template #prefix v-if="!isSuffix">
        <div
          class="
            flex
            h-full
            items-center
            pl-3
            lg:pl-[15px]
            pr-[5px]
            justify-start
            text-steel-color text-sm
            md:text-base
          "
        >
          {{ props.prefix }}
        </div>
      </template>
      <template #suffix v-if="isSuffix">
        <div class="flex items-center h-full pl-[15px] pr-2.5">
          <svg class="w-[14px] h-[14px] md:w-4 md:h-4">
            <use :xlink:href="currencyIcon"></use>
          </svg>
        </div>
      </template>
    </GInputNumber>
  </div>
</template>
