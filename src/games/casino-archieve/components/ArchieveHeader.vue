<script setup lang="ts">
import { Asset } from "~/cms-hygraph";

defineProps<{
  title: string;
  image?: Asset;
}>();
</script>
<template>
  <div
    class="
      pl-[30px]
      md:pr-[112px]
      bg-ebony-clay-color
      border-t border-cloud-burst-color
      rounded-lg
    "
  >
    <div class="h-[62px] md:h-[92px] lg:h-[134px] flex">
      <div class="self-center mr-auto">
        <h3 class="text-lg font-bold text-white">{{ title }}</h3>
      </div>
      <div class="self-end">
        <img class="object-cover object-center w-[132px] md:w-[200px] lg:w-[280px]" :src="image?.url" />
      </div>
    </div>
  </div>
</template>
