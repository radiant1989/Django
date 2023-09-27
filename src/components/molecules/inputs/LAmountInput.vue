<script setup lang="ts">
import { GInputNumber, GButton } from "~/components/atoms";
import { SolIcon, MaticIcon } from "~/icons";
import { cryptoCurrencies, AUTH, PREFERENCE, currencyItems } from "~/constants";

const props = withDefaults(
  defineProps<{ modelValue: number; isVault: boolean; isTimer: boolean }>(),
  {
    isVault: false,
    isTimer: false,
  }
);
defineEmits<{
  (e: "update:modelValue", value: number): void;
  (e: "set:maxAmount"): void;
}>();
const route = useRoute();
const { refetch } = inject(AUTH)!;
const { preferences } = inject(PREFERENCE)!;
const totalTime = ref<number>(30);
const progressbarWidth = ref<number>(100);
let timer: NodeJS.Timeout;
const startCountdown = () => {
  timer = setInterval(() => {
    totalTime.value--;
    progressbarWidth.value = (totalTime.value / 30) * 100;
    if (totalTime.value <= 0) {
      totalTime.value = 30;
      refetch();
    }
  }, 1000);
};
onMounted(() => {
  if (props.isTimer) {
    startCountdown();
  }
});
onUnmounted(() => {
  if (props.isTimer) {
    clearInterval(timer);
  }
});
</script>
<template>
  <div class="LAmountInput relative">
    <GInputNumber
      step="any"
      placeholder="0.000000000"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :to-fixed="
        modelValue === 0 ? 0 : preferences?.displayInfiatEnabled ? 2 : 8
      "
      class="z-10"
    >
      <template #prefix v-if="preferences?.displayInfiatEnabled">
        <div class="flex h-full items-center pl-[15px] pr-1">
          <span class="text-white g-text-base">{{
            currencyItems[preferences?.activeFiatCode].text
          }}</span>
        </div>
      </template>
      <template #suffix>
        <div class="!flex gap-3 items-center">
          <div class="w-[14px] h-[14px] md:w-4 md:h-4">
            <SolIcon v-if="route.query.currency === 'SOL'" />
            <MaticIcon v-else-if="route.query.currency === 'MATIC'" />
            <svg
              class="
                w-[14px]
                h-[14px]
                md:w-4
                md:h-4
                text-steel-color
                group-hover:text-white
              "
              v-else
            >
              <use
                :xlink:href="cryptoCurrencies[route.query.currency].icon"
              ></use>
            </svg>
          </div>
          <GButton
            class="!g-text-sm !rounded-[8.5px] z-10"
            style-type="secondary"
            type="button"
            @click="$emit('set:maxAmount')"
          >
            Max
          </GButton>
        </div>
      </template>
    </GInputNumber>
    <div
      class="
        bg-[#212530]
        shadow-[0_3.04545px_8.375px_0px_rgba(0,
        0, 0,
        0.27)]
        progress-moved
        rounded-bl-[64px]
        w-[calc(100%_-_50px)]
        md:w-[calc(100%_-_70px)]
        h-2
        absolute
        left-[2px]
        bottom-[1.5px]
      "
      v-if="isTimer"
    >
      <div
        class="
          progressbar
          rounded-bl-[64px]
          w-[calc(100%_-_50px)]
          md:w-[calc(100%_-_70px)]
          h-2
          absolute
          shadow-[0px_3.04545px_8.375px_0px_rgba(0,
          0, 0,
          0.27)]
        "
      ></div>
    </div>
  </div>
</template>
<style scoped>
.progressbar {
  transition: 0.4s linear;
  transition-property: width, background-color;
}

.progress-moved .progressbar {
  background-image: linear-gradient(
    180deg,
    #343a47 0%,
    rgba(44, 49, 64, 0) 100%
  );
  animation: progress 30s infinite;
}

@keyframes progress {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}
</style>
