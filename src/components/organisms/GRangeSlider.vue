<script setup lang="ts">
import { reactive, watch, onMounted } from "vue";
import { RangeSlider } from "@/libraries/range-slider";
import gameTickWav from "@/public/assets/audio/game-tick.wav";
import { useTickCallback } from "~/hooks";
import { useGameSettingStore } from "@/store/games/settings";

const props = defineProps({
  audioTickInterval: {
    type: Number,
    default: 14,
  },
  audioTickVolume: {
    type: Number,
    default: 70,
  },
  modelValue: {
    type: Number,
    default: 50,
  },
  rollvalue: {
    type: Boolean,
    default: true,
  },
});
const emits =
  defineEmits<{ (e: "update:modelValue", value: string | number): void }>();

const state = reactive({
  value: 10,
});

// make sure it's null in nuxt server
let audio: HTMLAudioElement;
const store = useGameSettingStore();
const { tickCallback: playAudio } = useTickCallback(() => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.currentTime = 0;
  }
}, props.audioTickInterval);

onMounted(() => {
  // I am rendered on browser, Audio is available here
  audio = new Audio(gameTickWav);
  audio.volume = store.audiovolume / 100;
});
store.$onAction(({ name, store, after }) => {
  after(() => {
    if (name === "setAudiovolume") {
      audio.volume = store.audiovolume / 100;
    }
  });
});
watch(
  () => props.modelValue,
  () => {
    playAudio();
  }
);
const marks = [0, 25, 50, 75, 100];
const handleRangeValue = (value: number) => {
  emits("update:modelValue", value);
};
</script>
<template>
  <div class="GRangeSlider">
    <div
      class="
        p-[5px]
        md:p-2.5
        rounded-full
        bg-secondary-gradient
        relative
        w-full
      "
    >
      <div class="p-[5px] md:p-2.5 rounded-full bg-dark-color">
        <range-slider
          :model-value="modelValue"
          :min="2"
          @update:model-value="handleRangeValue"
          :max="98"
        >
          <div
            :class="[
              'h-2.5 rounded-full shadow-progress-box border-2 border-solid relative',
              rollvalue
                ? 'bg-primary-gradient border-primary-color'
                : 'border-third-color',
            ]"
            :style="!rollvalue && 'background-color: #ffdb41'"
          >
            <!-- preserve enough area to click on range line -->
            <div class="absolute -inset-2.5"></div>
          </div>
          <template #process>
            <div
              :class="[
                'h-2.5 rounded-full border-2 border-solid shadow-progress-box',
                rollvalue
                  ? 'border-third-color'
                  : 'bg-primary-gradient border-primary-color',
              ]"
              :style="rollvalue && 'background-color: #ffdb41'"
            ></div>
          </template>
          <template #dot>
            <div
              class="
                w-6
                h-6
                md:w-[30px]
                md:h-[30px]
                cursor-grab
                active:cursor-grabbing
                bg-primary-gradient
              "
              style="
                transform: matrix(0.71, -0.71, -0.71, -0.71, 0, 0);
                border-radius: 7px;
                backdrop-filter: blur(2.3172px);
                box-shadow: 0px 6.1792px 18.5376px rgba(16, 150, 87, 0.27);
                border: solid 2px rgba(255, 255, 255, 0.25);
              "
            ></div>
          </template>
        </range-slider>
      </div>
    </div>
    <div class="px-0.5">
      <div class="flex justify-between">
        <div
          v-for="mark of marks"
          :key="mark"
          class="w-8 flex flex-col items-center"
        >
          <div
            class="
              overflow-hidden
              md:w-[16px]
              md:h-[10px]
              w-[10px]
              h-[7px]
              flex
              justify-center
              items-end
              md:-mt-[7px]
              -mt-[5px]
            "
          >
            <div
              class="flex-none w-[16px] h-[10px] rounded-b-[10px]"
              style="
                background-image: linear-gradient(
                  180deg,
                  #343a47 0%,
                  #2c3140 100%
                );
              "
            ></div>
          </div>
          <div
            class="
              mt-[3px]
              md:mt-[5px]
              text-xs
              md:text-base
              text-steel-color
              font-medium
            "
          >
            {{ mark }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
