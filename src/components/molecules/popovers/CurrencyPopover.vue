<script setup lang="ts">
import { ref } from "vue";
import { GPopover } from "~/components/atoms";
import GHoverDot from "~/components/atoms/dots/GHoverDot.vue";
import { CURRENCY_LIST } from "~/constants/mock_data";

const selectedIndex = ref<number>(0);
const onSelect = (index: number, close: () => void) => {
  close();
  selectedIndex.value = index;
};
</script>
<template>
  <GPopover :block="true" width="170px" :arrow="false">
    <template #trigger="{ open }">
      <button
        id="popup-btn"
        :class="[
          { active: open },
          'w-full bg-midnight-express-color rounded-lg  shadow-dark-box px-5 py-[7px] ',
        ]"
      >
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-row gap-4 items-center">
            <img
              :src="CURRENCY_LIST[selectedIndex].src"
              :width="18"
              alt="Image is loading..."
            />
            <div class="flex flex-col gap-[2px] items-start">
              <span class="text-[#8194B0] text-xxs">Currency</span>
              <span class="text-base text-white">{{
                CURRENCY_LIST[selectedIndex].balance
              }}</span>
            </div>
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
      <div class="pr-[4px] pl-[15px] pt-[10px] pb-[5px]">
        <div class="flex flex-col w-full max-h-[120px] overflow-auto" id="list">
          <div
            v-for="(item, index) in CURRENCY_LIST"
            class="
              flex flex-row
              justify-between
              pb-[10px]
              cursor-pointer
              group
              z-20
            "
            :key="index"
            v-on:click="onSelect(index, close)"
          >
            <div
              class="
                flex flex-row
                gap-[6px]
                items-center
                text-steel-color
                group-hover:bg-primary-gradient
                group-hover:bg-clip-text
                group-hover:text-transparent
              "
            >
              <img
                :src="CURRENCY_LIST[index].src"
                :width="15"
                alt="Image is loading..."
              />
              <label
                class="
                  text-sm
                  font-medium
                  leading-[19px]
                  font-proximanova
                  cursor-pointer
                "
                >{{ item.balance }}</label
              >
              <GHoverDot class="hidden group-hover:block" />
            </div>
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
#list::-webkit-scrollbar {
  width: 2px;
  border-radius: 8px;
  background-image: white;
}
#list::-webkit-scrollbar-thumb {
  width: 2px;
  border-radius: 8px;
  border: solid 1.6px theme(backgroundImage.primary-gradient);
  background: theme(backgroundImage.primary-gradient);
  box-shadow: theme(boxShadow.primary-box);
  -webkit-backdrop-filter: blur(4.6px);
  backdrop-filter: blur(4.6px);
}
</style>
