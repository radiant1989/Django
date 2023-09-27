<script setup lang="ts">
import { GPagination, GPopover } from "~/components/atoms";
import PagePopover from "~/components/molecules/popovers/PagePopover.vue";
import { THEME } from "~/constants";
// import CurrenciesPopover from "~/components/molecules/popovers/CurrenciesPopover.vue";
import Currencies from "~/components/organisms/wallet/popovers/Currencies.vue";
const props = withDefaults(
  defineProps<{
    maxPage?: number;
    currentPageNum?: number;
    isProcess?: boolean;
  }>(),
  {
    maxPage: 0,
    currentPageNum: 0,
    isProcess: false,
  }
);
const emits =
  defineEmits<{
    (e: "set:pageLimit", value: number): void;
    (e: "set:currencyCode", value: string): void;
    (e: "set:pageNumber", value: number): void;
  }>();
const { screen } = inject(THEME)!;
const handlePageNumber = (value: number) => {
  emits("set:pageNumber", value);
};
const selectedIndex = ref<number>(0);
const handlePageLimit = (index: number) => {
  selectedIndex.value = index;
  emits("set:pageLimit", (index + 1) * 10);
};
const currency = ref<string>("ALL");
const onSelect = (code: string) => {
  currency.value = code;
  emits("set:currencyCode", code);
};
</script>
<template>
  <div
    class="
      md:h-[60px]
      h-12
      bg-secondary-gradient
      bottom-0
      absolute
      w-full
      rounded-b-[10px]
      flex flex-row
      items-center
      justify-between
      md:px-[30px]
      pl-[15px]
      pr-2
    "
  >
    <div class="flex flex-row items-center gap-2 font-semibold">
      <label class="md:text-sm text-xs text-slate-color"> Currencies: </label>
      <!-- <CurrenciesPopover
        @set:currency-code="$emit('set:currencyCode', $event)"
      /> -->
      <Currencies :model-value="currency" @update:model-value="onSelect" />
      <label class="text-sm hidden md:block text-slate-color">
        Show per page:
      </label>
      <label class="block md:hidden text-xs text-slate-color">
        Per page:
      </label>
      <PagePopover
        :selected-index="selectedIndex"
        @set:pagelimit="handlePageLimit"
        :list="[10, 20, 30, 40]"
      />
    </div>
    <GPagination
      :total="maxPage"
      :model-value="currentPageNum"
      @update:model-value="handlePageNumber"
    />
  </div>
</template>
