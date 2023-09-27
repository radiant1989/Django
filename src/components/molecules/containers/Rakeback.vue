<script setup lang="ts">
import { GProgressbar, GButton } from "~/components/atoms";
import { CURRENCY_LIST } from "~/constants/mock_data";
</script>
<template>
  <div class="flex flex-col gap-3 mt-[30px]">
    <div class="flex flex-row justify-between px-5">
      <span class="text-white text-sm leading-[17px]"
        >Your Rakeback Percentage</span
      >
      <GButton style-type="transparent" :block="false">
        <span
          class="bg-clip-text text-xxs text-transparent bg-primary-gradient p-0"
        >
          How does it work?
        </span></GButton
      >
    </div>
    <div class="w-full flex flex-col gap-2 px-5">
      <GProgressbar :percentage="65" height="30px" class="rounded-lg"
        ><span
          class="
            text-[#fff]
            leading-5
            font-medium font-proximanova
            block
            text-[15px] text-right
            pr-3
          "
          >8%</span
        >
      </GProgressbar>
      <div class="flex flex-row justify-between">
        <div class="flex flex-col gap-1 pl-[20%] items-center">
          <div class="w-1 h-2.5 bg-secondary-gradient rounded-[5px]"></div>
          <div class="text-sm text-slate-color">5%</div>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <div class="w-1 h-2.5 bg-secondary-gradient rounded-[5px]"></div>
          <div class="text-sm text-slate-color">6%</div>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <div class="w-1 h-2.5 bg-secondary-gradient rounded-[5px]"></div>
          <div class="text-sm text-slate-color">7%</div>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <div class="w-1 h-2.5 bg-secondary-gradient rounded-[5px]"></div>
          <div class="text-sm text-slate-color">8%</div>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <div class="w-1 h-2.5 bg-secondary-gradient rounded-[5px]"></div>
          <div class="text-sm text-slate-color">9%</div>
        </div>
        <div class="flex flex-col gap-1 items-center">
          <div class="w-1 h-2.5 bg-secondary-gradient rounded-[5px]"></div>
          <div class="text-sm text-slate-color">10%</div>
        </div>
      </div>
    </div>
    <div class="mt-[15px] pl-5 pr-2.5">
      <label class="text-sm text-white">Available Rakeback</label>
      <div class="mt-[px] pr-2.5 max-h-[120px] overflow-y-scroll list">
        <div class="grid grid-cols-2 justify-between gap-x-[30px] gap-y-4">
          <div
            class="flex flex-row justify-between"
            v-for="(item, index) in CURRENCY_LIST"
            :key="index"
          >
            <div class="flex flex-row gap-2.5 items-center text-xs">
              <img :src="item.src" :width="18" alt="loading..." />
              <span class="text-white">{{ item.name }}</span>
            </div>
            <span class="text-slate-color">{{ item.balance }}</span>
          </div>
        </div>
      </div>
      <div class="mt-[15px] px-[90px]">
        <GButton> Claim </GButton>
        <p class="mt-4 text-xs text-slate-color text-center">
          Refreshes every 2 minutes
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.list::-webkit-scrollbar {
  width: 2px;
  border-radius: 8px;
  background-image: white;
}
.list::-webkit-scrollbar-thumb {
  width: 2px;
  border-radius: 8px;
  border: solid 1.6px theme(backgroundImage.primary-gradient);
  background: theme(backgroundImage.primary-gradient);
  box-shadow: theme(boxShadow.primary-box);
  -webkit-backdrop-filter: blur(4.6px);
  backdrop-filter: blur(4.6px);
}
</style>
