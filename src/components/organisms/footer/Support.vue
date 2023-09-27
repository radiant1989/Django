<script setup lang="ts">
const linkClass = "cursor-pointer hover:text-white g-text-sm";
const supports = [
  {
    to: "/live-support",
    label: "Live Support",
  },
  {
    to: "/profile/affiliate",
    label: "Affiliate",
  },
  {
    to: "/help-center",
    label: "Help Center",
  },
  {
    to: "/gamble-aware",
    label: "Gamble Aware",
  },
];
</script>
<template>
  <div
    class="
      flex flex-col
      items-start
      gap-4
      text-sm text-slate-color
      min-w-[93px]
    "
  >
    <span class="g-text-base text-white mb-2" to="/suport">Support</span>
    <NuxtLink
      v-for="support in supports"
      :class="linkClass"
      :to="support.to"
      active-class="text-white"
      :key="support.to"
      >{{ support.label }}</NuxtLink
    >
  </div>
</template>
