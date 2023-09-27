<script setup lang="ts">
import NotificationBar from "~/components/organisms/sidebars/NotificationBar.vue";
import ChatProvider from "~/components/organisms/chat/ChatProvider.vue";
import BetslipBar from "~/components/organisms/sidebars/BetslipBar.vue";
import { RIGHTBAR_STATE } from "~/constants";

const { rightbarContentType, isRightbarOpen } = inject(RIGHTBAR_STATE)!;
const widthClass = "w-[370px]";
</script>
<template>
  <div
    class="
      bg-ebony-clay-color
      shadow-sidebar
      h-screen
      right-0
      transition-all
      duration-200
      ease-in-out
    "
    :class="isRightbarOpen ? widthClass : 'w-0'"
  >
    <NotificationBar v-if="rightbarContentType === 'NOTIFICATION'" />
    <ChatProvider v-if="rightbarContentType === 'CHAT'" />
    <BetslipBar v-if="rightbarContentType === 'BETSLIP'" />
  </div>
</template>
