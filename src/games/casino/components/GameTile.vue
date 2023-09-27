<script setup lang="ts">
import type { Game } from "@/types";
import { THEME } from "~/constants";

defineProps<{
  game: Game;
}>();
const { screen } = inject(THEME)!;

</script>
<template>
  <div class="GameTile cursor-pointer">
    <div class="w-full transition-all duration-300 mouse:hover:-translate-only-y-2">
      <div
        class="relative aspect-[150/200] mb-2.5"
      >
        <video
          v-if="game.video?.url && screen.md"
          class="w-full g-rounded-tile h-full"
          loop
          onmouseover="this.play()"
          onmouseout="this.pause();this.currentTime=0;"
        >
          <source :src="`${game.video?.url}`" type="video/webm" />
        </video>
        <div v-else class="w-full h-full g-rounded-tile bg-center bg-cover" :style="{backgroundImage: `url(${game.image})`}"></div>
        <div class="absolute inset-0 pointer-events-none border-t md:border-t-2 border-solid border-white/25 g-rounded-tile"></div>
      </div>
      <div class="g-text-sm font-medium text-left text-white">
        {{ game.title }}
      </div>
    </div>
  </div>
</template>
