<script setup lang="ts">
import { GPopover } from "@/components/atoms";
import Calculator from "@/components/organisms/Calculator.vue";

const tiles = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
];
const selectedTiles = ref<number[]>([]);

const toggleSelect = (tile: number) => {
  if (selectedTiles.value.includes(tile)) {
    selectedTiles.value = selectedTiles.value.filter((iTile) => iTile !== tile);
  } else {
    selectedTiles.value = [...selectedTiles.value, tile];
  }
};
const hits = computed(() => [
  {
    tile: 0,
    multiplier: 0,
  },
  ...selectedTiles.value.map((tile) => ({
    tile,
    multiplier: Math.round(Math.random() * 10000) / 100,
  })),
]);
const isTileDisabled = (tile: number): boolean =>
  selectedTiles.value.length === 10 && !selectedTiles.value.includes(tile);
</script>
<template>
  <div class="KenoGame">
    <div class="max-w-[710px] mx-auto mb-[18px] lg:mb-20">
      <div class="grid grid-cols-8 gap-[3px] md:gap-2 xl:gap-2.5">
        <button
          v-for="tile in tiles"
          :class="[
            'aspect-square rounded-md',
            selectedTiles.includes(tile)
              ? 'bg-primary-gradient border-t-2 border-solid border-primary-color hover:bg-primary-hover-gradient'
              : 'bg-secondary-gradient border-t-2 border-solid border-secondary-color hover:bg-secondary-hover-gradient',
            isTileDisabled(tile) && 'opacity-70 pointer-events-none',
          ]"
          :key="tile"
          @click="toggleSelect(tile)"
          :disabled="isTileDisabled(tile)"
        ></button>
      </div>
    </div>
    <div class="py-[5px] md:py-3 px-0.5 md:px-5 rounded-md bg-secondary-gradient">
      <template v-if="selectedTiles.length > 0">
        <div
          class="flex flex-wrap xl:flex-nowrap justify-center gap-[5px] md:gap-2.5"
        >
          <div v-for="(hit, index) in hits" :key="hit.tile" class="xl:grow">
            <GPopover :border="false">
              <template #trigger>
                <div class="bg-dark-color rounded-md text-xs md:text-base">
                  <div
                    class="
                      pt-2.5
                      md:pt-2
                      px-0.5
                      md:px-2.5
                      pb-1.5
                      text-center
                      border-b border-midnight-express-color
                    "
                  >
                    <span class="text-white font-medium"
                      >{{ hit.multiplier.toFixed(2) }}x</span
                    >
                  </div>
                  <div class="pt-1.5 px-1.5 md:px-2.5 pb-2.5 md:pb-2 text-center">
                    <span class="text-steel-color font-medium whitespace-pre"
                      >{{ index }} Hits</span
                    >
                  </div>
                </div>
              </template>
              <template #panel>
                <Calculator />
              </template>
            </GPopover>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex items-center justify-center text-sm lg:text-base text-steel-color font-medium">
          <span>Select 1-10 numbers to play</span>
        </div>
      </template>
    </div>
  </div>
</template>
