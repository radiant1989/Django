<script setup lang="ts">
import { GButton, GProgressbar } from "~/components/atoms";
import { useTable } from "~/libraries/table";
import UserStatistics from "./UserStatistics.vue";
import {
  userIcon,
  tipsIcon,
  roundLeftArrowIcon,
  btcIcon,
  ethIcon,
  SolIcon,
  ltcIcon,
  usdtIcon,
  usdcIcon,
  xrpIcon,
  bnbIcon,
  busdIcon,
  trxIcon,
  dogeIcon,
  shibIcon,
  MaticIcon,
  dotIcon,
  adaIcon,
  daiIcon,
} from "~/icons";
withDefaults(
  defineProps<{
    modalVisible: boolean;
  }>(),
  {
    modalVisible: false,
  }
);
const isStatisticsVisible = ref<boolean>(false);

const { table, thead, tbody, trs, th, tr, td } = useTable();
const columns = ["1 0 60px", "1 0 40px", "1 0 40px", "1 0 80px"];

const rows = [
  {
    currency: {
      icon: btcIcon,
      name: "BTC",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: ethIcon,
      name: "ETH",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: SolIcon,
      name: "SOL",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: ltcIcon,
      name: "LTC",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: usdtIcon,
      name: "USDT",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: usdcIcon,
      name: "USDC",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: xrpIcon,
      name: "XRP",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: bnbIcon,
      name: "BNB",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: busdIcon,
      name: "BUSD",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: trxIcon,
      name: "TRX",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: dogeIcon,
      name: "DOGE",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: shibIcon,
      name: "SHIB",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: MaticIcon,
      name: "MATIC",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: dotIcon,
      name: "DOT",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: adaIcon,
      name: "ADA",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
  {
    currency: {
      icon: daiIcon,
      name: "DAI",
    },
    win: 4513,
    bet: 5654,
    wagered: 1000.123123,
  },
];
const favoriteGames = [
  {
    to: "#",
    img: "https://s3.console.aws.amazon.com/s3/object/storybook-gamba?region=sa-east-1&prefix=assets/images/keno.jpg",
    title: "Fire Joker",
  },
  {
    to: "#",
    img: "https://s3.console.aws.amazon.com/s3/object/storybook-gamba?region=sa-east-1&prefix=assets/images/keno.jpg",
    title: "Fire Joker",
  },
  {
    to: "#",
    img: "https://s3.console.aws.amazon.com/s3/object/storybook-gamba?region=sa-east-1&prefix=assets/images/keno.jpg",
    title: "Fire Joker",
  },
];
</script>
<template>
  <div class="Mini-Profile font-semibold">
    <div v-if="!isStatisticsVisible">
      <div class="flex gap-2 items-center g-mb-md">
        <svg class="w-5 h-4 text-steel-color">
          <use :xlink:href="userIcon"></use>
        </svg>
        <span class="text-white g-text-base">User Details</span>
      </div>
      <div class="flex flex-col gap-[15px] items-center justify-center mb-5">
        <img
          :width="110"
          src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg"
          class="border-2 border-secondary-color rounded-lg mx-auto"
          alt="loading..."
        />
        <span class="text-white g-text-base">Username</span>
        <GButton style-type="secondary" class="!w-[110px] !p-0 !items-center">
          <div
            class="
              flex
              gap-2
              items-center
              text-steel-color
              group-hover:text-white
            "
          >
            <svg class="w-[18px] h-[18px] text-steel-color">
              <use :xlink:href="tipsIcon"></use>
            </svg>
            <span>Tip</span>
          </div>
        </GButton>
      </div>
      <div
        class="
          bg-secondary-gradient
          rounded-lg
          border-t border-t-secondary-color
          p-[15px]
          mb-5
        "
      >
        <div class="flex justify-between mb-2">
          <span class="g-text-base text-white">Rank</span>
          <GButton style-type="transparent" :block="false" type="button">
            <div
              class="
                bg-primary-gradient bg-clip-text
                g-text-sm
                text-transparent
              "
            >
              Details
            </div>
          </GButton>
        </div>
        <div class="flex gap-[15px]">
          <img
            src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/images/platinum2.png"
            width="45"
            alt="image loading..."
          />
          <div class="pt-3 flex-1">
            <GProgressbar
              height="6px"
              :percentage="60"
              class="rounded-[12px]"
            />
            <div class="mt-2.5 flex justify-between g-text-sm">
              <div>
                <span class="text-steel-color">Current: </span>
                <span class="text-white">Bronze</span>
              </div>
              <div>
                <span class="text-steel-color">Next: </span>
                <span class="text-white">Silver</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          bg-secondary-gradient
          rounded-lg
          border-t border-t-secondary-color
          p-[15px]
          mb-5
        "
      >
        <div class="flex justify-between mb-[15px] items-center">
          <span class="g-text-base text-white">Statistics</span>
          <GButton
            style-type="transparent"
            :block="false"
            type="button"
            @click="isStatisticsVisible = true"
          >
            <div
              class="
                bg-primary-gradient bg-clip-text
                g-text-sm
                text-transparent
              "
            >
              Details
            </div>
          </GButton>
        </div>
        <UserStatistics />
      </div>
      <div
        class="
          bg-secondary-gradient
          rounded-lg
          border-t border-t-secondary-color
          p-[15px]
        "
      >
        <span class="text-white g-text-base">Favorite Games</span>
        <div class="flex gap-3 mt-2.5 md:mt-5 w-full">
          <div
            class="w-1/3"
            v-for="(favorite, index) in favoriteGames"
            :key="index"
          >
            <NuxtLink :to="favorite.to">
              <img
                :src="favorite.img"
                class="rounded-[3px] border-t border-t-[rgba(255,255,255,0.2)]"
                alt="image loading..."
              />
            </NuxtLink>
            <span class="text-center mt-2.5 text-white">{{
              favorite.title
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex gap-2 mb-5">
        <GButton
          style-type="transparent"
          @click="isStatisticsVisible = false"
          :block="false"
        >
          <svg class="w-3 h-4 text-steel-color group-hover:text-white">
            <use :xlink:href="roundLeftArrowIcon"></use>
          </svg>
        </GButton>
        <span class="text-white g-text-base">User Statistics</span>
      </div>
      <div
        class="
          bg-secondary-gradient
          rounded-lg
          border-t border-t-secondary-color
          py-[15px]
          mb-5
        "
      >
        <UserStatistics />
      </div>
      <div
        class="
          bg-secondary-gradient
          rounded-lg
          border-t border-t-secondary-color
        "
      >
        <div :class="table">
          <div :class="thead">
            <div class="flex items-center text-center pt-[15px]">
              <div
                class="pl-5 text-left g-text-sm"
                :class="th"
                :style="{ flex: columns[0] }"
              >
                CURRENCY
              </div>
              <div :class="th" :style="{ flex: columns[1] }" class="g-text-sm">
                WIN
              </div>
              <div :class="th" :style="{ flex: columns[2] }" class="g-text-sm">
                BET
              </div>
              <div :class="th" :style="{ flex: columns[3] }" class="g-text-sm">
                WAGERED
              </div>
            </div>
          </div>
          <div class="py-[15px] flex flex-col gap-[15px]">
            <div
              v-for="(row, index) in rows"
              class="flex items-center"
              :id="index"
            >
              <div :class="td" class="pl-5" :style="{ flex: columns[0] }">
                <div class="flex gap-2 items-center">
                  <SolIcon v-if="row.currency.name === 'SOL'" />
                  <MaticIcon v-else-if="row.currency.name === 'MATIC'" />
                  <svg
                    class="
                      w-[21px]
                      h-[21px]
                      text-steel-color
                      group-hover:text-white
                    "
                    v-else
                  >
                    <use :xlink:href="row.currency.icon"></use>
                  </svg>
                  <span class="g-text-sm text-steel-color">{{
                    row.currency.name
                  }}</span>
                </div>
              </div>
              <div
                :class="td"
                class="justify-center"
                :style="{ flex: columns[1] }"
              >
                <div class="text-center g-text-sm">{{ row.win }}</div>
              </div>
              <div
                :class="td"
                class="justify-center"
                :style="{ flex: columns[2] }"
              >
                <div class="text-center g-text-sm">{{ row.bet }}</div>
              </div>
              <div
                :class="td"
                class="flex justify-center"
                :style="{ flex: columns[3] }"
              >
                <div class="text-center g-text-sm">{{ row.wagered }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
