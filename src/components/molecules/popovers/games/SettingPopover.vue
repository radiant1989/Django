<template>
  <GPopover
    :arrow="true"
    :placement="placement"
    position="absolute"
    :leftDeviation="placement === 'bottomLeft' ? '-20px' : ''"
  >
    <template #trigger="{ open }">
      <div class="flex items-center">
        <GTooltip
          placement="top"
          :arrow="screen.md ? true : false"
          :border="true"
        >
          <template #trigger>
            <div class="py-2 flex flex-row items-center">
              <GButton style-type="transparent" :block="false">
                <svg class="w-4 h-4">
                  <use :xlink:href="gameSettingIcon"></use>
                </svg>
              </GButton>
            </div>
          </template>
          <template #panel>
            <div
              class="
                text-white text-xs
                md:text-sm
                hidden
                md:flex
                whitespace-nowrap
                font-semibold
              "
            >
              Game Settings
            </div>
          </template>
        </GTooltip>
      </div>
    </template>
    <template #panel="{ open, close }">
      <div class="flex flex-col gap-1.5 py-2.5">
        <div class="flex flex-row items-center h-[24px] gap-2.5 px-4">
          <GButton style-type="transparent" :block="false" @click="mute">
            <svg
              :class="[
                'w-[15px] h-[15px]',
                volume === 0 ? 'text-steel-color' : 'text-primary-color',
              ]"
            >
              <use :xlink:href="musicIcon"></use>
            </svg>
          </GButton>
          <GSlider
            :model-value="volume"
            @update:model-value="handleRangeValue"
          />
        </div>
        <div
          class="
            hover:bg-secondary-hover-color
            h-[24px]
            md:flex
            hidden
            flex-row
            items-center
            gap-2
            px-4
          "
          @click="openHotkyModal(close)"
        >
          <svg class="w-[15px] h-[15px] text-steel-color">
            <use :xlink:href="keyboardIcon"></use>
          </svg>
          <GButton
            style-type="transparent"
            :block="false"
            class="text-white md:text-sm text-xs font-semibold"
          >
            Hotkeys
          </GButton>
        </div>
        <div
          class="
            hover:bg-secondary-hover-color
            flex flex-row
            items-center
            h-[24px]
            gap-2
            px-4
          "
        >
          <GCheckbox
            labelClass="text-sm"
            :model-value="instantBet"
            @update:modelValue="handleInstantBet"
          />
          <GButton
            style-type="transparent"
            :block="false"
            class="text-white md:text-sm text-xs font-semibold"
            @click="handleInstantBet"
            >Instant Bets
          </GButton>
        </div>
      </div>
    </template>
  </GPopover>
</template>
<script setup lang="ts">
import { GPopover, GButton, GTooltip, GCheckbox } from "~/components/atoms";
import { gameSettingIcon, keyboardIcon, musicIcon } from "~/icons";
import GSlider from "~/components/molecules/games/GSlider.vue";
import { THEME } from "~/constants";
import { useGameSettingStore } from "@/store/games/settings";
const router = useRouter();
const openHotkyModal = (close: any) => {
  // emits("open:hotkeyModal");
  router.push({
    path: router.currentRoute.value.path,
    query: {
      modal: "hotkey",
    },
  });
  close();
};
const store = useGameSettingStore();
const { screen } = inject(THEME)!;
const placement = computed(() => (screen.value.md ? "bottom" : "bottomLeft"));
const volume = computed(() => store.audiovolume);
const mute = () => {
  store.setAudiovolume(0);
};
const handleRangeValue = (value: number) => {
  store.setAudiovolume(value);
};
const instantBet = computed(() => store.instantbet);
const handleInstantBet = () => {
  store.toggelInstantbet();
};
</script>
