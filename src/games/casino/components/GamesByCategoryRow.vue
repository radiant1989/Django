<script setup lang="ts">
import { roundRightArrowIcon, roundLeftArrowIcon } from "~/icons";
import { GAMES_BY_CATEGORY_QUERY } from "@/graphql";
import { Game, GameCategory } from "~/types";
import GameTile from "./GameTile.vue";
import CasinoCarousel from "./CasinoCarousel.vue";
import { GButton } from "@/components/atoms";
import { PAGE_LOADING, SUB_PAGE_LOADING } from "~/constants";

const props = withDefaults(
  defineProps<{
    icon?: string;
    title: string;
    gameCategory: GameCategory;
    inPage?: boolean;
  }>(),
  { inPage: false }
);
const { useAddLoading } = inject(
  props.inPage ? PAGE_LOADING : SUB_PAGE_LOADING
)!;
const { add: addApiLoading, remove: removeApiLoading } = useAddLoading();
const { add: addCarouselLoading, remove: removeCarouselLoading } =
  useAddLoading();
const { loading, result } = useQuery(GAMES_BY_CATEGORY_QUERY, {
  game_category_id: props.gameCategory.id,
  first: 20,
});
const games = computed<Game[]>(() => result.value?.gamesByCategory.data || []);

const carouselRef = ref();

const next = () => {
  carouselRef.value.next();
};
const prev = () => {
  carouselRef.value.prev();
};
watch(
  () => loading.value,
  (loadingValue) => {
    if (loadingValue) {
      addApiLoading();
    } else {
      removeApiLoading();
    }
  },
  { immediate: loading.value }
);
</script>
<template>
  <div class="GamesRow">
    <div class="text-steel-color font-medium">
      <div class="flex items-center gap-2.5">
        <div class="flex-none mr-auto">
          <NuxtLink
            class="group block"
            :to="`/casino/category/${gameCategory.slug}`"
          >
            <div class="flex items-center gap-[5px] group-active:scale-95">
              <svg class="w-5 h-5 text-steel-color group-hover:text-white">
                <use :xlink:href="icon"></use>
              </svg>
              <span class="text-white">{{ title }}</span>
            </div>
          </NuxtLink>
        </div>
        <div class="flex-none">
          <GButton
            class="aspect-square"
            @click="prev"
            :disabled="carouselRef?.isCurrentStart"
            style-type="secondary-control"
          >
            <svg class="w-3 h-3 mx-auto">
              <use :xlink:href="roundLeftArrowIcon"></use>
            </svg>
          </GButton>
        </div>
        <div class="flex-none">
          <GButton
            class="aspect-square"
            @click="next"
            :disabled="carouselRef?.isCurrentEnd"
            style-type="secondary-control"
          >
            <svg class="w-3 h-3 mx-auto">
              <use :xlink:href="roundRightArrowIcon"></use>
            </svg>
          </GButton>
        </div>
        <div class="flex-none hidden md:block">
          <GButton class="px-4" style-type="secondary-control">
            <span>See all</span>
          </GButton>
        </div>
      </div>
    </div>
    <CasinoCarousel
      v-if="games.length"
      :slides="games"
      ref="carouselRef"
      @before-init="addCarouselLoading()"
      @init="removeCarouselLoading()"
    >
      <template #default="{ slide }">
        <NuxtLink class="block" :to="`/casino/games/${slide.gameProducer.slug}/${slide.slug}`">
          <GameTile :game="slide" />
        </NuxtLink>
      </template>
    </CasinoCarousel>
  </div>
</template>
