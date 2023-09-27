<script setup lang="ts">
import { GButton } from "~/components/atoms";
import FrequencyPopover from "../popovers/FrequencyPopover.vue";
import CurrencyPopover from "../popovers/CurrencyPopover.vue";
import Counterdown from "../Counterdown.vue";
</script>
<template>
  <div class="px-5">
    <img
      src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/images/VIP.png"
      :width="328"
      alt="VIP image loading..."
      class="mx-auto"
    />
    <div class="flex flex-row items-center justify-center">
      <Counterdown />
    </div>
    <div
      class="
        mt-5
        px-[15px]
        pt-[15px]
        pb-[25px]
        flex flex-col
        items-center
        justify-center
        bg-secondary-gradient
        rounded-lg
      "
    >
      <div class="w-full grid grid-cols-2 gap-x-2.5">
        <CurrencyPopover />
        <FrequencyPopover />
      </div>
      <div
        class="
          w-full
          flex flex-row
          items-center
          justify-center
          py-6
          rounded-lg
          divide-x-2 divide-midnight-express-color
        "
      >
        <div class="flex flex-col gap-1.5 items-center justify-center w-1/2">
          <span class="text-2xl text-white font-extrabold leading-7"
            >$234.55</span
          >
          <span class="text-xs text-steel-color">Total Claimed</span>
        </div>
        <div class="flex flex-col gap-1.5 w-1/2 items-center justify-center">
          <span class="text-2xl text-white font-extrabold leading-7"
            >$12.32</span
          >
          <span class="text-xs text-steel-color">New Wagered</span>
        </div>
      </div>
      <span class="text-xs text-steel-color"
        >Your reload validity expires on</span
      >
      <span
        class="bg-primary-gradient bg-clip-text font-medium text-sm mt-2"
        :style="{
          color: 'transparent',
        }"
      >
        12/12/2022, 18:25:15
      </span>
      <div class="mt-5 w-full px-[45px]">
        <GButton style-type="primary" class="transform"
          ><span class="inline-block transform">Claim Reload</span></GButton
        >
      </div>
      <div class="flex flex-row items-end mt-4">
        <div class="text-xs text-steel-color">Learn more about &nbsp;</div>
        <GButton style-type="transparent" :block="false" class="p-0">
          <span
            class="bg-clip-text text-xs text-transparent bg-primary-gradient"
          >
            Reload
          </span></GButton
        >
      </div>
    </div>
  </div>
</template>
<style scoped>
.transform {
  transform: matrix(1, 0, 0, -1, 0, 0);
}
</style>
