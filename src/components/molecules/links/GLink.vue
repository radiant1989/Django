<script setup lang="ts">
import { TEST_ROUTES } from "~/constants/mock_data";
</script>

<template>
  <a
    class="flex flex-row items-center gap-2 py-[10px]"
    v-for="(route, index) in TEST_ROUTES"
    :key="route.path"
    href="#"
    :class="
      index === 1
        ? 'border-b-midnight-express-color border-b-[2px] pb-[20px]'
        : index === 2
        ? 'pt-[20px]'
        : ''
    "
  >
    <span class="text-steel-color text-[16px] leading-[20px]">
      {{ route.name }}
    </span>
  </a>
</template>
