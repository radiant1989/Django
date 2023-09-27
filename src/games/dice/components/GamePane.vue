<template>
  <GameHistory :histories="histories" />
  <GameMain
    @update:target-value="$emit('update:targetValue', $event)"
    @update:condition-value="$emit('update:conditionValue', $event)"
    :betresult="betresult"
    :gameinprocess="gameinprocess"
    :condition-value="conditionValue"
    :range-value="rangeValue"
  />
  <div
    class="
      lg:flex
      hidden
      absolute
      h-[45px]
      md:h-[55px]
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
</template>
<script setup lang="ts">
import GameHistory from "./GameHistory.vue";
import GameMain from "./GameMain.vue";
import GameFooterBar from "./GameFooterBar.vue";
import { BetGameResponse } from "~/graphql/bet";

defineProps<{
  histories: BetGameResponse[];
  betresult: BetGameResponse;
  gameinprocess: boolean;
  conditionValue: boolean;
  rangeValue: number;
}>();
defineEmits<{
  (e: "update:targetValue", value: number): void;
}>();
</script>
