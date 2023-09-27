<script setup lang="ts">
import { GButton } from "~/components/atoms";

const history = [
  { id: 1, value: 4.2, active: true },
  { id: 2, value: 1.2, active: false },
  { id: 3, value: 2.7, active: true },
  { id: 4, value: 20.1, active: true },
  { id: 5, value: 1.75, active: false },
];
</script>
<template>
  <div class="GameHistory">
    <div class="flex items-start justify-end gap-x-[25px]">
      <div class="flex flex-wrap justify-end gap-2 md:gap-2.5">
        <div
          v-for="historyItem in history"
          :key="historyItem.id"
          class="md:min-w-[60px]"
        >
          <GButton
            :style-type="
              historyItem.active ? 'primary-shadow-sm' : 'secondary-shadow-sm'
            "
          >
            {{ historyItem.value.toFixed(2) }}x
          </GButton>
        </div>
      </div>
      <div
        class="text-white text-sm font-medium flex items-center md:h-[30px]"
      >
        History
      </div>
    </div>
  </div>
</template>
