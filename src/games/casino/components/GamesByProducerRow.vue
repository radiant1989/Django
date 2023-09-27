<script setup lang="ts">
import { roundRightArrowIcon, roundLeftArrowIcon } from "~/icons";
import type { Game, GameProvider } from "~/types";
import GameTile from "./GameTile.vue";
import CasinoCarousel from "./CasinoCarousel.vue";
import { GButton } from "@/components/atoms";
import { shuffle } from "~/utilities";
import { Provider } from "@/cms-hygraph";

const props =
  defineProps<{
    icon: string;
    title: string;
    gameProvider: Provider;
  }>();

const carouselRef = ref();

const next = () => {
  carouselRef.value.next();
};
const prev = () => {
  carouselRef.value.prev();
};
const games: Game[] = shuffle([
  {
    id: "1",
    title: "Adventure Era",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/d18a7c480b53fd1b9d7ce0915076ee752a0f812a.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "2",
    title: "Gangster's Gold",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/98d2c5c862c5c339f12dae7864ce4b49f29b2149.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "3",
    title: "Crazy Coin Flip",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/6ce09c5cab1a25b3adbaa6145446dfe63ce50c97.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "4",
    title: "Endless Treasure",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/cc0e8802333702d6f4283587f55c0e8050a420e2.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "5",
    title: "Fire Joker",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/449ed8893147e12a533bc5c7a297e934a24eb60d.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "6",
    title: "Book Of Dead",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/f5bad14aea98b67fbd00e7d2e364e5a6ddfe400c.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "11",
    title: "Crazy Coin Flip",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/d18a7c480b53fd1b9d7ce0915076ee752a0f812a.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "12",
    title: "Endless Treasure",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/98d2c5c862c5c339f12dae7864ce4b49f29b2149.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "7",
    title: "Fire Joker",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/d18a7c480b53fd1b9d7ce0915076ee752a0f812a.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "13",
    title: "Adventure Era",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/6ce09c5cab1a25b3adbaa6145446dfe63ce50c97.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "14",
    title: "Gangster's Gold",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/cc0e8802333702d6f4283587f55c0e8050a420e2.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "15",
    title: "Crazy Coin Flip",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/449ed8893147e12a533bc5c7a297e934a24eb60d.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "16",
    title: "Endless Treasure",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/f5bad14aea98b67fbd00e7d2e364e5a6ddfe400c.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "17",
    title: "Book Of Dead",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/d18a7c480b53fd1b9d7ce0915076ee752a0f812a.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "22",
    title: "Crazy Coin Flip",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/98d2c5c862c5c339f12dae7864ce4b49f29b2149.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "23",
    title: "Endless Treasure",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/6ce09c5cab1a25b3adbaa6145446dfe63ce50c97.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "24",
    title: "Adventure Era",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/cc0e8802333702d6f4283587f55c0e8050a420e2.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "25",
    title: "Gangster's Gold",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/449ed8893147e12a533bc5c7a297e934a24eb60d.mp4?tr=f-webm,h-300,r-7",
    },
  },
  {
    id: "26",
    title: "Crazy Coin Flip",
    artwork: {
      id: "1",
      url: "https://media.graphassets.com/rrBup47GTbkhJouqUs71",
    },
    video: {
      id: "video_id",
      url: "https://ik.imagekit.io/gamba/f5bad14aea98b67fbd00e7d2e364e5a6ddfe400c.mp4?tr=f-webm,h-300,r-7",
    },
  },
]);
</script>
<template>
  <div class="GamesRow">
    <div class="text-steel-color font-medium">
      <div class="flex items-center gap-2.5">
        <div class="flex-none mr-auto">
          <NuxtLink class="group block" to="/">
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
    <CasinoCarousel :slides="games" ref="carouselRef">
      <template #default="{ slide }">
        <GameTile :game="slide" />
      </template>
    </CasinoCarousel>
  </div>
</template>
