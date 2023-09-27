<script setup lang="ts">
import { PAGE_LOADING, THEME } from "~/constants";
import { useValueInContainer } from "~/hooks";
import { GProgressbar, GButton } from "@/components/atoms";
import { Game, GameCategory } from "~/types";
import GameTile from "@/games/casino/components/GameTile.vue";
import { GAMES_BY_CATEGORY_QUERY } from "~/graphql";
const props =
  defineProps<{
    category: GameCategory;
  }>();

const {
  breakpoints: { sm, md },
} = inject(THEME)!;
const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();
const { result, loading } = useQuery(GAMES_BY_CATEGORY_QUERY, {
  game_category_id: props.category.id,
  first: 39,
});
const games = computed<Game[]>(() => result.value?.gamesByCategory.data || []);
const columns = useValueInContainer({
  0: 3,
  [sm]: 4,
  [md]: 5,
  950: 6,
  1100: 7,
  1250: 8,
});
watch(
  () => loading.value,
  (loadingValue) => {
    if (loadingValue) {
      addLoading();
    } else {
      removeLoading();
    }
  },
  { immediate: loading.value }
);
</script>
<template>
  <div class="CategoryGames">
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
          <GameTile :game="game" />
        </div>
      </div>
      <div class="flex flex-col items-center gap-[15px] md:gap-5">
        <div class="w-full md:w-[327px]">
          <GProgressbar
            height="3px"
            :percentage="
              (100 * result.gamesByCategory.paginatorInfo.count) /
              result.gamesByCategory.paginatorInfo.total
            "
          />
        </div>
        <div class="text-steel-color text-sm md:text-base font-semibold">
          Displaying {{ result.gamesByCategory.paginatorInfo.count }} of
          {{ result.gamesByCategory.paginatorInfo.total }} games
        </div>
        <div class="w-full md:w-[198px]">
          <GButton>View All</GButton>
        </div>
      </div>
    </div>
  </div>
</template>
