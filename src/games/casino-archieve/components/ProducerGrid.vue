<script setup lang="ts">
import { THEME } from "~/constants";
import { useValueInContainer } from "~/hooks";
import { GameProducer } from "@/types";

defineProps<{
  producers: GameProducer[];
}>();

const {
  breakpoints: { sm, md },
} = inject(THEME)!;
const columns = useValueInContainer({
  0: 3,
  [sm]: 4,
  [md]: 5,
  950: 6,
  1100: 7,
  1250: 8,
});
</script>
<template>
  <div class="ProducerGrid">
    <div v-if="producers.length">
      <div
        class="grid gap-x-2.5 gap-y-5 md:gap-x-[17px] md:gap-y-[30px] g-mb-md"
        :style="{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }"
      >
        <div v-for="producer of producers" :key="producer.id">
          <NuxtLink class="block" :to="`/casino/provider/${producer.slug}`">
            <div
              class="
                h-[45px]
                md:h-[60px]
                flex
                items-center
                justify-center
                rounded-lg
                bg-secondary-gradient
                px-5
                border-2 border-secondary-color
                transition-all
                duration-300
                mouse:hover:-translate-only-y-1.5
                cursor-pointer
              "
            >
              <img :src="producer.image" class="max-h-[80%]" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
