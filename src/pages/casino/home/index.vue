<script setup lang="ts">
import GamesByCategoryRow from "@/games/casino/components/GamesByCategoryRow.vue";
import GameProducersRow from "@/games/casino/components/GameProducersRow.vue";
import { CASINO_HOME } from "~/games/casino/constants";
import GamesByProducerRow from "~/games/casino/components/GamesByProducerRow.vue";
import { providerIcon } from "~/icons";

const { categoryProducerRows, gameCategories, producers } =
  inject(CASINO_HOME)!;
const rows = computed(() =>
  categoryProducerRows.value
    .filter((r) => r.enabled)
    .map((r) => {
      switch (r.type) {
        case "category":
          return {
            ...r,
            category: gameCategories.find((c) => c.slug === r.categorySlug),
          };
        case "producers":
          return {
            ...r,
          };
        case "producer":
          return {
            ...r,
            producer: producers.find((p) => p.slug === r.producerSlug),
          };
      }
    })
);
</script>
<template>
  <div class="RobbyTab">
    <ClientOnly>
      <div>
        <div v-for="groupRow of rows" :key="groupRow.id" class="mb-5 md:mb-10">
          <GamesByCategoryRow
            v-if="groupRow.type === 'category'"
            :game-category="groupRow.category!"
            :title="groupRow.title"
            :icon="groupRow.icon"
          />
          <GameProducersRow
            v-else-if="groupRow.type === 'producers'"
            :producers="producers"
            :title="groupRow.title"
            :icon="groupRow.icon"
          />
          <GamesByProducerRow
            v-else
            :game-producer="groupRow.producer!"
            :title="groupRow.producer!.name"
            :icon="providerIcon"
          />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
