<script setup lang="ts">
import { ref } from "vue";
import { GModal, GTabs } from "../atoms";
import Rank from "~/components/molecules/containers/Rank.vue";
import Rakeback from "../molecules/containers/Rakeback.vue";
import Cashback from "~/components/molecules/containers/Cashback.vue";
import Reload from "../molecules/containers/Reload.vue";
import { vipIcon } from "~/icons";

const tabs = [
  {
    value: "rank",
    label: "Rank",
  },
  {
    value: "rakeback",
    label: "Rakeback",
  },
  {
    value: "cashback",
    label: "Cashback",
  },
  {
    value: "reload",
    label: "Reload",
  },
];

defineProps({
  isOpen: {
    type: Boolean,
  },
});

const emit =
  defineEmits<{
    (e: "close:vip"): void;
  }>();

const selectedTab = ref<string>("rank");

const onCloseButtonClick = (value: boolean) => {
  emit("close:vip");
};
</script>
<template>
  <GModal
    :model-value="isOpen"
    @update:model-value="onCloseButtonClick"
    width="480px"
  >
    <div class="py-[30px]">
      <div class="flex flex-row px-[20px]">
        <svg class="w-[21px] h-[16px] text-white">
          <use :xlink:href="vipIcon"></use>
        </svg>
        <span
          class="
            font-proximanova font-medium
            text-[16px]
            leading-[19px]
            text-[#FFF]
            ml-[10px]
          "
        >
          VIP
        </span>
      </div>
      <div class="px-5">
        <GTabs v-model="selectedTab" :tabs="tabs" class="mt-5" />
      </div>
      <Rank v-if="selectedTab === 'rank'" />
      <Rakeback v-if="selectedTab === 'rakeback'" />
      <Cashback v-if="selectedTab === 'cashback'" />
      <Reload v-if="selectedTab === 'reload'" />
    </div>
  </GModal>
</template>
