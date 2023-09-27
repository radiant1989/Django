<script setup lang="ts">
import { computed, ref } from "vue";
import { GDrawer } from "~/components/atoms";
import Leftbar from "~/components/organisms/sidebars/Leftbar.vue";
import NotificationBar from "./NotificationBar.vue";
import ChatProvider from "@/components/organisms/chat/ChatProvider.vue";
import BetslipBar from "./BetslipBar.vue";
import {
  casinoIcon,
  sportIcon,
  hamburgerIcon,
  chatIcon,
  searchIcon,
  sportsBetsIcon,
  betsIcon,
} from "~/icons";
import { RIGHTBAR_STATE } from "~/constants";

const route = useRoute();
const leftbarVisible = ref<boolean>(false);

const onMenuBtnClick = () => {
  leftbarVisible.value = true;
};
/**
 * The mobile menu should be closed when the link is clicked
 */
watch(
  () => route.path,
  () => {
    leftbarVisible.value = false;
  }
);
const closeMenuBar = () => {
  leftbarVisible.value = false;
};
const { isRightbarOpen, rightbarContentType, closeRightBar } =
  inject(RIGHTBAR_STATE)!;
const computedRoute = computed(() => {
  if (route.fullPath.split("/")[1] === "casino") {
    return "casino";
  } else if (route.fullPath.split("/")[1] === "sports") {
    return "sports";
  } else {
    return "other";
  }
});
const buttonClass =
  " bg-opacity-0 border-none text-steel-color text-base font-semibold flex flex-col gap-1.5 items-center justify-center hover:text-white active:scale-95";

const openChatBar = () => {
  rightbarContentType.value = "CHAT";
};
const openBetslipBar = () => {
  rightbarContentType.value = "BETSLIP";
};
</script>
<template>
  <div
    class="
      fixed
      bottom-0
      h-16
      bg-black-russian-color
      w-screen
      grid grid-cols-5
      px-10
      z-50
    "
  >
    <!--TO DO: The GButton component should be updated for providing this type of layout.-->
    <button :class="buttonClass" @click="onMenuBtnClick">
      <svg class="w-[15px] h-[12px]">
        <use :xlink:href="hamburgerIcon"></use>
      </svg>
      <span class="text-xs">Menu</span>
    </button>
    <button :class="buttonClass">
      <svg class="w-[15px] h-[12px]">
        <use :xlink:href="searchIcon"></use>
      </svg>
      <span class="text-xs">Search</span>
    </button>
    <button :class="buttonClass" @click="openChatBar">
      <svg class="w-[15px] h-[12px]">
        <use :xlink:href="chatIcon"></use>
      </svg>
      <span class="text-xs">Chat</span>
    </button>
    <button
      :class="buttonClass"
      v-if="computedRoute === 'sports'"
      @click="openBetslipBar"
    >
      <svg class="w-[15px] h-[12px]">
        <use :xlink:href="sportsBetsIcon"></use>
      </svg>
      <span class="text-xs">Bet Slip</span>
    </button>
    <button :class="buttonClass" v-if="computedRoute === 'casino'">
      <svg class="w-[15px] h-[12px]">
        <use :xlink:href="betsIcon"></use>
      </svg>
      <span class="text-xs">Bets</span>
    </button>
    <NuxtLink
      to="/casino/home"
      :class="buttonClass"
      v-if="computedRoute !== 'casino'"
    >
      <svg class="w-[15px] h-[12px]">
        <use :xlink:href="casinoIcon"></use>
      </svg>
      <span class="text-xs">Casino</span>
    </NuxtLink>

    <NuxtLink
      to="/sports/home"
      :class="buttonClass"
      v-if="computedRoute !== 'sports'"
    >
      <svg class="w-[15px] h-[12px]">
        <use :xlink:href="sportIcon"></use>
      </svg>
      <span class="text-xs">Sports</span>
    </NuxtLink>
  </div>
  <GDrawer
    v-model="leftbarVisible"
    @close:menu="closeMenuBar"
    placement="left"
    width="100%"
    :close-position="{
      top: '30px',
      right: '20px',
    }"
  >
    <Leftbar :is-opened="true" :width="'100%'" />
  </GDrawer>
  <GDrawer
    :model-value="isRightbarOpen"
    placement="right"
    width="100%"
    @update:model-value="closeRightBar"
  >
    <NotificationBar v-if="rightbarContentType === 'NOTIFICATION'" />
    <ChatProvider v-if="rightbarContentType === 'CHAT'" />
    <BetslipBar v-if="rightbarContentType === 'BETSLIP'" />
  </GDrawer>
</template>
