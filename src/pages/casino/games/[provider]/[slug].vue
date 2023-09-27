<script setup lang="ts">
import { PAGE_LOADING } from "~/constants";
import { GAME_QUERY, GAME_PRODUCERS_QUERY } from "~/graphql";
import { Game, GameProducer } from "~/types";
import SoftSwissGame from "@/games/softswiss/components/SoftswissGame.vue";

useHead({
  script: [{ src: "https://casino.cur.a8r.games/public/sg.js" }],
});

const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();
const route = useRoute<{ params: { slug: string } }>();
const { pending, data: gameData } = useAsyncQuery<{ game: Game }>(GAME_QUERY, {
  slug: route.params.slug,
});
const { data: producersData, pending: producersPending } =
  useAsyncQuery<{
    gameProducers: GameProducer[];
  }>(GAME_PRODUCERS_QUERY);
const loading = computed(() => pending.value || producersPending.value);
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
      <SoftSwissGame v-if="gameData" :game="gameData.game" :producers="producersData.gameProducers" />
    </ClientOnly>
  </div>
</template>
