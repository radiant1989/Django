<script setup lang="ts">
import SubPageLoadingProvider from "@/components/providers/SubPageLoadingProvider.vue";
import PromosBanner from "./PromosBanner.vue";
import CategoryNavigation from "./CategoryNavigation.vue";
import { CASINO_HOME } from "@/games/casino/constants";
import { categorySlugToIconMap } from "~/constants";
import { providerIcon } from "~/icons";
import type {
  ProducersRow,
  CategoryRow,
  ProducerRow,
} from "@/games/casino/types";
import { GameCategory, GameProducer } from "~/types";
import { Promo } from "~/cms-hygraph";

const props =
  defineProps<{
    gameCategories: GameCategory[];
    promos: Promo[];
    producers: GameProducer[]
  }>();

const currentTab = ref("lobby");
const categoryGroups: CategoryRow[] = props.gameCategories.map((c) => ({
  id: `category_${c.id}`,
  type: "category",
  title: c.name,
  icon: categorySlugToIconMap[c.slug],
  categorySlug: c.slug,
  enabled: true,
}));
const producersGroup: ProducersRow = {
  id: "producers",
  type: "producers",
  title: "Providers",
  icon: providerIcon,
  enabled: true,
};
const groupRows = [
  ...categoryGroups.slice(0, 3),
  producersGroup,
  ...categoryGroups.slice(3),
];
const categoryProducerRows = shallowRef<
  Array<CategoryRow | ProducersRow | ProducerRow>
>([...groupRows]);
const updateProducerEnabled = (producerSlug: string, enabled: boolean) => {
  const producer = props.producers.find((p) => p.slug === producerSlug)!;
  if (enabled) {
    categoryProducerRows.value = [
      ...categoryProducerRows.value,
      {
        id: `producer_${producer.id}`,
        type: "producer",
        title: producer.name,
        icon: providerIcon,
        producerSlug,
        enabled: true,
      },
    ];
  } else {
    categoryProducerRows.value = categoryProducerRows.value.filter(
      (r) => !(r.type === "producer" && r.producerSlug === producerSlug)
    );
  }
};
provide(CASINO_HOME, {
  producers: props.producers,
  promos: props.promos,
  gameCategories: props.gameCategories,
  categoryProducerRows,
  updateProducerEnabled,
  liveBetFeedEnabled: ref(true),
});
</script>
<template>
  <div class="CasinoHome">
    <div class="mb-5 md:mb-10">
      <PromosBanner />
    </div>
    <div class="mb-5 md:mb-10">
      <CategoryNavigation v-model="currentTab" />
    </div>
    <div>
      <SubPageLoadingProvider height-when-loading="400px">
        <NuxtPage :level="2" />
      </SubPageLoadingProvider>
    </div>
  </div>
</template>
