<script lang="ts" setup>
import CasinoCategory from "@/games/casino-archieve/components/CasinoCategory.vue";
import {
  useCMSAsyncQuery,
  MODULES_QUERY,
  Module,
  PROVIDERS_QUERY,
  Provider,
} from "~/cms-hygraph";
import { PAGE_LOADING } from "~/constants";
import { GAME_CATEGORY_QUERY } from "~/graphql";
import { GameCategory } from "~/types";

const route = useRoute();
const { data: categoryResult, pending: categoryLoading } = useAsyncQuery<{
  gameCategory: GameCategory;
}>(GAME_CATEGORY_QUERY, { id: "1" });
const { data, pending } =
  useCMSAsyncQuery<{ modules: Module[] }>(MODULES_QUERY);
const { data: providersData, pending: providersPending } =
  useCMSAsyncQuery<{
    gameProviders: Provider[];
  }>(PROVIDERS_QUERY);
const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();
const loading = computed(
  () => pending.value || categoryLoading.value || providersPending.value
);

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
  <div class="CasinoCategoryPage">
    <CasinoCategory
      v-if="!loading"
      :modules="data.modules"
      :category="categoryResult?.gameCategory"
      :providers="providersData.gameProviders"
    />
  </div>
</template>
