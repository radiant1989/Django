<script setup lang="ts">
import { GButton, GModal } from "~/components/atoms";
import GTextarea from "~/components/atoms/inputs/GTextarea.vue";
import LAmountInput from "../inputs/LAmountInput.vue";
import GPrimaryInput from "~/components/atoms/inputs/GPrimaryInput.vue";

defineProps({
  isVisible: {
    type: Boolean,
  },
});
const emit =
  defineEmits<{
    (e: "closed:rainmodal"): void;
    (e: "show-addr-manage"): void;
  }>();
const onCloseButtonClick = (value: boolean) => {
  emit("closed:rainmodal");
};
</script>
<template>
  <GModal
    :model-value="isVisible"
    @update:model-value="onCloseButtonClick"
    width="525px"
  >
    <div class="pb-[30px] pt-[20px]">
      <!-- The header of wallet pop up -->
      <div class="w-full flex items-center justify-between pl-[30px] pr-[20px]">
        <span
          class="
            font-proximanova font-medium
            text-[16px]
            leading-[19px]
            text-[#FFF]
          "
        >
          Rain
        </span>
      </div>
      <div class="mt-[10px] px-[30px]">
        <div>
          <label
            for="token"
            class="text-sm leading-[17px] text-white font-medium"
            >Currency</label
          >
        </div>
        <div class="mt-5">
          <label
            for="message"
            class="text-sm leading-[17px] text-white mb-[10px]"
            >Amount</label
          >
          <LAmountInput />
        </div>
        <div class="mt-5">
          <label for="message" class="text-sm leading-[17px] text-white"
            >Number of people</label
          >
          <div class="relative h-[45px]">
            <GPrimaryInput
              custom-class=" mt-[10px] focus:border-[1px] focus:border-primary-color rounded-lg"
            />
            <label
              for="message"
              class="
                text-[10px]
                leading-[12px]
                text-steel-color
                absolute
                right-[20px]
                top-1/2
                translate-y-1/2
              "
              >1-100</label
            >
          </div>
        </div>
        <div class="mt-5">
          <label for="message" class="text-sm leading-[17px] text-white"
            >Message (optional)</label
          >
          <GTextarea class="mt-[10px] w-full" id="message" :rows="8" />
          <p class="text-[10px] leading-[12px] text-steel-color text-right">
            0/34
          </p>
        </div>
      </div>
      <div class="mt-[10px] flex items-center justify-center px-[90px]">
        <GButton style-type="primary">Make it rain</GButton>
      </div>
    </div>
  </GModal>
</template>
