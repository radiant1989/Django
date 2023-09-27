<script setup lang="ts">
import { Navigation } from "@gambalabs/vue3-carousel";
const prev = inject("nav.prev");
const nav = inject("nav")!;
provide("nav", { ...nav, prev });
</script>
<template>
  <Navigation class="GCarouselNavigation"></Navigation>
</template>
<style lang="scss">
.GCarouselNavigation {
  --vc-nav-color: transparent;
  --vc-nav-color-hover: white;
  margin: 0;
  height: 100%;
  transition: all 0.1s ease-in;
  &.carousel__prev {
    left: -30px;
    &--disabled {
      display: none;
    }
  }
  &.carousel__next {
    right: -30px;
    &--disabled {
      display: none;
    }
  }
}
.GCarousel.is-hover {
  .GCarouselNavigation {
    color: var(--vc-nav-color-hover);
  }
}
</style>
