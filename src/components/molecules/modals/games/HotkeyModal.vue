<template>
  <div>
    <div class="pl-[30px] pr-[25px] pt-[70px] pb-[26px] flex flex-col gap-2.5">
      <div
        v-for="(item, index) in modalData"
        class="
          flex flex-row
          items-center
          text-steel-color
          justify-between
          md:gap-2.5
          gap-2
        "
      >
        <span class="md:text-sm text-xs text-steel-color font-semibold">{{
          item.description
        }}</span>
        <div
          class="
            md:text-sm
            text-xs text-white
            bg-secondary-gradient
            border-2 border-secondary-color
            rounded-lg
          "
          :class="
            index === 0
              ? ' px-[10px] py-2'
              : 'flex justify-center items-center w-[33px] h-[31px]'
          "
        >
          <span class="font-semibold">{{ item.key }}</span>
        </div>
      </div>
      <div class="flex flex-row items-center justify-center gap-2 mt-5">
        <GCheckbox
          labelClass="text-sm"
          :model-value="hotkey"
          @update:modelValue="handleHotkey"
        />
        <GButton
          style-type="transparent"
          :block="false"
          :class="[
            'md:text-base text-sm',
            hotkey ? 'text-white' : 'text-steel-color',
          ]"
          @click="handleHotkey"
          ><span class="font-semibold">Hotkeys Enabled</span>
        </GButton>
      </div>
    </div>
    <div
      class="absolute top-[30px] left-[30px] flex flex-row items-center gap-2.5"
    >
      <svg class="w-4 h-4 text-steel-color">
        <use :xlink:href="keyboardIcon"></use>
      </svg>
      <span class="text-white md:text-base text-sm font-semibold">Hotkeys</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GButton, GCheckbox } from "~/components/atoms";
import { keyboardIcon } from "~/icons";
import { useGameSettingStore } from "~/store/games/settings";
type ModalDataType = {
  description: String;
  key: String;
};
const modalData: ModalDataType[] = [
  { description: "Make a Bet", key: "Space" },
  { description: "Double Bet Amount", key: "s" },
  { description: "Half Bet Amount", key: "a" },
  { description: "Zero Bet Amount", key: "d" },
  { description: "Toggle Condition to Win", key: "q" },
  { description: "Lower the Target", key: "w" },
  { description: "Higher the Target", key: "e" },
];
const store = useGameSettingStore();
const hotkey = computed(() => store.hotkey);
const handleHotkey = () => {
  store.toggleHotkey();
};
</script>
