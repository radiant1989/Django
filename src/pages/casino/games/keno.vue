<template>
  <div class="KenoPage g-p-page">
    <div class="max-w-content mx-auto">
      <div class="flex flex-wrap gap-5">
        <div class="flex-1 min-w-0 lg:order-1">
          <div
            class="
              h-full
              rounded-lg
              bg-ebony-clay-color
              border-t border-cloud-burst-color
            "
          >
            <GamePane />
          </div>
        </div>
        <div class="w-full lg:w-[340px]">
          <div
            class="
              h-full
              p-5
              rounded-lg
              bg-ebony-clay-color
              border-t border-cloud-burst-color
            "
          >
            <BetFormContainer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BetFormContainer from "@/games/keno/components/BetFormContainer.vue";
import GamePane from "@/games/keno/components/GamePane.vue";
</script>
