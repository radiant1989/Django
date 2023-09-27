<script setup lang="ts">
import winTickWav from "@/public/assets/audio/Game4_CashoutMid(win).wav";
import movTickWav from "@/public/assets/audio/Game4_TickRoll6(moving).wav";
import { useTickCallback } from "~/hooks";
import { BetGameResponse } from "~/graphql/bet";
import { useGameSettingStore } from "@/store/games/settings";
const props =
  defineProps<{
    result: BetGameResponse;
  }>();
const store = useGameSettingStore();
const animation = computed(() => !store.instantbet);

const diceImages = [
  "@/public/assets/icons/Game/dice/Dice_1-2-3.svg",
  "@/public/assets/icons/Game/dice/Dice_3-6-5.svg",
  "@/public/assets/icons/Game/dice/Dice_5-2-1.svg",
];

let audio: HTMLAudioElement, movaudio: HTMLAudioElement;
const partialResult = ref();
const { tickCallback: playAudio } = useTickCallback(() => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.currentTime = 0;
  }
}, 100);
const playWinAudio = () => {
  if (partialResult.value?.roundStatus === "won") playAudio();
};
const { tickCallback: playMovAudio } = useTickCallback(() => {
  if (movaudio.paused) {
    movaudio.play();
    movaudio.addEventListener("ended", playWinAudio);
  } else {
    movaudio.currentTime = 0;
  }
}, 40);
onMounted(() => {
  // I am rendered on browser, Audio is available here
  audio = new Audio(winTickWav);
  audio.volume = store.audiovolume / 100;
  movaudio = new Audio(movTickWav);
  movaudio.volume = store.audiovolume / 100;
});
watch(
  () => props.result,
  () => {
    partialResult.value = JSON.parse(props.result?.partialResult);
    playMovAudio();
  }
);

store.$onAction(({ name, store, after }) => {
  after(() => {
    if (name === "setAudiovolume") {
      audio.volume = store.audiovolume / 100;
      movaudio.volume = store.audiovolume / 100;
    }
  });
});
onUnmounted(() => {
  movaudio.removeEventListener("ended", playWinAudio);
});
</script>

<template>
  <div
    class="relative h-12 w-full flex flex-col justify-end items-baseline mb-2"
  >
    <div
      :class="[
        'absolute flex flex-col justify-center items-center -translate-x-1/2 lg:w-[120px] w-[60px]',
        animation && 'transition-all duration-300 ease-in-out',
      ]"
      :style="[`left:${partialResult?.result?.rng ?? 50}%`]"
    >
      <p
        :class="[
          'flex items-baseline shadow-dark-box py-3 xl:w-[120px] lg:w-20 w-12 bg-[#1C202C] rounded-[10px] transition-all justify-center flex-row item-center  text-sm md:text-base font-semibold',
          partialResult?.roundStatus === 'won'
            ? 'text-primary-color'
            : 'text-third-color',
        ]"
      >
        {{ partialResult?.result?.rng ?? 50 }}
      </p>
      <img
        src="@/public/assets/icons/Game/dice/Dice_1-2-3.svg"
        class="lg:w-[50px] w-[25px] lg:h-[50px] h-[25px] z-10 top-0 left-0"
        alt="Dice"
      />
      <img
        v-if="partialResult?.roundStatus === 'won'"
        src="@/public/assets/icons/Game/dice/Rays-animated.svg"
        class="absolute z-0 lg:w-[250px] w-[125px] lg:h-[150px] h-[75px] mt-10"
        alt="Ray"
      />
    </div>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
