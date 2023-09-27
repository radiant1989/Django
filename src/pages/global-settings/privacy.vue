<script setup lang="ts">
import { GButton } from "~/components/atoms";
import GSwitch from "~/components/atoms/switches/GSwitch.vue";

const settings = [
  {
    key: "Enable_Ghost_Mode",
    title: "Enable Ghost Mode",
    text: "Your bets won’t appear in public bet feed and bet preview",
    checked: true,
  },
  {
    key: "Hide_all_your_Statistics",
    title: "Hide all your Statistics",
    text: "Other users won’t be able to view your wins, loses and wagered statistics",
    checked: true,
  },
  {
    key: "Refuse_Tips",
    title: "Refuse Tips",
    text: "Other users won’t be able to send you tips",
    checked: true,
  },
  {
    key: "exclude_from_Rain",
    title: "Exclude from Rain",
    text: "Prevents you from receiving a rain in chat",
    checked: true,
  },
  {
    key: "Receive_Email_Marketing",
    title: "Receive Email Marketing",
    text: "Opt out from marketing emails or offers",
    checked: true,
  },
];
</script>
<template>
  <div class="GlobalSettings-Privacy">
    <h4 class="text-sm md:text-base font-medium text-white mb-5 md:mb-[15px]">
      Privacy
    </h4>
    <p class="g-mb-md">
      User privacy is one of the core values of Gamba. These settings allow you
      to be completely anonymous from the rest of the players.
    </p>
    <ul class="">
      <li v-for="settingItem in settings" :key="settingItem.key" class="g-mb-md">
        <div class="flex gap-2.5">
          <div class="flex-none pt-0.5">
            <GSwitch :size="32" />
          </div>
          <div class="flex-1">
            <h5 class="mb-1 font-medium text-white">{{ settingItem.title }}</h5>
            <p>{{ settingItem.text }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="border-b border-[#3D4350] mb-[14px]"></div>
    <div class="md:flex items-center">
      <div class="flex-1 mb-5 md:mb-0">
        <span class="text-white font-medium">Please allow up to 30 seconds for updates to take effect.</span>
      </div>
      <div class="flex-none">
        <GButton class="min-w-button">Save</GButton>
      </div>
    </div>
  </div>
</template>
