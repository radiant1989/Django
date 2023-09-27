<script setup lang="ts">
import GameHistory from './GameHistory.vue';
import GameMain from './GameMain.vue';
import GameFooterBar from './GameFooterBar.vue';
</script>
<template>
  <div class="GamePane">
    <div class="pt-[30px] px-5 md:px-10 md:pt-10 pb-10">
      <div class="mb-10 lg:mb-20">
        <GameHistory />
      </div>
      <div>
        <GameMain />
      </div>
    </div>
    <div class="rounded-b-lg bg-secondary-gradient">
      <GameFooterBar />
    </div>
  </div>
</template>