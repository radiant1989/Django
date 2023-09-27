<script setup lang="ts">
import {
  twitterIcon,
  instagramIcon,
  twitchIcon,
  discordIcon,
  facebookIcon,
  youtubeIcon,
  tiktokIcon,
} from "@/icons";
const links = [
  {
    icon: twitterIcon,
    iconSize: "w-6 h-5",
    to: "https://twitter.com/gamba",
  },
  {
    icon: instagramIcon,
    iconSize: "w-[23px] h-[23px]",
    to: "https://www.instagram.com/gamba",
  },
  {
    icon: twitchIcon,
    iconSize: "w-6 h-6",
    to: "https://www.twitch.tv/gambadotcom",
  },
  {
    icon: discordIcon,
    iconSize: "w-7 h-5",
    to: "https://www.discord.com",
  },
  {
    icon: youtubeIcon,
    iconSize: "w-[26px] h-[18px]",
    to: "https://www.youtube.com",
  },
  {
    icon: tiktokIcon,
    iconSize: "w-[22px] h-7",
    to: "https://www.tiktok.com",
  },
  {
    icon: facebookIcon,
    iconSize: "w-[15px] h-7",
    to: "https://www.facebook.com",
  },
];
</script>
<template>
  <div class="flex flex-col gap-5">
    <span class="text-sm md:text-base text-white">Follow Us</span>
    <div class="flex flex-row flex-wrap items-center gap-5 lg:gap-[30px]">
      <NuxtLink v-for="link in links" :to="link.to" :key="link.to">
        <svg :class="link.iconSize" class="text-steel-color">
          <use :xlink:href="link.icon" />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>
