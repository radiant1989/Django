<script setup lang="ts">
import { GLogo } from "~/components/atoms";
import { NotifyIcon } from "~/icons";
import { SysNotificationData } from "~/constants/mock_data";
defineProps({
  data: {
    type: Object as () => SysNotificationData,
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
      <div class="flex flex-row gap-2 justify-start items-center">
        <NotifyIcon />

        <span class="text-white text-base">{{ data?.title }}</span>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-row gap-2.5 items-center">
          <GLogo size="sm" :width="16" />
          <p class="g-text-sm text-slate-color">Gamba</p>
        </div>
        <span class="text-slate-color g-text-sm">{{ data?.time }}</span>
      </div>
    </div>
    <div class="pt-1 text-left">
      <span class="g-text-sm text-white">Hi {{ data?.receiver }},</span>
      <div class="flex flex-col gap-2 g-text-sm">
        <p
          class="text-slate-color"
          v-for="(sentence, index) in data?.content.split('. ')"
          :key="index"
        >
          {{ sentence }}
        </p>
        <div class="">
          <p class="text-slate-color inline-block font-medium">
            If you have any questions, you can contact to our
          </p>
          <p
            class="bg-primary-gradient bg-clip-text font-medium inline-block"
            :style="{ color: 'transparent' }"
          >
            &nbsp; manager &nbsp;
          </p>
          <p class="text-slate-color inline-block">
            and he will answer you ASAP.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.logo-outer {
  background-color: rgba(255, 255, 255, 0.1);
}
.logo {
  border-radius: 2px;
}
</style>
