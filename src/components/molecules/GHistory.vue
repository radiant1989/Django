<template>
  <div class="flex flex-row justify-end md:gap-2.5 gap-1 overflow-hidden">
    <GHistoryItem
      v-for="(item, index) in histories"
      :item="item"
      :key="item.transactionId"
      @open:detail-modal="openBetDetailsModal"
    ></GHistoryItem>
  </div>
</template>
<script setup lang="ts">
import GHistoryItem from "~/components/molecules/history/GHistoryItem.vue";
import { BetGameResponse, BET, BET_RESPONSE } from "~/graphql/bet";
import { notify } from "~/components/atoms";
const props =
  defineProps<{
    items: BetGameResponse[];
  }>();
const isBetDetailsOpen = ref<boolean>(false);
const histories = computed<BetGameResponse[]>(() => props.items.slice(-5));
const betResult = ref<BetGameResponse>();
const seedData = ref<BET_RESPONSE>();
const openBetDetailsModal = async (item: BetGameResponse) => {
  try {
    const variables = { transaction_id: item?.transactionId };
    const { data } = await useAsyncQuery<{ bet: BET_RESPONSE }>(BET, variables);
    if (data?.value?.bet) {
      seedData.value = data?.value?.bet;
      isBetDetailsOpen.value = true;
      betResult.value = item;
    } else throw new Error("sth is wrong");
  } catch (error: any) {
    console.log("error occured", error);
    notify.error(
      {
        title: "Error",
        text: error?.message?.toString() || "Something went wrong",
      },
      4000
    );
  }
};
</script>
