<script setup lang="ts">
import { Module, Provider } from "@/cms-hygraph";
import { GameProducer } from "@/types";
import ArchiveHeader from "./ArchieveHeader.vue";
import SearchInput from "./SearchInput.vue";
import ProducerGrid from "./ProducerGrid.vue";

const props =
  defineProps<{
    modules: Module[];
    producers: GameProducer[];
  }>();
const searchQuery = ref<string>("");
const module = props.modules.find((m) => m.slug === "providers")!;
const searchedProducers = computed(() => props.producers.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase())))
</script>
<template>
  <div class="CasinoRecents">
    <div class="g-mb-md">
      <ArchiveHeader title="Providers" :image="module?.headerImage" />
    </div>
    <div class="g-mb-md">
      <SearchInput placeholder="Search for providers" v-model="searchQuery" />
    </div>
    <div class="g-mb-md">
      <ProducerGrid :producers="searchedProducers" />
    </div>
  </div>
</template>
