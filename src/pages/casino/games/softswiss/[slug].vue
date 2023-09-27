<script setup lang="ts">
import { PAGE_LOADING } from "~/constants";
import { GAME_QUERY } from "~/graphql";
import { Game } from "~/types";
import SoftSwissGame from "@/games/softswiss/components/SoftswissGame.vue";
import { PROVIDERS_QUERY, Provider, useCMSAsyncQuery } from "~/cms-hygraph";

useHead({
  script: [{ src: "https://casino.cur.a8r.games/public/sg.js" }],
});

const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();
const route = useRoute<{ params: { slug: string } }>();
const { pending, data: gameData } = useAsyncQuery<{ game: Game }>(GAME_QUERY, {
  slug: route.params.slug,
});
const { data: providersData, pending: providersPending } =
  useCMSAsyncQuery<{
    gameProviders: Provider[];
  }>(PROVIDERS_QUERY);
const loading = computed(() => pending.value || providersPending.value);
watch(
  () => loading.value,
  (isLoading) => {
    if (isLoading) {
      addLoading();
    } else {
      removeLoading(100);
    }
  },
  { immediate: loading.value }
);
</script>
<template>
  <div class="SoftswissGamePage">
    <ClientOnly>
      <SoftSwissGame v-if="gameData" :game="gameData.game" :providers="providersData.gameProviders" />
    </ClientOnly>
  </div>
</template>
