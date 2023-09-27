<script setup lang="ts">
import { ref } from "vue";
import { GPopover } from "~/components/atoms";
import GHoverDot from "~/components/atoms/dots/GHoverDot.vue";
const LIST = [
  {
    value: "tenMinute",
    label: "10 Minute",
  },
  {
    value: "hourly",
    label: "Hourly",
  },
  {
    value: "daily",
    label: "Daily",
  },
];

const selected = ref<number>(0);
const onSelect = (index: number, close: () => void) => {
  close();
  selected.value = index;
};
</script>
<template>
  <GPopover :block="true" width="120px" :arrow="true">
    <template #trigger="{ open }">
      <button
        id="popup-btn"
        :class="[
          { active: open },
          'w-full bg-midnight-express-color rounded-lg  shadow-dark-box px-5 py-[7.5px]',
        ]"
      >
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-col gap-[2px] items-start">
            <span class="text-[#8194B0] text-xxs">Frequency</span>
            <span class="text-base text-white">{{ LIST[selected].label }}</span>
          </div>
          <Transition animation="ease">
            <div class="flex items-center relative w-3.5 h-full">
              <span class="arrow"></span>
            </div>
          </Transition>
        </div>
      </button>
    </template>
    <template #panel="{ open, close }">
      <div class="pl-[15px] pt-[15px] pb-[5px] flex flex-col w-full" id="list">
        <div
          v-for="(item, index) in LIST"
          class="flex flex-row justify-between pb-[10px] cursor-pointer group"
          :key="index"
          v-on:click="onSelect(index, close)"
        >
          <div
            class="
              flex flex-row
              items-center
              gap-1.5
              text-steel-color
              group-hover:bg-primary-gradient
              group-hover:bg-clip-text
              group-hover:text-transparent
            "
          >
            <label
              class="
                text-sm
                font-medium
                leading-[19px]
                font-proximanova
                cursor-pointer
              "
              >{{ item.label }}</label
            >
            <GHoverDot class="hidden group-hover:block" />
          </div>
        </div>
      </div>
    </template>
  </GPopover>
</template>
<style scoped>
.arrow::before,
.arrow::after {
  position: relative;
  content: "";
  display: block;
  width: 6px;
  background-color: theme(colors.steel-color);
  height: 1px;
  transition: 0.2s ease-in-out;
}
.arrow::before {
  transform: rotate(45deg);
  top: 1px;
  left: 0px;
}
.arrow::after {
  left: 4px;
  top: 0px;
  transform: rotate(-45deg);
}
#popup-btn.active .arrow::before {
  transform: rotate(-45deg);
  background-color: white;
}
#popup-btn.active .arrow::after {
  transform: rotate(45deg);
  background-color: white;
}
</style>
