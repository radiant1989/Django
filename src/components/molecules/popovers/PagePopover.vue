<script setup lang="ts">
import { GPopover, GHoverDot, GButton } from "~/components/atoms";
import { arrowBelowIcon } from "~/icons";
withDefaults(
  defineProps<{
    selectedIndex: number;
  }>(),
  {
    selectedIndex: 0,
  }
);
const emits =
  defineEmits<{
    (e: "set:pagelimit", value: number): void;
  }>();
const LIST = [10, 20, 30, 40, 50];

// const selectedIndex = ref<number>(0);
const onSelect = (index: number, close: () => void) => {
  emits("set:pagelimit", index);
  close();
};
</script>
<template>
  <GPopover :block="true" width="80px" :arrow="true">
    <template #trigger="{ open }">
      <GButton style-type="transparent" :block="true">
        <div
          class="flex flex-row items-center gap-2"
          :class="
            open ? 'text-white' : 'text-steel-color group-hover:text-white'
          "
        >
          <span class="text-xs md:text-sm">{{ LIST[selectedIndex] }}</span>
          <svg
            class="w-[9px] h-[6px] transition-transform duration-200"
            :style="{ transform: `rotateX(${open ? '180deg' : '0deg'})` }"
          >
            <use :xlink:href="arrowBelowIcon"></use>
          </svg>
        </div>
      </GButton>
    </template>
    <template #panel="{ open, close }">
      <div class="pl-[15px] pt-[15px] pb-[5px] flex flex-col w-full">
        <div
          v-for="(item, index) in LIST"
          class="flex flex-row justify-between pb-[10px] cursor-pointer group"
          :key="index"
          v-on:click="onSelect(index, close)"
        >
          <div
            class="
              flex flex-row
              items-center
              gap-1.5
              text-steel-color
              group-hover:bg-primary-gradient
              group-hover:bg-clip-text
              group-hover:text-transparent
              font-semibold
            "
          >
            <label class="text-xs md:text-sm cursor-pointer">{{ item }}</label>
            <GHoverDot
              class="hidden group-hover:block"
              :class="modelValue === item && 'block'"
            />
          </div>
        </div>
      </div>
    </template>
  </GPopover>
</template>
