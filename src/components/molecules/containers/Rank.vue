<script setup lang="ts">
import { GButton, GProgressbar } from "~/components/atoms";
import CurrencyPopover from "~/components/molecules/popovers/CurrencyPopover.vue";
import { questionMarkIcon } from "~/icons";
</script>
<template>
  <div class="px-5">
    <img
      src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/images/VIP.png"
      :width="328"
      alt="VIP image loading..."
      class="mx-auto"
    />
    <div class="mt-[30px] flex flex-row">
      <GButton style-type="transparent" :block="false">
        <div
          class="
            flex flex-row
            gap-[8px]
            items-center
            justify-center
            text-slate-color
            group-hover:text-white
          "
        >
          <div class="px-[6px] py-[4px] rounded-full question-mark">
            <svg class="w-[6px] h-[10px]">
              <use :xlink:href="questionMarkIcon"></use>
            </svg>
          </div>
          <span class="text-base font-medium">Rank-Up Dual Bonus System</span>
        </div>
      </GButton>
    </div>
    <div class="mt-5 flex flex-row justify-between gap-2">
      <GButton
        style-type="primary-sm"
        class="bonus-icon border-2 border-primary-color"
        >4 &times 25%</GButton
      >
      <GButton style-type="secondary-sm" class="bonus-icon"
        >2 &times 50%</GButton
      >
      <GButton style-type="secondary-sm" class="bonus-icon"
        >1 &times 100%</GButton
      >
      <GButton style-type="secondary-sm" class="bonus-icon">Confirm</GButton>
    </div>
    <div class="mt-[30px] flex flex-col gap-2.5">
      <div class="flex flex-row justify-between">
        <div class="flex flex-row text-sm">
          <span class="text-white">Platinum &#8545; &nbsp; </span>
          <span class="text-slate-color">($412.124)</span>
        </div>
        <div class="flex flex-row text-sm">
          <span class="text-white">Platinum &#8546; &nbsp;</span>
          <span class="text-slate-color">($500.000)</span>
        </div>
      </div>
      <div
        class="
          flex flex-row
          justify-between
          gap-5
          bg-dark-color
          shadow-dark-box
          rounded-lg
          platinum
        "
      >
        <GButton style-type="primary-sm" class="border-2 border-primary-color"
          >Claim</GButton
        >
        <GButton style-type="secondary" class="border-none">25%</GButton>
        <GButton style-type="secondary" class="border-none">50%</GButton>
        <GButton style-type="secondary" class="border-none">75%</GButton>
        <GButton style-type="secondary" class="border-none">100%</GButton>
      </div>
      <div class="mt-[30px] gap-4 flex flex-col">
        <div class="flex flex-row">
          <GButton style-type="transparent" :block="false">
            <div
              class="
                flex flex-row
                gap-[8px]
                items-center
                justify-center
                text-slate-color
                group-hover:text-white
              "
            >
              <div class="px-[6px] py-[4px] rounded-full question-mark">
                <svg class="w-[6px] h-[10px]">
                  <use :xlink:href="questionMarkIcon"></use>
                </svg>
              </div>
              <span class="text-base font-medium">Custom Curated Bonus</span>
            </div>
          </GButton>
        </div>
        <div class="flex flex-row justify-between items-center gap-6">
          <img
            src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/images/platinum2.png"
            width="80"
            alt="image loading..."
          />
          <div class="flex flex-col w-1/2">
            <div class="w-full bg-midnight-express-color rounded-t-lg">
              <CurrencyPopover />
            </div>
            <div
              class="
                flex flex-row
                items-center
                justify-center
                bg-secondary-gradient
                rounded-b-lg
                w-full
              "
            >
              <span class="text-sm text-steel-color py-1.5">Claim Bonus</span>
            </div>
          </div>
          <img
            src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/images/platinum3.png"
            width="80"
            alt="image loading..."
          />
        </div>
        <div class="mt-3.5 text-center">
          <GProgressbar height="6px" :percentage="60" class="rounded-[12px]" />
          <span class="text-xs text-steel-color"
            >Unlocked at $500.000 Wagered</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.question-mark {
  background-image: linear-gradient(180deg, #343a47 0%, #2c3140 100%);
}
.bonus-icon {
  padding-top: 12px;
  padding-bottom: 12px;
}
.platinum .GButton {
  font-size: theme(fontSize.sm);
  padding: 0.75rem;
  border-radius: 7px;
}
</style>
