<script setup lang="ts">
import GButton from "~/components/atoms/GButton.vue";
import Counterdown from "~/components/molecules/Counterdown.vue";
import CurrencyPopover from "../popovers/CurrencyPopover.vue";
</script>
<template>
  <div class="mt-[30px] flex flex-col gap-[15px] justify-center px-5">
    <span class="text-center text-sm text-white">Claim in</span>
    <div class="px-6 flex flex-row items-center justify-center">
      <Counterdown />
    </div>
    <div
      class="
        w-full
        flex flex-row
        items-center
        justify-center
        py-6
        bg-secondary-gradient
        rounded-lg
        divide-x-2 divide-midnight-express-color
      "
    >
      <div class="flex flex-col gap-1.5 items-center justify-center w-1/2">
        <span class="text-2xl text-white font-extrabold leading-7"
          >$412.124</span
        >
        <span class="text-xs text-steel-color">Total Wagered</span>
      </div>
      <div class="flex flex-col gap-1.5 w-1/2 items-center justify-center">
        <span class="text-2xl text-white font-extrabold leading-7"
          >Calculating</span
        >
        <span class="text-xs text-steel-color">Bonus</span>
      </div>
    </div>
    <div class="mt-2.5 flex flex-row justify-between">
      <span class="text-sm text-white">Previous Cashback</span>
      <div class="inline-flex">
        <span class="text-steel-color text-xs">Expires on:&nbsp;</span>
        <span
          class="bg-primary-gradient bg-clip-text font-medium text-xs"
          :style="{
            color: 'transparent',
          }"
        >
          January 12th, 09:43 AM
        </span>
      </div>
    </div>
    <div class="p-4 flex flex-col bg-secondary-gradient rounded-lg">
      <CurrencyPopover />
      <div
        class="
          w-full
          flex flex-row
          items-center
          justify-center
          pt-6
          pb-2
          rounded-lg
          divide-x-2 divide-midnight-express-color
        "
      >
        <div class="flex flex-col gap-1.5 items-center justify-center w-1/2">
          <span class="text-2xl text-white font-extrabold leading-7"
            >$412.124</span
          >
          <span class="text-xs text-steel-color">Total Wagered</span>
        </div>
        <div class="flex flex-col gap-1.5 w-1/2 items-center justify-center">
          <span class="text-2xl text-white font-extrabold leading-7"
            >Calculating</span
          >
          <span class="text-xs text-steel-color">Bonus</span>
        </div>
      </div>
    </div>
    <div class="mt-5 w-full px-[45px]">
      <GButton style-type="primary" class="transform"
        ><span class="inline-block transform">Claim</span></GButton
      >
    </div>
  </div>
</template>
