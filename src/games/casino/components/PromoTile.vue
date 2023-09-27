<script setup lang="ts">
import type { Promo } from "~/cms-hygraph";

defineProps<{
  promo: Promo;
}>();

</script>
<template>
  <NuxtLink
    class="PromoTile block rounded-lg bg-cover bg-center"
    style="aspect-ratio: 440/255"
    :style="{ backgroundImage: `url(${promo.promoImage.url})` }"
    :to="`promotions/promotion/coming`"
  >
  </NuxtLink>
</template>
