<script lang="ts" setup>
import CasinoProducers from "@/games/casino-archieve/components/CasinoProducers.vue";
import {
  useCMSAsyncQuery,
  MODULES_QUERY,
  Module,
} from "~/cms-hygraph";
import { GAME_PRODUCERS_QUERY } from "@/graphql";
import { GameProducer } from "@/types";
import { PAGE_LOADING } from "~/constants";

const route = useRoute();
const { data, pending } =
  useCMSAsyncQuery<{ modules: Module[] }>(MODULES_QUERY);
const { data: producersData, pending: producersPending } =
  useAsyncQuery<{
    gameProducers: GameProducer[];
  }>(GAME_PRODUCERS_QUERY);
const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();
const loading = computed(() => pending.value || producersPending.value);

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
  <div class="CasinoProducersPage">
    <CasinoProducers
      v-if="!loading"
      :modules="data.modules"
      :producers="producersData.gameProducers"
    />
  </div>
</template>
