<script lang="ts" setup>
import CasinoFavorites from "@/games/casino-archieve/components/CasinoRecents.vue";
import {
  useCMSAsyncQuery,
  MODULES_QUERY,
  Module,
  PROVIDERS_QUERY,
  Provider,
} from "~/cms-hygraph";
import { PAGE_LOADING } from "~/constants";

const route = useRoute();
const { data, pending } =
  useCMSAsyncQuery<{ modules: Module[] }>(MODULES_QUERY);
const { data: providersData, pending: providersPending } =
  useCMSAsyncQuery<{
    gameProviders: Provider[];
  }>(PROVIDERS_QUERY);
const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();
const loading = computed(
  () => pending.value || providersPending.value
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
  <div class="CasinoRecentsPage">
    <CasinoFavorites
      v-if="!loading"
      :modules="data.modules"
      :providers="providersData.gameProviders"
    />
  </div>
</template>
