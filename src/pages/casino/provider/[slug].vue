<script lang="ts" setup>
import CasinoProducer from "@/games/casino-archieve/components/CasinoProducer.vue";
import { useCMSAsyncQuery, MODULES_QUERY, Module } from "~/cms-hygraph";
import { GameProducer } from "@/types";
import { PAGE_LOADING } from "~/constants";
import { GAME_PRODUCER_QUERY, GAME_PRODUCERS_QUERY } from "~/graphql";

const route = useRoute();
const { data: producerResult, pending: producerLoading } = useAsyncQuery<{
  gameProducer: GameProducer;
}>({
  query: GAME_PRODUCER_QUERY,
  variables: { slug: route.params.slug },
});
const { data, pending } =
  useCMSAsyncQuery<{ modules: Module[] }>(MODULES_QUERY);
const { data: producersData, pending: producersPending } =
  useAsyncQuery<{
    gameProducers: GameProducer[];
  }>(GAME_PRODUCERS_QUERY);
const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();
const loading = computed(
  () => pending.value || producerLoading.value || producersPending.value
);

process.client &&
  watch(
    () => loading.value,
    (isLoading) => {
      if (isLoading) {
        addLoading();
      } else {
        removeLoading();
      }
    },
    { immediate: loading.value }
  );
</script>
<template>
  <div class="CasinoProducerPage">
    <CasinoProducer
      v-if="!loading"
      :modules="data.modules"
      :producer="producerResult?.gameProducer"
      :producers="producersData.gameProducers"
    />
  </div>
</template>
