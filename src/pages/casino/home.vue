<script setup lang="ts">
import CasinoHome from "@/games/casino/components/CasinoHome.vue";
import { PROMOS_QUERY, useCMSAsyncQuery, Promo } from "@/cms-hygraph";
import { GAME_CATEGORIES_QUERY, GAME_PRODUCERS_QUERY } from "~/graphql";
import { GameCategory, GameProducer } from "~/types";
import { PAGE_LOADING } from "~/constants";

const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();
const { data: promosData, pending: promosPending } =
  useCMSAsyncQuery<{ promos: Promo[] }>(PROMOS_QUERY);
const { data: producersData, pending: producersPending } =
  useAsyncQuery<{
    gameProducers: GameProducer[];
  }>(GAME_PRODUCERS_QUERY);
const { data: categoriesData, pending: categoriesPending } = useAsyncQuery<{
  gameCategories: GameCategory[];
}>(GAME_CATEGORIES_QUERY);

const promos = computed(() => promosData.value?.promos || []);
const categories = computed(() => categoriesData.value?.gameCategories || []);
const producers = computed(() => producersData.value?.gameProducers || []);

const loading = computed(
  () => promosPending.value || producersPending.value || categoriesPending.value
);

// No need watch on SSR
process.client && watch(
  () => loading.value,
  (loadingValue) => {
    console.log("loading changed", loadingValue);
    if (loadingValue) {
      addLoading();
    } else {
      // wait until children begins to run
      removeLoading(100);
    }
  },
  { immediate: loading.value }
);
</script>
<template>
  <div class="CasinoHomePage">
    <CasinoHome
      v-if="!loading"
      :gameCategories="categories"
      :promos="promos"
      :producers="producers"
    />
  </div>
</template>
