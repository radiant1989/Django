<script setup lang="ts">
import { ref } from "vue";
import { GPopover } from "~/components/atoms";

defineProps({
  list: {
    type: Array,
    required: true,
  },
});
const selectedIndex = ref<number>(0);
const onSelect = (index: number) => {
  selectedIndex.value = index;
};
</script>
<template>
  <GPopover :block="true" width="105px" :arrow="true">
    <template #trigger="{ open }">
      <button
        id="popup-btn"
        :class="[
          { active: open },
          'bg-transparent flex flex-row gap-2 items-center',
        ]"
      >
        <span class="text-xs text-white">{{ list[selectedIndex] }}</span>
        <Transition animation="ease">
          <div class="flex items-center relative w-3.5 h-full">
            <span class="arrow"></span>
          </div>
        </Transition>
      </button>
    </template>
    <template #panel="{ open, close }">
      <div class="pr-[6px] py-[12px]">
        <div
          class="pr-[4px] flex flex-col w-full max-h-[130px] overflow-y-auto"
          id="list"
        >
          <div
            v-for="(value, index) in list"
            class="
              flex flex-row
              justify-between
              pb-[10px]
              pl-[10px]
              cursor-pointer
            "
            :key="index"
            v-on:click="onSelect(index)"
          >
            <div
              class="
                flex flex-row
                items-center
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
                >{{ value }}</label
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
  border-radius: 10px;
  background-image: linear-gradient(to bottom, #343a47 0%, #2c3140 100%);
}
#list::-webkit-scrollbar-thumb {
  width: 2px;
  border-radius: 7px;
  border: solid 1.6px theme(backgroundImage.primary-gradient);
  background: theme(backgroundImage.primary-gradient);
  box-shadow: theme(boxShadow.primary-box);
  -webkit-backdrop-filter: blur(4.6px);
  backdrop-filter: blur(4.6px);
}
</style>
