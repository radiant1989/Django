<script setup lang="ts">
import { Module, Provider } from "@/cms-hygraph";
import { GameCategory } from "@/types";
import ArchiveHeader from "./ArchieveHeader.vue";
import SearchInput from "./SearchInput.vue";
import CategoryGames from "./CategoryGames.vue";
import ProvidersSelection from "./ProvidersSelect.vue";
import { filterIcon, providerIcon, sortByIcon } from "~/icons";
import SortBySelect from "./SortBySelect.vue";
import { SortBy } from "../types";
import { POPULAR } from "../constants";
import GameProducersRow from "~/games/casino/components/GameProducersRow.vue";

const props =
  defineProps<{
    modules: Module[];
    category: GameCategory;
    providers: Provider[];
  }>();
const searchQuery = ref<string>("");
const sortBy = ref<SortBy>(POPULAR);
const module = props.modules.find((m) => m.slug === props.category.slug)!;
const selectedProviders = ref([]);
</script>
<template>
  <div class="CasinoCategory">
    <div class="g-mb-md">
      <ArchiveHeader :title="category.name" :image="module.headerImage" />
    </div>
    <div class="g-mb-md">
      <SearchInput placeholder="Search for games" v-model="searchQuery" />
    </div>
    <div class="g-mb-md">
      <div class="flex items-center text-steel-color">
        <div class="flex-none mr-2 hidden md:block">
          <svg class="w-4 h-4">
            <use :xlink:href="filterIcon"></use>
          </svg>
        </div>
        <span class="hidden md:block text-white mr-4 font-semibold"
          >Filter by</span
        >
        <div class="flex-none mr-auto">
          <ProvidersSelection
            :providers="providers"
            v-model="selectedProviders"
          />
        </div>
        <span class="flex-none hidden md:block mr-2 text-white font-semibold">
          Sort by
        </span>
        <div class="flex-none mr-4">
          <svg class="w-[18px] h-[18px]">
            <use :xlink:href="sortByIcon"></use>
          </svg>
        </div>
        <div class="flex-none">
          <SortBySelect v-model="sortBy" />
        </div>
      </div>
    </div>
    <div class="g-mb-md">
      <CategoryGames :category="category" />
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
