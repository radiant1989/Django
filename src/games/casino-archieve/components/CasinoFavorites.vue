<script setup lang="ts">
import { Module, Provider } from "@/cms-hygraph";
import ArchiveHeader from "./ArchieveHeader.vue";
import SearchInput from "./SearchInput.vue";
import FavoriteGames from "./FavoriteGames.vue";
import { providerIcon } from "~/icons";
import GameProducersRow from "~/games/casino/components/GameProducersRow.vue";

const props =
  defineProps<{
    modules: Module[];
    providers: Provider[];
  }>();
const searchQuery = ref<string>("");
const module = props.modules.find((m) => m.slug === "favorites")!;
</script>
<template>
  <div class="CasinoFavorites">
    <div class="g-mb-md">
      <ArchiveHeader title="Favorites" :image="module.headerImage" />
    </div>
    <div class="g-mb-md">
      <SearchInput placeholder="Search for games" v-model="searchQuery" />
    </div>
    <div class="g-mb-md">
      <FavoriteGames />
    </div>
    <div>
      <GameProducersRow
        :icon="providerIcon"
        title="Providers"
        :providers="providers"
      />
    </div>
  </div>
</template>
