<script setup lang="ts">
import { Carousel, Slide, Navigation, Pagination } from "~/libraries/carousel";
import PromoTile from "./PromoTile.vue";
import { Promo } from "@/cms-hygraph";
import { THEME } from "~/constants";
import { CASINO_HOME } from "../constants";
import { useValueInContainer } from "@/hooks";

const { screen, breakpoints } = inject(THEME)!;
const { promos } = inject(CASINO_HOME)!;
const options = useValueInContainer({
  0: {
    itemsToShow: 1,
    itemsToScroll: 1,
  },
  [breakpoints.sm]: {
    itemsToShow: 2,
    itemsToScroll: 2,
  },
  [breakpoints.lg]: {
    itemsToShow: 3,
    itemsToScroll: 3,
  },
});
</script>
<template>
  <div class="PromosBanner">
    <div class="-mx-2.5">
      <ClientOnly>
        <Carousel :mouseDrag="false" v-bind="options" snap-align="start">
          <Slide v-for="promo in promos" :key="promo.id" class="px-2.5">
            <PromoTile :promo="promo" />
          </Slide>
          <template #addons>
            <Navigation v-if="screen.md" />
            <Pagination v-else />
          </template>
        </Carousel>
      </ClientOnly>
    </div>
  </div>
</template>
