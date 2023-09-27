<script setup lang="ts">
import { ref, inject } from "vue";
import { GPopover, GButton, GScrollbar, GTooltip } from "~/components/atoms";
import { THEME, AUTH } from "~/constants";
import { arrowBelowIcon, localeIcon } from "~/icons";
import { GHoverDot } from "~/components/atoms";
defineProps({
  isOpened: {
    type: Boolean,
    default: false,
  },
});
const { screen } = inject(THEME)!;
const LANGUAGE_LIST = [
  "English",
  "Chinese",
  "Spanish",
  "Hindi",
  "Arabic",
  "Portuguese",
  "Russian",
  "Indonesian",
  "French",
  "Japanese",
  "Turkish",
  "Korean",
  "Polish",
  "Finnish",
];

const selectedLanguageIndex = ref<number>(0);
const selectLanguage = (index: number, close: () => void) => {
  close();
  selectedLanguageIndex.value = index;
};
</script>
<template>
  <GPopover
    :width="screen.md ? '208px' : 'calc(100vw - 40px)'"
    :arrow="false"
    :placement="isOpened ? 'bottom' : 'right'"
  >
    <template #trigger="{ open }">
      <GButton
        style-type="transparent"
        :class="[
          isOpened
            ? 'p-4 rounded-xl opened-trigger-btn shadow-dark-box'
            : 'p-0',
          open ? 'text-white' : 'text-slate-color',
        ]"
        class="group"
      >
        <div
          class="flex flex-row gap-1.5 items-center justify-between"
          v-if="isOpened"
        >
          <svg class="w-5 h-5">
            <use :xlink:href="localeIcon"></use>
          </svg>
          <div
            class="
              flex flex-row
              gap-1.5
              items-center
              justify-start
              font-medium
              text-base
            "
          >
            <span>Language:</span>
            <span>{{ LANGUAGE_LIST[selectedLanguageIndex] }}</span>
          </div>
          <svg
            class="
              w-[9px]
              h-[6px]
              transition-transform
              duration-100
              group-hover:text-white
            "
            :style="{ transform: `rotateX(${open ? '180deg' : '0deg'})` }"
            :class="open ? 'text-white' : 'text-steel-color'"
          >
            <use :xlink:href="arrowBelowIcon"></use>
          </svg>
        </div>
        <div
          class="
            flex flex-row
            items-center
            justify-center
            text-steel-color
            group-hover:text-white
          "
          v-if="!isOpened && open"
        >
          <svg class="w-5 h-5">
            <use :xlink:href="localeIcon"></use>
          </svg>
        </div>
        <GTooltip
          position="absolute"
          width="160px"
          placement="right"
          v-if="!isOpened && !open"
        >
          <template #trigger="{ open }">
            <div
              class="
                flex flex-row
                items-center
                justify-center
                text-steel-color
                group-hover:text-white
              "
            >
              <svg class="w-5 h-5">
                <use :xlink:href="localeIcon"></use>
              </svg>
            </div>
          </template>
          <template #panel>
            <div
              class="
                flex flex-row
                gap-1.5
                items-center
                justify-start
                font-medium
                text-white text-base
              "
            >
              <span>Language:</span>
              <span>{{ LANGUAGE_LIST[selectedLanguageIndex] }}</span>
            </div>
          </template>
        </GTooltip>
      </GButton>
    </template>
    <template #panel="{ open, close }">
      <div class="pr-[4px] pl-[15px] pt-[10px] pb-[5px] font-medium">
        <div class="pr-2">
          <GScrollbar height="240px" style-type="secondary">
            <div class="flex flex-col justify-between w-full gap-3">
              <div
                v-for="(item, index) in LANGUAGE_LIST"
                class="flex flex-row justify-between cursor-pointer group z-20"
                :key="index"
                v-on:click="selectLanguage(index, close)"
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
                  :class="
                    selectedLanguageIndex === index &&
                    'bg-primary-gradient bg-clip-text text-transparent'
                  "
                >
                  <label class="text-sm cursor-pointer">{{ item }}</label>
                  <GHoverDot
                    class="group-hover:block"
                    :class="
                      selectedLanguageIndex === index ? 'block' : 'hidden'
                    "
                  />
                </div>
              </div>
            </div>
          </GScrollbar>
        </div>
      </div>
    </template>
  </GPopover>
</template>
<style scoped>
.opened-trigger-btn {
  background-color: theme(colors.midnight-express-color);
}
</style>
