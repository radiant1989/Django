<script setup lang="ts">
import { GameProducer } from "@/types";
import { PAGE_LOADING } from "~/constants";
import { GAME_PRODUCER_QUERY } from "~/graphql";

const { data: producerResult, pending: producerLoading } = useAsyncQuery<{
  gameProducer: GameProducer;
}>({
  query: GAME_PRODUCER_QUERY,
  variables: { slug: "3oaks" },
});
const loading = computed(() => producerLoading.value);
const { useAddLoading } = inject(PAGE_LOADING)!;
const { add: addLoading, remove: removeLoading } = useAddLoading();

watch(
  () => loading.value,
  (isLoading) => {
    // console.log('isLoading', isLoading);
    if (isLoading) {
      addLoading();
    } else {
      removeLoading();
    }
  },
  { immediate: loading.value }
);
</script>
<template>
  <div class="text-white">
    <div v-if="!loading">show</div>
    <div v-else>hide</div>
  </div>
</template>
