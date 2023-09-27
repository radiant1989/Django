<template>
  <Footerbar :title="title" :category="category">
    <template #table>
      <div
        class="
          pt-[2px]
          lg:pt-3
          pb-5
          lg:pb-[30px]
          flex flex-col
          gap-5
          lg:gap-[30px]
          w-full
        "
      >
        <div class="w-full lg:w-[388px] px-5">
          <GTabs
            :tabs="tabs"
            :model-value="selectedTab"
            @update:modelValue="handleTab"
          />
        </div>
        <!-- Desktop Table -->
        <div class="px-5">
          <GScrollbar style-type="primary-sm">
            <div :class="table">
              <div>
                <div
                  :class="thead"
                  class="min-w-[582px] pb-[15px] mb-5 lg:mb-[30px]"
                >
                  <div class="flex flex-row px-3 lg:pl-[27px]">
                    <div
                      :class="th"
                      class="text-sm md:text-base"
                      :style="{ flex: columns[0] }"
                    >
                      PLAYER
                    </div>
                    <div
                      :class="th"
                      :style="{ flex: columns[1] }"
                      class="text-center text-sm md:text-base"
                    >
                      DATE
                    </div>
                    <div
                      :class="th"
                      :style="{ flex: columns[2] }"
                      class="text-center text-sm md:text-base"
                    >
                      BET
                    </div>
                    <div
                      :class="th"
                      :style="{ flex: columns[3] }"
                      class="text-center text-sm md:text-base"
                    >
                      MULTIPLIER
                    </div>
                    <div
                      :class="th"
                      :style="{ flex: columns[4] }"
                      class="text-center text-sm md:text-base"
                    >
                      PAYOUT
                    </div>
                  </div>
                </div>
              </div>

              <div
                :class="[
                  tbody,
                  ' overflow-auto container-snap min-w-[582px]',
                  screen.lg ? '' : 'pb-[15px]',
                ]"
              >
                <div
                  v-for="(row, index) in rows"
                  :class="[tr, trs[index % 2], 'px-3 lg:pl-[27px]']"
                >
                  <div :class="[td]" :style="{ flex: columns[0] }">
                    <div
                      class="
                        text-xs
                        md:text-sm
                        flex flex-row
                        gap-[14px]
                        items-center
                      "
                    >
                      <img src="@/public/assets/icons/Game/dice/avatar.png" />
                      {{ row?.player }}
                    </div>
                  </div>
                  <div
                    :class="td"
                    class="text-center text-xs md:text-sm"
                    :style="{ flex: columns[1] }"
                  >
                    {{ row.date }}
                  </div>
                  <div
                    :class="td"
                    class="flex justify-center"
                    :style="{ flex: columns[2] }"
                  >
                    <div
                      class="
                        flex flex-row
                        gap-1.5
                        text-center text-white text-xs
                        md:text-sm
                      "
                    >
                      {{ row.bet.toFixed(7) }}
                      <svg class="w-4 h-4 text-white">
                        <use :xlink:href="bitcoinIcon"></use>
                      </svg>
                    </div>
                  </div>
                  <div
                    :class="td"
                    class="text-center text-xs md:text-sm"
                    :style="{ flex: columns[3] }"
                  >
                    {{ row.multiplier }}X
                  </div>
                  <div
                    :class="td"
                    class="flex justify-center"
                    :style="{ flex: columns[4] }"
                  >
                    <div
                      class="
                        flex flex-row
                        gap-1.5
                        text-center text-white text-xs
                        md:text-sm
                      "
                    >
                      {{ row.payout }}
                      <svg class="w-4 h-4 text-white">
                        <use :xlink:href="bitcoinIcon"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GScrollbar>
        </div>
      </div>
    </template>
  </Footerbar>
</template>
<script setup lang="ts">
import { GTabs, GScrollbar } from "~/components/atoms";
import Footerbar from "~/components/organisms/games/Footbar.vue";
import { useTable } from "~/libraries/table";
import { bitcoinIcon } from "~/icons";
import { THEME } from "~/constants";
defineProps<{
  title: string;
  category: string;
}>();
const { table, thead, tbody, trs, th, tr, td } = useTable();
const { screen } = inject(THEME)!;
const columns = [
  "1 0 120px",
  "1 0 100px",
  "1 0 100px",
  "1 0 100px",
  "1 0 100px",
];
const rows = [
  {
    id: 1,
    player: "AlextheBeast",
    date: "Sep 5,2022",
    bet: 23.45,
    multiplier: 7,
    payout: 0.000224,
  },
  {
    id: 2,
    player: "AlextheBeast",
    date: "Sep 5,2022",
    bet: 23.45,
    multiplier: 7,
    payout: 0.000224,
  },
  {
    id: 3,
    player: "AlextheBeast",
    date: "Sep 5,2022",
    bet: 23.45,
    multiplier: 7,
    payout: 0.000224,
  },
  {
    id: 4,
    player: "AlextheBeast",
    date: "Sep 5,2022",
    bet: 23.45,
    multiplier: 7,
    payout: 0.000224,
  },
  {
    id: 5,
    player: "AlextheBeast",
    date: "Sep 5,2022",
    bet: 23.45,
    multiplier: 7,
    payout: 0.000224,
  },
];
const tabs = [
  {
    label: "Big Wins",
    value: "bigwins",
  },
  {
    label: "Lucky Wins",
    value: "lucky wins",
  },
  {
    label: "Description",
    value: "description",
  },
];
const selectedTab = ref<string>("bigwins");
const handleTab = (val: string) => {
  selectedTab.value = val;
};
</script>
