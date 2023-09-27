<template>
  <div class="flex lg:flex-col flex-col-reverse lg:gap-[30px] gap-5 py-5 px-5">
    <GTabs
      :tabs="tabs"
      :model-value="selectedTab"
      @update:modelValue="handleTab"
      :disabled="gameinprocess || autoStatus !== 101"
      :class="(gameinprocess || autoStatus !== 101) && 'pointer-events-none'"
    />
    <div v-if="selectedTab === 'manual'">
      <ManualBetForm
        @play:bet-game="$emit('play:betGame')"
        @update:amount-value="$emit('update:amountValue', $event)"
        @handle-half-click="$emit('handleHalfClick')"
        @handle-double-click="$emit('handleDoubleClick')"
        @handle-max-confirm-click="$emit('handleMaxConfirmClick')"
        :gameinprocess="gameinprocess"
        :betamount="betAmount"
        :target-value="targetValue"
        :condition-value="conditionValue"
      />
    </div>
    <div v-else class="flex lg:flex-col flex-col-reverse gap-5">
      <AutoBetForm
        :bet-amount="betAmount"
        :bet-number="betNumber"
        :win-percent="winPercent"
        :loss-percent="lossPercent"
        :profit-amount="profitAmount"
        :loss-amount="lossAmount"
        @update:amount-value="$emit('update:amountValue', $event)"
        @update:bet-number="$emit('update:betNumber', $event)"
        @update:win-percent="$emit('update:winPercent', $event)"
        @update:loss-percent="$emit('update:lossPercent', $event)"
        @update:win-reset="$emit('update:winReset', $event)"
        @update:loss-reset="$emit('update:lossReset', $event)"
        @update:profit-amount="$emit('update:profitAmount', $event)"
        @update:loss-amount="$emit('update:lossAmount', $event)"
        @play:auto-game="$emit('play:autoGame')"
        @handle-half-click="$emit('handleHalfClick')"
        @handle-double-click="$emit('handleDoubleClick')"
        @handle-max-confirm-click="$emit('handleMaxConfirmClick')"
        :auto-status="autoStatus"
      />
    </div>
    <div
      class="
        lg:hidden
        flex
        absolute
        h-[45px]
        bg-secondary-gradient
        w-full
        bottom-0
        left-0
        rounded-b-lg
        px-5
      "
    >
      <GameFooterBar />
    </div>
  </div>
</template>
<script setup lang="ts">
import { GTabs } from "~/components/atoms";
import ManualBetForm from "./ManualBetForm.vue";
import AutoBetForm from "./AutoBetForm.vue";
import GameFooterBar from "./GameFooterBar.vue";
const props = withDefaults(
  defineProps<{
    tabValue: string;
    gameinprocess: boolean;
    betAmount: number;
    targetValue: number;
    betNumber: number;
    winPercent: number;
    lossPercent: number;
    profitAmount: number;
    lossAmount: number;
    autoStatus: number;
    conditionValue: boolean;
  }>(),
  {
    tabValue: "manual",
    gameinprocess: false,
    betAmount: 0,
    betNumber: 0,
    winPercent: 0,
    lossPercent: 0,
    profitAmount: 0,
    lossAmount: 0,
    autoStatus: 101,
    conditionValue: false,
  }
);
const emit =
  defineEmits<{
    (e: "update:tabValue", value: string): void;
    (e: "play:betGame"): void;
    (e: "play:autoGame"): void;
    (e: "update:amountValue"): void;
    (e: "update:winPercent"): void;
    (e: "update:lossPercent"): void;
    (e: "update:betNumber"): void;
    (e: "update:profitAmount"): void;
    (e: "update:lossAmount"): void;
  }>();
const selectedTab = ref<string>("manual");
watch(
  () => props.tabValue,
  () => {
    selectedTab.value = props.tabValue;
  }
);
const tabs = [
  {
    label: "Manual",
    value: "manual",
  },
  {
    label: "Auto",
    value: "auto",
  },
];
const handleTab = (val: string) => {
  emit("update:tabValue", val);
};
</script>
