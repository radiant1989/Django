<template>
  <div class="w-full h-full flex flex-row items-center justify-between">
    <div class="flex flex-row gap-4 items-center">
      <SettingPopover @open:hotkey-modal="openHotkeyModal" />
      <GTooltip position="top">
        <template #trigger>
          <div class="py-2 flex flex-row items-center">
            <GButton style-type="transparent" :block="false">
              <svg class="w-[19px] h-[12px]">
                <use :xlink:href="rectangleIcon"></use>
              </svg>
            </GButton>
          </div>
        </template>
        <template #body>
          <div
            class="
              h-[40px]
              px-[21px]
              py-[13px]
              bg-ebony-clay-color
              border-2 border-cloud-burst-color
              rounded-lg
              overflow-hidden
              relative
              text-white text-xs
              md:text-sm
              flex flex-row
              items-center
              justify-center
            "
          >
            Theatre Mode
          </div>
        </template>
      </GTooltip>
      <GTooltip position="top" class="hidden md:flex">
        <template #trigger>
          <div class="py-2 flex flex-row items-center">
            <GButton style-type="transparent" :block="false">
              <svg class="w-[16px] h-[15px]">
                <use :xlink:href="barChartIcon"></use>
              </svg>
            </GButton>
          </div>
        </template>
        <template #body>
          <div
            class="
              h-[40px]
              px-[21px]
              py-[13px]
              bg-ebony-clay-color
              border-2 border-cloud-burst-color
              rounded-lg
              overflow-hidden
              relative
              text-white text-xs
              md:text-sm
              flex flex-row
              items-center
              justify-center
            "
          >
            Live Stats
          </div>
        </template>
      </GTooltip>
      <GTooltip position="top">
        <template #trigger>
          <div class="py-2 flex flex-row items-center">
            <GButton style-type="transparent" :block="false">
              <svg class="w-[16px] h-[14px]">
                <use :xlink:href="outlineFavoriteIcon"></use>
              </svg>
            </GButton>
          </div>
        </template>
        <template #body
          ><div
            class="
              h-[40px]
              px-[21px]
              py-[13px]
              bg-ebony-clay-color
              border-2 border-cloud-burst-color
              rounded-lg
              overflow-hidden
              relative
              text-white text-xs
              md:text-sm
              flex flex-row
              items-center
              justify-center
            "
          >
            Favorite
          </div></template
        >
      </GTooltip>
    </div>

    <div>
      <GButton style-type="transparent" :block="false" class="group">
        <span
          class="
            text-steel-color
            md:text-base
            text-sm
            group-hover:text-white
            font-semibold
          "
        >
          Fairness
        </span>
      </GButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { GButton, GTooltip } from "~/components/atoms";
import SettingPopover from "~/components/molecules/popovers/games/SettingPopover.vue";
import { THEME } from "~/constants";
import {
  rectangleIcon,
  barChartIcon,
  outlineFavoriteIcon,
  minimizeViewIcon,
  dualViewIcon,
  quadViewIcon,
} from "~/icons";
const { screen } = inject(THEME)!;
watch(screen, () => {});
</script>
