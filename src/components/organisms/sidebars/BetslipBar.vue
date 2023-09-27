<script setup lang="ts">
import { ref } from "vue";
import { GButton, GTabs, GScrollbar } from "~/components/atoms";
import ActiveBetslip from "~/components/molecules/notifications/ActiveBetslip.vue";
import { RIGHTBAR_STATE } from "~/constants";
import { closeBoldIcon } from "~/icons";

import { TEST_BETSLIP_DATA } from "~/constants/mock_data";
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
const tabs = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Settled",
    value: "settled",
  },
];
const selectedTab = ref<string>("active");
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

const { closeRightBar } = inject(RIGHTBAR_STATE)!;
</script>
<template>
  <div class="w-full md:w-[370px] h-full flex flex-col">
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
        <div class="font-medium text-white text-lg">Bet Slip</div>
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
      class="pr-3.5 flex flex-col items-start gap-5 md:gap-[15px] pl-5 pb-5"
      height="100%"
      id="inner-component"
    >
      <ActiveBetslip
        v-for="(data, index) in TEST_BETSLIP_DATA"
        :key="index"
        :data="data"
      />
    </GScrollbar>
    <div
      class="
        bg-black-russian-color
        items-center
        justify-center
        py-5
        z-[21]
        px-5
        hidden
        md:block
      "
    >
      <GButton style-type="primary">View All</GButton>
    </div>
  </div>
</template>
