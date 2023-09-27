<script setup lang="ts">
import { useTable } from "~/libraries/table";
import { THEME } from "~/constants";
import { arrowBelowIcon } from "@/icons";
import { GTransitionHeight } from "@/components/atoms";

const { screen } = inject(THEME)!;
const { table, thead, tbody, trs, th, tr, td } = useTable();
const columns = ["1 0 180px", "1 0 60px", "1 0 90px", "1 0 70px", "1 0 56px"];
const rows = [
  {
    id: 1,
    browser: "Windows 10 (Chrome 10)",
    position: "FR",
    ip: "126.53.112.421",
    last_used: "Online",
  },
  {
    id: 2,
    browser: "Windows 10 (Microsoft Edge)",
    position: "FR",
    ip: "126.53.112.421",
    last_used: "07/09/22",
  },
  {
    id: 3,
    browser: "Windows 10 (Opera)",
    position: "FR",
    ip: "126.53.112.421",
    last_used: "07/09/22",
  },
  {
    id: 4,
    browser: "Windows 10 (Microsoft Edge)",
    position: "FR",
    ip: "126.53.112.421",
    last_used: "07/09/22",
  },
  {
    id: 5,
    browser: "Windows 10 (Opera)",
    position: "FR",
    ip: "126.53.112.421",
    last_used: "07/09/22",
  },
];
const isSSR = process.server;
</script>
<template>
  <div class="GlobalSettings-ActiveSessions">
    <h4 class="text-white text-sm md:text-base g-mb-md">
      Sessions Used In Path
    </h4>
    <div v-if="isSSR || screen.md" class="hidden md:block overflow-auto w-full">
      <div :class="table" class="min-w-[600px]">
        <div :class="thead">
          <div class="flex items-center text-center">
            <div
              class="pl-5 text-left"
              :class="th"
              :style="{ flex: columns[0] }"
            >
              Browser
            </div>
            <div :class="th" :style="{ flex: columns[1] }">Position</div>
            <div :class="th" :style="{ flex: columns[2] }">IP Address</div>
            <div :class="th" :style="{ flex: columns[3] }">Last Used</div>
            <div :class="th" :style="{ flex: columns[4] }">Action</div>
          </div>
        </div>
        <div :class="tbody">
          <div v-for="(row, index) in rows" :class="[tr, trs[index % 2]]">
            <div class="pl-5" :class="td" :style="{ flex: columns[0] }">
              {{ row.browser }}
            </div>
            <div :class="td" class="text-center" :style="{ flex: columns[1] }">
              <div>{{ row.position }}</div>
            </div>
            <div :class="td" :style="{ flex: columns[2] }">
              <div class="text-center">{{ row.ip }}</div>
            </div>
            <div :class="td" class="flex" :style="{ flex: columns[3] }">
              <div class="min-w-[100px] mx-auto">{{ row.last_used }}</div>
            </div>
            <div :class="td" class="text-center" :style="{ flex: columns[4] }">
              Using
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Table -->
    <div v-if="isSSR || !screen.md" class="block md:hidden">
      <div :class="table">
        <div :class="tbody">
          <div
            v-for="(row, index) in rows"
            class="border-t border-secondary-color"
            :class="trs[1]"
          >
            <GTransitionHeight v-slot="{ state, setState }">
              <div @click="setState(!state)" :class="tr" class="cursor-pointer">
                <div class="flex-1 min-w-0">{{ row.browser }}</div>
                <div class="flex-none">
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
              </div>
              <template v-if="state">
                <div class="mb-2.5">
                  <div :class="th" class="mb-2">Browser</div>
                  <div>{{ row.browser }}</div>
                </div>
                <div class="mb-2.5">
                  <div :class="th" class="mb-2">Position</div>
                  <div>{{ row.position }}</div>
                </div>
                <div class="mb-2.5">
                  <div :class="th" class="mb-2">IP Address</div>
                  <div>{{ row.ip }}</div>
                </div>
                <div class="mb-2.5">
                  <div :class="th" class="mb-2">Last Used</div>
                  <div>{{ row.last_used }}</div>
                </div>
                <div class="pb-2.5">
                  <div :class="th" class="mb-2">Action</div>
                  <div>Using</div>
                </div>
                <!-- for make sure margin -->
              </template>
            </GTransitionHeight>
          </div>
        </div>
      </div>
      <div class="border-b border-secondary-color"></div>
    </div>
  </div>
</template>
