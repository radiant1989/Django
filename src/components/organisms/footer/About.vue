<script setup lang="ts">
const linkClass = "cursor-pointer hover:text-white g-text-sm";
const links = [
  {
    to: "/licenses",
    label: "Licenses",
  },
  {
    to: "/policies/terms",
    label: "Terms and Conditions",
  },
  {
    to: "/policies/kyc",
    label: "Help Center",
  },
  {
    to: "/policies/responsible-gaming",
    label: "Gamble Aware",
  },
  {
    to: "/policies/privacy-policy",
    label: "Privacy Policy",
  },
  {
    to: "/sportsbook-rules",
    label: "Sportsbook Rules",
  },
  {
    to: "/aml-policy",
    label: "AML Policy",
  },
];
</script>
<template>
  <div
    class="
      flex flex-col
      gap-4
      text-sm
      items-start
      text-slate-color
      min-w-[136px]
      g-text-base
    "
  >
    <span class="text-white mb-2 g-text-base">About</span>
    <NuxtLink
      v-for="link in links"
      :to="link.to"
      :class="linkClass"
      :key="link.to"
    >
      {{ link.label }}
    </NuxtLink>
  </div>
</template>
