<script setup lang="ts">
import { GreyLogoIcon } from "~/icons";
import { Betslipdata } from "~/constants/mock_data";
defineProps({
  data: {
    type: Object as () => Betslipdata,
  },
});
</script>
<template>
  <div
    class="
      w-full
      rounded-lg
      bg-secondary-gradient
      border-t-[1px] border-secondary-color
      flex flex-col
    "
  >
    <div
      class="
        text-base
        font-medium
        text-white
        bg-[#3C4150]
        py-2.5
        pl-2.5
        rounded-t-lg
      "
    >
      {{ data?.title }}
    </div>
    <div
      class="px-2.5 py-[5px] flex flex-col gap-2 g-text-sm font-medium"
      v-for="(betslip, index) in data?.betslips"
      :key="index"
    >
      <div class="flex flex-row items-center justify-between pt-[5px]">
        <span class="text-white">Discipline</span>
        <span class="text-slate-color"> {{ betslip.discipline }}</span>
      </div>
      <div class="flex flex-row items-center justify-between">
        <span class="text-white">Match</span>
        <span class="text-slate-color"> {{ betslip.match }}</span>
      </div>
      <div class="flex flex-row items-center justify-between">
        <span class="text-white">Details</span>
        <span class="text-slate-color"> {{ betslip.details }}</span>
      </div>
      <div class="flex flex-row items-center justify-between">
        <span class="text-white">Coefficient</span>
        <span class="text-slate-color">x {{ betslip.coefficient }}</span>
      </div>
      <div class="w-full z-10 flex flex-row gap-2 items-center">
        <div
          class="
            h-[1px]
            bg-secondary-color
            w-[calc(50%_-_40px)]
            md:w-[calc(50%_-_45px)]
          "
        ></div>
        <GreyLogoIcon />
        <div
          class="
            h-[1px]
            bg-secondary-color
            w-[calc(50%_-_40px)]
            md:w-[calc(50%_-_45px)]
          "
        ></div>
      </div>
    </div>
    <div class="flex flex-col gap-2 px-2.5 pb-2.5 g-text-sm font-medium">
      <div class="flex flex-row items-center justify-between">
        <span class="text-white">Total Odds</span>
        <span class="text-slate-color">
          {{ data?.totalOdds }}
        </span>
      </div>
      <div class="flex flex-row items-center justify-between">
        <span class="text-white">Total Stake</span>
        <span class="text-slate-color">${{ data?.totalStake }}</span>
      </div>
      <div class="flex flex-row items-center justify-between">
        <span class="text-white">Payout</span>
        <span class="text-slate-color">${{ data?.payout }}</span>
      </div>
    </div>
  </div>
</template>
