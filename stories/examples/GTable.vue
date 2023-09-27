<script setup lang="ts">
import { arrowBelowIcon } from "@/icons";
import { GTransitionHeight, GPagination } from "@/components/atoms";
import { useTable } from "~/libraries/table";
import { THEME } from "~/constants";

const { screen } = inject(THEME)!;
const { table, thead, tbody, trs, th, tr, td } = useTable();
const columns = [
  "1 0 40px",
  "1 0 126px",
  "1 0 55px",
  "1 0 95px",
  "1 0 76px",
  "1 0 110px",
];
const rows = [
  {
    id: 1,
    game: "Slot",
    player: "AlexTheBeast",
    time: "4.39",
    bet: 0.000032,
    multiplier: 7,
    profit: 0.000224,
  },
  {
    id: 2,
    game: "Slot",
    player: "AlexTheBeast",
    time: "4.39",
    bet: 0.000032,
    multiplier: 7,
    profit: 0.000224,
  },
  {
    id: 3,
    game: "Slot",
    player: "AlexTheBeast",
    time: "4.39",
    bet: 0.000032,
    multiplier: 7,
    profit: 0.000224,
  },
  {
    id: 4,
    game: "Slot",
    player: "AlexTheBeast",
    time: "4.39",
    bet: 0.000032,
    multiplier: 7,
    profit: 0.000224,
  },
  {
    id: 5,
    game: "Slot",
    player: "AlexTheBeast",
    time: "4.39",
    bet: 0.000032,
    multiplier: 7,
    profit: 0.000224,
  },
  {
    id: 6,
    game: "Slot",
    player: "AlexTheBeast",
    time: "4.39",
    bet: 0.000032,
    multiplier: 7,
    profit: 0.000224,
  },
];
const modelValue = ref<number>(0);
const total = 9;
const setPageNum = (value: number) => {
  if (value >= 0 && value <= total - 1) {
    modelValue.value = value;
  }
};
</script>
<template>
  <div class="overflow-auto">
    <!-- Deskto Table -->
    <div v-if="screen.md" :class="table">
      <div class="px-5" :class="thead">
        <div class="flex items-center text-center">
          <div class="pl-5 text-left" :class="th" :style="{ flex: columns[0] }">
            GAME
          </div>
          <div :class="th" :style="{ flex: columns[1] }">PLAYER</div>
          <div :class="th" :style="{ flex: columns[2] }">TIME</div>
          <div :class="th" :style="{ flex: columns[3] }">BET</div>
          <div :class="th" :style="{ flex: columns[4] }">MULTIPLIER</div>
          <div :class="th" :style="{ flex: columns[5] }">PROFIT</div>
        </div>
      </div>
      <div class="px-5" :class="tbody">
        <div v-for="(row, index) in rows" :class="[tr, trs[index % 2]]">
          <div class="pl-5" :class="td" :style="{ flex: columns[0] }">
            {{ row.game }}
          </div>
          <div :class="td" class="flex" :style="{ flex: columns[1] }">
            <div class="min-w-[130px] mx-auto">{{ row.player }}</div>
          </div>
          <div :class="td" :style="{ flex: columns[2] }">
            <div class="text-center">{{ row.time }}</div>
          </div>
          <div :class="td" class="flex" :style="{ flex: columns[3] }">
            <div class="min-w-[100px] mx-auto">{{ row.bet.toFixed(7) }}</div>
          </div>
          <div :class="td" class="text-center" :style="{ flex: columns[4] }">
            {{ row.multiplier.toFixed(2) }}x
          </div>
          <div :class="td" class="flex" :style="{ flex: columns[5] }">
            <div class="min-w-[100px] mx-auto">{{ row.profit.toFixed(7) }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Table -->
    <div v-else :class="table">
      <div class="px-5" :class="thead">
        <div class="flex items-center text-center">
          <div :class="th" :style="{ flex: 1 }">GAME</div>
          <div :class="th" :style="{ flex: 1 }">PLAYER</div>
        </div>
      </div>
      <div class="px-5" :class="tbody">
        <div
          v-for="(row, index) in rows"
          :class="trs[index % 2]"
          class="text-center"
        >
          <GTransitionHeight v-slot="{ state, setState }">
            <div
              class="flex items-center relative"
              :class="tr"
              @click="setState(!state)"
            >
              <div class="absolute top-1/2 left-4 -translate-y-1/2">
                <svg
                  class="
                    text-white
                    w-[9px]
                    h-[6px]
                    transition-transform
                    duration-200
                  "
                  :style="{
                    transform: `rotateX(${state ? '180deg' : '0deg'})`,
                  }"
                >
                  <use :xlink:href="arrowBelowIcon"></use>
                </svg>
              </div>
              <div class="w-1/2">
                {{ row.game }}
              </div>
              <div class="w-1/2">
                {{ row.player }}
              </div>
            </div>
            <template v-if="state">
              <div
                class="flex items-center py-2.5 border-t border-secondary-color"
              >
                <div class="w-1/2">
                  <div :class="th" class="mb-2">TIME</div>
                  {{ row.time }}
                </div>
                <div class="w-1/2">
                  <div :class="th" class="mb-2">BET</div>
                  {{ row.bet }}
                </div>
              </div>
              <div
                class="flex items-center py-2.5 border-t border-secondary-color"
              >
                <div class="w-1/2">
                  <div :class="th" class="mb-2">MULTIPLIER</div>
                  <div>{{ row.multiplier.toFixed(2) }}x</div>
                </div>
                <div class="w-1/2">
                  <div :class="th" class="mb-2">PROFIT</div>
                  <div>{{ row.profit.toFixed(7) }}</div>
                </div>
              </div>
            </template>
          </GTransitionHeight>
        </div>
      </div>
    </div>
    <div
      class="
        h-[60px]
        bg-secondary-gradient
        flex flex-row
        items-center
        justify-center
      "
    >
      <GPagination
        :total="total"
        @update:model-value="setPageNum"
        :model-value="modelValue"
      />
    </div>
  </div>
</template>
