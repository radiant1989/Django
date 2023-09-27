<script setup lang="ts">
import { Module } from "@/cms-hygraph";
import ArchiveHeader from "./ArchieveHeader.vue";
import SearchInput from "./SearchInput.vue";
import ProducerGames from "./ProducerGames.vue";
import { GButton } from "@/components/atoms";
import { providerIcon, sortByIcon } from "~/icons";
import SortBySelect from "./SortBySelect.vue";
import { SortBy } from "../types";
import { GameProducer } from "@/types";
import { POPULAR } from "../constants";
import GameProducersRow from "~/games/casino/components/GameProducersRow.vue";

const props =
  defineProps<{
    modules: Module[];
    producer: GameProducer;
    producers: GameProducer[];
  }>();
const searchQuery = ref<string>("");
const sortBy = ref<SortBy>(POPULAR);
const module = props.modules.find((m) => m.slug === "providers")!;
</script>
<template>
  <div class="CasinoProducer">
    <div class="g-mb-md">
      <ArchiveHeader :title="producer.name" :image="module?.headerImage" />
    </div>
    <div class="g-mb-md">
      <SearchInput
        :placeholder="`Search ${producer.name} games`"
        v-model="searchQuery"
      />
    </div>
    <div class="g-mb-md">
      <div class="flex items-center text-steel-color">
        <div class="flex-none mr-auto">
          <NuxtLink class="block" to="/casino/providers">
            <GButton style-type="secondary" class="!px-3"
              >View All Providers</GButton
            >
          </NuxtLink>
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
      <ProducerGames
        :producer="producer"
        :keyword="searchQuery"
        :sortBy="sortBy"
      />
    </div>
    <div>
      <GameProducersRow
        :icon="providerIcon"
        title="Providers"
        :producers="producers"
      />
    </div>
  </div>
</template>
