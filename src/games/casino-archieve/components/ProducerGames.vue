<script setup lang="ts">
import { GButton, GProgressbar } from "@/components/atoms";
import { PAGE_LOADING, THEME } from "~/constants";
import { useValueInContainer } from "~/hooks";
import { Game, GameProducer } from "~/types";
import GameTile from "@/games/casino/components/GameTile.vue";
import { GAME_SEARCH_QUERY } from "~/graphql";
import { AZ, NEWEST, POPULAR, ZA } from "../constants";
const props =
  defineProps<{
    producer: GameProducer;
    keyword: string;
    sortBy: "POPULAR" | "A-Z" | "Z-A" | "NEWEST";
  }>();

const {
  breakpoints: { sm, md },
} = inject(THEME)!;
const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();
const orderByMaps = {
  [POPULAR]: {
    column: "RATING",
    order: "DESC",
  },
  [AZ]: {
    column: "TITLE",
    order: "ASC",
  },
  [ZA]: {
    column: "TITLE",
    order: "DESC",
  },
  [NEWEST]: {
    column: "ORDER",
    order: "DESC",
  },
};
const searchOptions = computed(() => ({
  producerSlug: props.producer.slug,
  first: 39,
  page: 1,
  ...(props.keyword.length >= 3 ? { keyword: props.keyword } : {}),
  orderBy: [orderByMaps[props.sortBy]],
}));
const { result, loading, fetchMore, refetch } = useQuery(
  GAME_SEARCH_QUERY,
  searchOptions
);
const games = computed<Game[]>(() => result.value?.gameSearch.data || []);
const columns = useValueInContainer({
  0: 3,
  [sm]: 4,
  [md]: 5,
  950: 6,
  1100: 7,
  1250: 8,
});
const viewAll = () => {
  refetch({
    first: 1000,
  });
};

const stopWatch = watch(
  () => loading.value,
  (loadingValue) => {
    if (loadingValue) {
      addLoading();
    } else {
      removeLoading();
      stopWatch();
    }
  },
  { immediate: loading.value }
);
</script>
<template>
  <div class="ProducerGames">
    <div v-if="games.length">
      <div
        class="
          grid
          gap-x-[5px] gap-y-2.5
          md:gap-x-[23px] md:gap-y-[30px]
          g-mb-md
        "
        :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }"
      >
        <div v-for="game of games" :key="game.id">
          <NuxtLink
            class="block"
            :to="`/casino/games/${producer.slug}/${game.slug}`"
          >
            <GameTile :game="game" />
          </NuxtLink>
        </div>
      </div>
      <div class="flex flex-col items-center gap-[15px] md:gap-5">
        <div class="w-full md:w-[327px]">
          <GProgressbar
            height="3px"
            :percentage="
              (100 * result.gameSearch.paginatorInfo.count) /
              result.gameSearch.paginatorInfo.total
            "
          />
        </div>
        <div class="text-steel-color text-sm md:text-base font-semibold">
          Displaying {{ result.gameSearch.paginatorInfo.count }} of
          {{ result.gameSearch.paginatorInfo.total }} games
        </div>
        <div
          class="w-full md:w-[198px]"
          v-if="
            result.gameSearch.paginatorInfo.count <
            result.gameSearch.paginatorInfo.total
          "
        >
          <GButton @click="viewAll" :loading="loading">View All</GButton>
        </div>
      </div>
    </div>
    <div v-else-if="loading">
      <div class="h-[500px] flex items-center justify-center bg-[#10131C] p-7">
        <img
          class="w-[150px] md:w-[240px]"
          src="/assets/icons/gamba-logo-ultra.gif"
        />
      </div>
    </div>
  </div>
</template>
