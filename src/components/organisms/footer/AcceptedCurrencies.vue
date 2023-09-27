<script setup lang="ts">
import {
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
} from "@/icons";
const icons = [
  btcIcon,
  ethIcon,
  ltcIcon,
  usdtIcon,
  usdcIcon,
  xrpIcon,
  bnbIcon,
  busdIcon,
  trxIcon,
  dogeIcon,
  shibIcon,
  dotIcon,
  adaIcon,
  daiIcon,
];
</script>
<template>
  <div class="flex flex-col gap-4">
    <span class="text-sm md:text-base text-white">Accepted Currencies</span>
    <div class="flex flex-row flex-wrap gap-4">
      <svg
        class="w-[21px] h-[21px]"
        v-for="(icon, index) in icons"
        :key="index"
      >
        <use :xlink:href="icon" />
      </svg>
      <SolIcon />
      <MaticIcon />
    </div>
  </div>
</template>
