<script setup lang="ts">
import { GSwitch, GTooltip, notify } from "~/components/atoms";
import CurrencySelect from "@/components/molecules/selects/CurrencySelect.vue";
import { AUTH, FUN_PLAY, REAL_PLAY, THEME, WAITING_PLAY } from "~/constants";
import {
  fullScreenViewIcon,
  rectangleIcon,
  barChartIcon,
  outlineFavoriteIcon,
  gambaIcon,
} from "~/icons";
import { SOFTSWISS_GAME } from "../constants";
const { screen } = inject(THEME)!;
const { isLoggedIn, modalVisible } = inject(AUTH)!;
const { currentPlay, fullScreen, theatreMode, currency } = inject(SOFTSWISS_GAME)!;

const isSwitchOn = computed(() => {
  if (isLoggedIn.value) {
    return [REAL_PLAY, WAITING_PLAY].includes(currentPlay.value);
  }
  return currentPlay.value === REAL_PLAY;
});
const onClickRealPlay = () => {
  if (!isLoggedIn.value) {
    currentPlay.value = REAL_PLAY;
    return;
  }
  if (currentPlay.value === WAITING_PLAY) {
    currentPlay.value = REAL_PLAY;
  } else {
    currentPlay.value = WAITING_PLAY;
  }
};
const onClickFunPlay = () => {
  if (isLoggedIn.value) {
    currentPlay.value = FUN_PLAY;
  } else {
    togglePlayType();
  }
};
const togglePlayType = () => {
  if (isLoggedIn.value) {
    if (currentPlay.value === FUN_PLAY) {
      currentPlay.value = WAITING_PLAY;
    } else {
      currentPlay.value = FUN_PLAY;
    }
  } else {
    if (currentPlay.value === FUN_PLAY) {
      currentPlay.value = REAL_PLAY;
    } else if (currentPlay.value === WAITING_PLAY) {
      currentPlay.value = REAL_PLAY;
    }
  }
};
watch(
  () => currentPlay.value,
  (currentPlayValue) => {
    if (!isLoggedIn.value && currentPlayValue === REAL_PLAY) {
      notify.error({ title: "Error", text: "Please login!" });
      setTimeout(() => {
        currentPlay.value = WAITING_PLAY;
      }, 300);
    }
  }
);
</script>

<template>
  <div class="GameFooter">
    <div
      class="
        h-[55px]
        px-5
        flex flex-col
        justify-center
        text-steel-color
        bg-secondary-gradient
      "
    >
      <div class="flex items-center gap-x-[15px]">
        <div class="flex-none">
          <button
            class="group block hover:text-white"
            @click="fullScreen = true"
          >
            <svg
              class="group-active:scale-95"
              style="width: 19px; height: 19px"
            >
              <use :xlink:href="fullScreenViewIcon"></use>
            </svg>
          </button>
        </div>
        <div class="flex-none">
          <GTooltip>
            <template #trigger>
              <button
                class="group block hover:text-white"
                @click="theatreMode = !theatreMode"
              >
                <svg
                  class="group-active:scale-95"
                  :class="{ 'text-white': theatreMode }"
                  style="width: 19px; height: 12px"
                >
                  <use :xlink:href="rectangleIcon"></use>
                </svg>
              </button>
            </template>
            <template #panel>
              <div>
                {{
                  theatreMode ? "Disable Theatre Mode" : "Enable Theatre Mode"
                }}
              </div>
            </template>
          </GTooltip>
        </div>
        <div class="flex-none">
          <GTooltip>
            <template #trigger>
              <button class="group block hover:text-white">
                <svg
                  class="group-active:scale-95"
                  style="width: 19px; height: 19px"
                >
                  <use :xlink:href="barChartIcon"></use>
                </svg>
              </button>
            </template>
            <template #panel>
              <div class="">Open Live Stats</div>
            </template>
          </GTooltip>
        </div>
        <div class="flex-none">
          <GTooltip>
            <template #trigger>
              <button class="group block hover:text-white">
                <svg
                  class="group-active:scale-95"
                  style="width: 19px; height: 19px"
                >
                  <use :xlink:href="outlineFavoriteIcon"></use>
                </svg>
              </button>
            </template>
            <template #panel>
              <div>Favourite Game</div>
            </template>
          </GTooltip>
        </div>
        <div class="flex-none" v-if="currentPlay == REAL_PLAY">
          <CurrencySelect
              v-model="currency"
              inline
            />
        </div>
        <div class="w-0.5 h-[27px] bg-dark-color"></div>
        <div class="flex-none mx-auto">
          <svg style="width: 116px; height: 23px; color: #3a404c">
            <use :xlink:href="gambaIcon"></use>
          </svg>
        </div>
        <div class="flex items-center gap-x-2">
          <button
            class="block group text-sm font-semibold"
            :class="{ 'text-white': currentPlay === FUN_PLAY }"
            @click="onClickFunPlay"
          >
            <div class="group-active:scale-95">Fun Play</div>
          </button>
          <GSwitch
            class="w-10 block"
            :class="{ 'opacity-50': currentPlay === WAITING_PLAY }"
            :model-value="isSwitchOn"
            @update:model-value="togglePlayType"
          />
          <button
            class="block group text-sm font-semibold"
            :class="{ 'text-white': currentPlay === REAL_PLAY }"
            @click="onClickRealPlay"
          >
            <div class="group-active:scale-95">Real Play</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
