<script setup lang="ts">
import { GLogo } from "~/components/atoms";
import { TipIcon } from "~/icons";
import { WalletNotificationData } from "~/constants/mock_data";
defineProps({
  data: {
    type: Object as () => WalletNotificationData,
  },
});
</script>
<template>
  <div
    class="
      w-full
      rounded-lg
      bg-secondary-gradient
      border-t border-secondary-color
      p-2.5
      flex flex-col
      divide-y divide-secondary-color
      font-medium
    "
  >
    <div class="flex flex-col gap-2.5 pb-2">
      <div class="flex gap-2 justify-start items-center">
        <TipIcon />
        <span class="font-medium g-text-base text-white">{{
          data?.title
        }}</span>
      </div>
      <div class="flex justify-between items-center">
        <div class="flex gap-2.5 items-center">
          <GLogo size="sm" :width="16" />
          <span class="g-text-sm font-medium text-slate-color">
            {{ data?.receiver }}</span
          >
        </div>
        <span class="text-slate-color g-text-sm font-medium">{{
          data?.time
        }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-1 pt-2.5">
      <div
        class="
          flex
          justify-between
          items-center
          g-text-sm
          font-medium
          text-white
        "
      >
        <span>{{ data?.txType }}</span>
        <div class="flex gap-1.5 items-center">
          <img :src="data?.tokenSrc" :width="16" alt="loading..." />
          <span>
            {{ data?.tokenAmount }}
          </span>
        </div>
      </div>
      <div class="text-right text-slate-color text-xs">
        ${{ data?.usdAmount }}
      </div>
    </div>
  </div>
</template>
