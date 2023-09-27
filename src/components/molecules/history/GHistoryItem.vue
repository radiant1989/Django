<script setup lang="ts">
import { GButton } from "~/components/atoms";
import { BetGameResponse } from "~/graphql/bet";

const router = useRouter();
const props =
  defineProps<{
    item: BetGameResponse;
  }>();
const emits =
  defineEmits<{
    (e: "open:detailModal", value: BetGameResponse): void;
  }>();
const rngValue = ref<number>(0);
const roundStatus = ref<string>("");
onMounted(() => {
  const partial = JSON.parse(props.item.partialResult);
  rngValue.value = Number(partial?.result?.rng);
  roundStatus.value = partial?.roundStatus;
});
const handleClick = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      betID: props.item.transactionId,
      modal: "bet",
    },
  });
};
</script>

<template>
  <GButton
    :style-type="roundStatus === 'won' ? 'primary-sm' : 'secondary-sm'"
    :class="
      roundStatus === 'won' && 'border-2 border-solid border-primary-color'
    "
    class="lg:w-[70px] md:w-[60px] history-btn"
    @click="handleClick"
    ><span class="text-xs md:text-sm font-semibold">{{
      rngValue.toFixed(2)
    }}</span>
  </GButton>
</template>
<style scoped>
@media (max-width: 768px) {
  .history-btn {
    width: 50px;
  }
}
</style>
