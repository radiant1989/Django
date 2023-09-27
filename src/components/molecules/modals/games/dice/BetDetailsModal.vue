<template>
  <div class="mt-4 pointer-events-none">
    <DynamicTip
      :random-value="betData ? betData.final_results : 0"
    ></DynamicTip>
    <GRangeSlider
      :model-value="betData ? betData?.bet_conditions?.target : 0"
      :rollvalue="betData?.bet_conditions?.condition === 'over' ? true : false"
    ></GRangeSlider>
  </div>
  <div class="mt-4 flex flex-row flex-nowrap pointer-events-none">
    <div class="flex-none w-1/3 pr-2.5">
      <MultiplierInput
        id="calculator-multiplier"
        :model-value="
          Number(
            (betData
              ? betData?.bet_conditions?.condition === 'over'
                ? 99 / (100 - betData?.bet_conditions?.target)
                : 99 / betData?.bet_conditions?.target
              : 0
            ).toFixed(4)
          )
        "
        @update:model-value="handleMultiplierChange"
        :static="static"
      />
    </div>
    <div class="flex-none w-1/3 pr-2.5">
      <RollInput
        id="calculator-roll-over"
        :model-value="betData ? betData?.bet_conditions?.target : 0"
        @update:model-value="handleRollOverChange"
        :static="static"
      />
    </div>
    <div class="flex-none w-1/3">
      <ChanceInput
        id="calculator-chance"
        :model-value="
          Number(
            (betData ? 100 - betData?.bet_conditions?.target : 0).toFixed(2)
          )
        "
        @update:model-value="handleWinChanceChance"
        :static="static"
      />
    </div>
  </div>
  <GButton class="mt-[18px]" style-type="primary">Play Dice</GButton>
</template>
<script setup lang="ts">
import { GButton } from "~/components/atoms";
import DynamicTip from "~/components/molecules/games/dice/DynamicTip.vue";
import GRangeSlider from "~/components/organisms/GRangeSlider.vue";
import MultiplierInput from "~/components/molecules/inputs/MultiplierInput.vue";
import ChanceInput from "~/components/molecules/inputs/ChanceInput.vue";
import RollInput from "~/components/molecules/inputs/RollInput.vue";
import { BET_RESPONSE } from "~/graphql/bet";
defineProps<{
  betData: BET_RESPONSE | undefined;
}>();
</script>
