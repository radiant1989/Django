<script setup lang="ts">
import { GInput, GTabs, GScrollbar, GButton } from "~/components/atoms";
import GSwitch from "~/components/atoms/switches/GSwitch.vue";
import { CURRENCY_LIST } from "~/constants/mock_data";
import { searchIcon, settingsIcon } from "~/icons";
import { THEME } from "~/constants";

const tabs = [
  {
    value: "crypto",
    label: "Crypto",
  },
  {
    value: "fiat",
    label: "Fiat",
  },
];
const { screen } = inject(THEME)!;

const selectedTab = ref<string>("crypto");
const props = defineProps({
  close: {
    type: Function,
    required: true,
  },
});

const emit =
  defineEmits<{
    (e: "currency:select", value: number, close: Function): void;
  }>();

const onSelect = (index: number) => {
  emit("currency:select", index, props.close);
};
</script>
<template>
  <div class="px-4 mt-3">
    <GInput class="search-input">
      <template #suffix>
        <div class="flex items-center">
          <svg
            class="
              w-[15px]
              h-[15px]
              absolute
              top-1/2
              right-[12px]
              -translate-y-1/2
              text-white
            "
          >
            <use :xlink:href="searchIcon"></use>
          </svg>
        </div>
      </template>
    </GInput>
  </div>
  <div class="px-4 mt-4">
    <GTabs
      :tabs="tabs"
      v-model="selectedTab"
      :style-type="screen.lg ? 'default' : 'dark-sm'"
    />
  </div>
  <div class="pr-[6px]">
    <GScrollbar height="300px" style-type="secondary">
      <div
        v-for="(item, index) in CURRENCY_LIST"
        class="
          flex flex-row
          justify-between
          py-[11px]
          pl-4
          cursor-pointer
          hover:bg-secondary-color
        "
        :key="index"
        v-on:click="onSelect(index)"
      >
        <div class="flex flex-row">
          <img :src="item.src" :width="20" alt="loading..." />
          <label
            class="
              ml-2
              text-sm
              lg:text-base
              text-white
              cursor-pointer
              font-medium
            "
            >{{ item.name }}</label
          >
        </div>
        <div class="text-sm lg:text-base text-white font-medium pr-2">
          {{ item.balance }}
        </div>
      </div>
    </GScrollbar>
  </div>
  <div
    class="
      w-full
      md:h-[60px]
      h-12
      px-6
      flex
      items-center
      justify-between
      bg-secondary-gradient
      rounded-b-[10px]
    "
  >
    <GButton style-type="transparent" :block="false">
      <svg class="w-[18px] h-[18px] group-hover:text-white text-steel-color">
        <use :xlink:href="settingsIcon"></use>
      </svg>
    </GButton>
    <div class="flex flex-row gap-2">
      <label class="text-steel-color text-xs font-medium">
        View in fiat
      </label>
      <GSwitch :size="32" />
    </div>
    <div class="flex flex-row gap-2">
      <label class="text-steel-color text-xs font-medium">
        Hide zero balance
      </label>
      <GSwitch :size="32" />
    </div>
  </div>
</template>
