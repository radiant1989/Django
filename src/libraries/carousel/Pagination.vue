<script setup lang="ts">
import { Pagination } from "@gambalabs/vue3-carousel";
</script>
<template>
  <Pagination class="GCarouselPagination" />
</template>
<style lang="scss">
.GCarouselPagination {
  --vc-pgn-width: 7px;
  --vc-pgn-height: 7px;
  --vc-pgn-border-radius: 7px;
  --vc-pgn-active-color: theme("colors.primary-color");
  @apply mt-1.5 md:mt-2.5;
  .carousel__pagination-item {
  }
  .carousel__pagination-button {
    &::after {
      background-image: theme("backgroundImage.secondary-gradient");
      border: 1px solid;
      border-color: theme("colors.secondary-color");
    }
    &--active::after {
      background-image: theme("backgroundImage.primary-gradient");
      border-color: theme("colors.primary-color");
    }
  }
}
</style>
