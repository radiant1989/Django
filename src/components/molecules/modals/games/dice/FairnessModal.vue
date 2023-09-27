<template>
  <div v-if="showResult" class="flex flex-col">
    <DynamicTip :random-value="verifyResult.toFixed(2)"></DynamicTip>
    <GRangeSlider :model-value="2"></GRangeSlider>
  </div>
  <div
    v-else
    class="mt-3 border-2 border-slate-color h-[150px] rounded-lg"
  ></div>
</template>
<script setup lang="ts">
import DynamicTip from "~/components/molecules/games/dice/DynamicTip.vue";
import GRangeSlider from "~/components/organisms/GRangeSlider.vue";
import { verifyGame, generateBinarySeed } from "~/utils/validators";
const props = withDefaults(
  defineProps<{
    clientSeed?: string;
    serverSeed?: string;
    nonceValue?: number;
    calcResult?: boolean;
  }>(),
  {
    clientSeed: "",
    serverSeed: "",
    nonceValue: 0,
    minesNumber: 0,
    calcResult: false,
  }
);
const showResult = computed(() => {
  if (props.clientSeed === "" || props.serverSeed === "") return false;
  return true;
});
const verifyResult = ref<number>(0);
const handleVerifyGame = async () => {
  const results: number[] = await verifyGame.generateFloats(
    0,
    1,
    [0, 100],
    generateBinarySeed(props.clientSeed ?? null),
    generateBinarySeed(props.serverSeed ?? null),
    props.nonceValue ?? null
  );
  console.log(results);
  verifyResult.value = results[0];
};
watch(
  () => props.calcResult,
  async (val) => {
    await handleVerifyGame();
  },
  { immediate: true }
);
</script>
