<script setup lang="ts">
import { GModal } from "~/components/atoms";
import { rulesIcon } from "~/icons";
import { RULE_LIST } from "~/constants/mock_data";

defineProps({
  isVisible: {
    type: Boolean,
  },
});

const emit =
  defineEmits<{
    (e: "closed:rulemodal"): void;
    (e: "show-addr-manage"): void;
  }>();

const onCloseButtonClick = () => {
  emit("closed:rulemodal");
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
        <div class="flex flex-row gap-2.5 items-center justify-center">
          <svg class="w-4 h-4 text-white">
            <use :xlink:href="rulesIcon"></use>
          </svg>
          <span
            class="
              font-proximanova font-medium
              text-base
              text-white
            "
          >
            Rules
          </span>
        </div>
      </div>
      <div class="px-[30px] mt-5 w-full flex flex-col gap-2.5">
        <p
          class="text-sm leading-[17px] text-white flex flex-row gap-2.5"
          v-for="(rule, index) in RULE_LIST"
        >
          <span>{{ index + 1 }}.</span>
          <span>{{ rule }}</span>
        </p>
      </div>
    </div>
  </GModal>
</template>
