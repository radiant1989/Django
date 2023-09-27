<script setup lang="ts">
import { GTransitionHeight } from "~/components/atoms";
import { arrowBelowIcon } from "~/icons";
import PlayersTable from "./PlayersTable.vue";
import { SOFTSWISS_GAME } from "../constants";

const { game } = inject(SOFTSWISS_GAME)!;
</script>
<template>
  <div
    class="
      GameMetaPane
      bg-ebony-clay-color
      rounded-lg
      border-2 border-cloud-burst-color
    "
  >
    <GTransitionHeight v-slot="{ state, setState }">
      <div
        @click="setState(!state)"
        class="
          h-[50px]
          md:h-[55px]
          relative
          flex
          items-center
          pl-5
          lg:pl-[24px]
          font-semibold
          cursor-pointer
          parent
          text-steel-color
        "
      >
        <div class="text-steel-color hover:text-white">
          <span class="md:text-base text-sm text-white">{{ game.title }} </span>
          -
          <span class="text-sm md:text-base">{{ game.gameCategory.name }}</span>
        </div>
        <div
          class="
            absolute
            top-1/2
            right-[17.5px]
            lg:right-[22px]
            -translate-y-1/2
          "
        >
          <svg
            class="
              h-[5px]
              w-2
              md:w-[14px]
              md:h-[8px]
              transition-transform
              duration-200
            "
            :class="state ? 'text-white' : ' group-hover:text-white'"
            :style="{
              transform: `rotateX(${state ? '180deg' : '0deg'})`,
            }"
          >
            <use :xlink:href="arrowBelowIcon"></use>
          </svg>
        </div>
      </div>
      <template v-if="state">
        <PlayersTable />
      </template>
    </GTransitionHeight>
  </div>
</template>
