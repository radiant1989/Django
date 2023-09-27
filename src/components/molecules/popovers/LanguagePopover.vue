<script setup lang="ts">
import { ref } from "vue";
import { GPopover } from "~/components/atoms";
import GHoverDot from "~/components/atoms/dots/GHoverDot.vue";
import { arrowBelowIcon } from "~/icons";
import { LANGUAGE_LIST } from "~/constants/mock_data";

const selectedIndex = ref<number>(0);
const onSelect = (index: number, close: () => void) => {
  close();
  selectedIndex.value = index;
};
</script>
<template>
  <GPopover :block="true" width="108px" :arrow="true">
    <template #trigger="{ open }">
      <button
        class="
          bg-secondary-gradient
          hover:bg-secondary-hover-gradient
          rounded-sm
          border-2 border-secondary-color
          hover:border-secondary-hover-color
          shadow-dark-box
          px-2
          py-1
        "
        :class="open ? 'text-white' : 'text-steel-color hover:text-white'"
      >
        <div class="flex flex-row gap-1.5 items-center">
          <span class="text-sm">{{ LANGUAGE_LIST[selectedIndex] }}</span>
          <svg
            class="w-[9px] h-[6px] transition-transform duration-200"
            :style="{ transform: `rotateX(${open ? '180deg' : '0deg'})` }"
          >
            <use :xlink:href="arrowBelowIcon"></use>
          </svg>
        </div>
      </button>
    </template>
    <template #panel="{ open, close }">
      <div class="pr-1 pl-[15px] pt-[10px] pb-[5px]">
        <div class="flex flex-col w-full">
          <div
            v-for="(item, index) in LANGUAGE_LIST"
            class="
              flex flex-row
              justify-between
              pb-[10px]
              cursor-pointer
              group
              z-20
            "
            :key="index"
            v-on:click="onSelect(index, close)"
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
              <label
                class="
                  text-sm
                  font-medium
                  leading-[19px]
                  font-proximanova
                  cursor-pointer
                "
                >{{ item }}</label
              >
              <GHoverDot class="hidden group-hover:block" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </GPopover>
</template>
