<script setup lang="ts">
import { ref } from "vue";
import { GTabs, GScrollbar } from "~/components/atoms";
import SystemNotification from "~/components/molecules/notifications/SystemNotification.vue";
import WalletNotification from "~/components/molecules/notifications/WalletNotification.vue";
import { closeBoldIcon } from "~/icons";
import { RIGHTBAR_STATE } from "~/constants";
import {
  TEST_SYS_NOTIFICATION_DATA,
  TEST_WALLET_NOTIFICATION_DATA,
} from "~/constants/mock_data";

const tabs = [
  {
    label: "System",
    value: "system",
  },
  {
    label: "Wallet",
    value: "wallet",
  },
];

const selectedTab = ref<string>("system");
const { closeRightBar } = inject(RIGHTBAR_STATE)!;
const handleTouchMove = (event: TouchEvent) => {
  // Stop the touch event from propagating to the outer component
  event.stopPropagation();
};

onMounted(() => {
  // Add the touchmove event listener when the component is mounted.
  document
    .getElementById("inner-component")
    ?.addEventListener("touchmove", handleTouchMove);
});

onUnmounted(() => {
  // Remove the touchmove event listener when the component is unmounted.
  document
    .getElementById("inner-component")
    ?.removeEventListener("touchmove", handleTouchMove);
});
</script>
<template>
  <div
    class="
      h-full
      flex flex-col
      transition-all
      duration-200
      ease-in-out
      sm:w-full
      md:w-[370px]
    "
  >
    <div class="sticky top-0">
      <div
        class="
          flex
          items-center
          justify-between
          p-5
          lg:h-[90px]
          md:h-[79px]
          bg-black-russian-color
        "
      >
        <div class="font-medium text-white text-lg">Notifications</div>
        <button
          class="
            border-0
            duration-150
            hover:transform
            hover:-rotate-90
            hover-transition-all
            hover:ease-in-out
            hover:text-white
            text-steel-color
            hidden
            lxl:block
          "
          @click="closeRightBar"
        >
          <span class="sr-only">close slidear</span>
          <svg class="w-5 h-5">
            <use :xlink:href="closeBoldIcon"></use>
          </svg>
        </button>
      </div>
      <div class="p-5">
        <GTabs :tabs="tabs" v-model="selectedTab"></GTabs>
      </div>
    </div>
    <GScrollbar
      style-type="content"
      class="pr-3.5 flex flex-col items-start pl-5 h-full pb-5"
      id="inner-component"
    >
      <div class="flex flex-col gap-5 md:gap-[15px] w-full">
        <WalletNotification
          v-for="(data, index) in TEST_WALLET_NOTIFICATION_DATA"
          :data="data"
          :key="index"
          v-if="selectedTab === 'wallet'"
        />
        <SystemNotification
          v-for="(data, index) in TEST_SYS_NOTIFICATION_DATA"
          :data="data"
          :key="index"
          v-if="selectedTab === 'system'"
        />
      </div>
    </GScrollbar>
  </div>
</template>
