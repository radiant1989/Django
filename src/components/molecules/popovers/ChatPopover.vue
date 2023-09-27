<script setup lang="ts">
import { GButton, GPopover } from "~/components/atoms";
import { chatIcon, sportsBetsIcon } from "~/icons";
import { RIGHTBAR_STATE } from "~/constants";

const onSelect = (value: string, close: Function) => {
  if (value === "show-chat") {
    rightbarContentType.value = "CHAT";
  } else {
    rightbarContentType.value = "BETSLIP";
  }
  close();
};
const { rightbarContentType } = inject(RIGHTBAR_STATE)!;
</script>
<template>
  <GPopover width="105px" :arrow="true">
    <template #trigger="{ open }">
      <div class="w-10 md:w-[45px]">
        <GButton
          class="circle-button"
          :style-type="
            open ||
            rightbarContentType === 'BETSLIP' ||
            rightbarContentType === 'CHAT'
              ? 'primary'
              : 'secondary'
          "
          ><div class="flex flex-row items-center justify-center">
            <svg
              class="lg:w-[25px] lg:h-[25px] w-5 h-5 group-hover:text-white"
              :class="
                open ||
                rightbarContentType === 'BETSLIP' ||
                rightbarContentType === 'CHAT'
                  ? 'text-white'
                  : 'text-[#858DA0]'
              "
            >
              <use :xlink:href="chatIcon"></use>
            </svg>
          </div>
        </GButton>
      </div>
    </template>
    <template #panel="{ open, close }">
      <div class="flex items-start flex-col gap-4 py-4 pl-3">
        <div
          class="flex items-center gap-2 cursor-pointer group"
          @click="onSelect('show-chat', close)"
        >
          <svg
            :class="[
              'w-5 h-5  group-hover:text-[#39a590]',
              rightbarContentType === 'CHAT'
                ? 'text-[#39a590]'
                : 'text-slate-color',
            ]"
          >
            <use :xlink:href="chatIcon"></use>
          </svg>
          <div
            :class="[
              'text-sm font-medium text-steel-color group-hover:bg-primary-gradient group-hover:bg-clip-text group-hover:text-transparent',
              rightbarContentType === 'CHAT' &&
                'bg-primary-gradient bg-clip-text text-transparent',
            ]"
          >
            Chat
          </div>
        </div>
        <div
          class="flex items-center gap-2 cursor-pointer group"
          @click="onSelect('show-betslip', close)"
        >
          <svg
            :class="[
              'w-5 h-5  group-hover:text-[#39a590]',
              rightbarContentType === 'BETSLIP'
                ? 'text-[#39a590]'
                : 'text-slate-color',
            ]"
          >
            <use :xlink:href="sportsBetsIcon"></use>
          </svg>
          <div
            :class="[
              'text-sm font-medium text-steel-color group-hover:bg-primary-gradient group-hover:bg-clip-text group-hover:text-transparent',
              rightbarContentType === 'BETSLIP' &&
                'bg-primary-gradient bg-clip-text text-transparent',
            ]"
          >
            Bet Slip
          </div>
        </div>
      </div>
    </template>
  </GPopover>
</template>
<style scoped>
.circle-button {
  border-radius: 50%;
  padding-left: 9px;
  padding-right: 9px;
}
</style>
