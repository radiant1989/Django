<script setup lang="ts">
import { roundRightArrowIcon, roundLeftArrowIcon } from "~/icons";
import CasinoCarousel from "./CasinoCarousel.vue";
import { GButton } from "@/components/atoms";
import { GameProducer } from "@/types";

const props =
  defineProps<{
    icon: string;
    title: string;
    producers: GameProducer[];
  }>();

const carouselRef = ref();

const next = () => {
  carouselRef.value.next();
};
const prev = () => {
  carouselRef.value.prev();
};
</script>
<template>
  <div class="ProducersRow">
    <div class="text-steel-color font-medium">
      <div class="flex items-center gap-2.5">
        <div class="flex-none mr-auto">
          <NuxtLink class="group block" to="/casino/providers">
            <div class="flex items-center gap-[5px] group-active:scale-95">
              <svg class="w-6 h-6 pt-1 text-steel-color group-hover:text-white">
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
          <NuxtLink class="block" to="/casino/providers">
            <GButton class="px-4" style-type="secondary-control">
              <span>See all</span>
            </GButton>
          </NuxtLink>
        </div>
      </div>
    </div>
    <CasinoCarousel :slides="producers" ref="carouselRef">
      <template #default="{ slide }">
        <NuxtLink class="block" :to="`/casino/provider/${slide.slug}`">
          <div
            class="
              h-[45px]
              md:h-[60px]
              flex
              items-center
              justify-center
              rounded-lg
              bg-secondary-gradient
              px-5
              py-2
              border-2 border-secondary-color
              transition-all
              duration-300
              mouse:hover:-translate-only-y-1.5
              cursor-pointer
            "
          >
            <img :src="slide.image" class="max-h-full" />
          </div>
        </NuxtLink>
      </template>
    </CasinoCarousel>
  </div>
</template>
