<script setup lang="ts" generic="T extends {id: ID}">
import { Carousel, Slide } from "@/libraries/carousel";
import { CONTAINER, THEME } from "~/constants";
import { useValueInContainer } from "@/hooks";

import { ID } from "~/types";

const props =
  defineProps<{
    slides: Array<T>;
  }>();
defineEmits<{
  (e: "before-init"): void;
  (e: "init"): void;
}>();
const {
  breakpoints: { sm, md },
} = inject(THEME)!;
const { containerScreen } = inject(CONTAINER)!;
const current = ref(0);
const carouselRef = ref();

const next = () => {
  carouselRef.value.next();
};
const prev = () => {
  carouselRef.value.prev();
};
const getItemsToShow = (w: number) => (w + 15) / (150 + 15);
const carouselOptions = useValueInContainer({
  0: {
    itemsToShow: 3,
    itemsToScroll: 3,
  },
  [sm]: {
    itemsToShow: 4,
    itemsToScroll: 4,
  },
  [md]: {
    itemsToShow: 5,
    itemsToScroll: 5,
  },
  800: {
    itemsToShow: getItemsToShow(900),
    itemsToScroll: Math.floor(getItemsToShow(900)),
  },
  950: {
    itemsToShow: getItemsToShow(1050),
    itemsToScroll: Math.floor(getItemsToShow(1050)),
  },
  1100: {
    itemsToShow: getItemsToShow(1200),
    itemsToScroll: Math.floor(getItemsToShow(1200)),
  },
  1250: {
    itemsToShow: getItemsToShow(1360),
    itemsToScroll: Math.floor(getItemsToShow(1360)),
  },
});
const decimalSlideWidth = computed(
  () =>
    carouselOptions.value &&
    (carouselOptions.value.itemsToShow - carouselOptions.value.itemsToScroll) /
      carouselOptions.value.itemsToShow
);

defineExpose({
  next,
  prev,
  isCurrentEnd: computed(() => carouselRef.value?.isCurrentEnd),
  isCurrentStart: computed(() => carouselRef.value?.isCurrentStart),
});
</script>
<template>
  <div class="RowCarousel relative">
    <div class="overflow-hidden">
      <div class="-ml-[5px] md:-ml-[15px] relative">
        <ClientOnly>
          <Carousel
            :transition="500"
            :mouseDrag="false"
            snap-align="start"
            v-model="current"
            ref="carouselRef"
            v-bind="carouselOptions"
            @before-init="$emit('before-init')"
            @init="$emit('init')"
          >
            <!-- adjust gap between slides using padding -->
            <Slide
              v-for="slide in slides"
              :key="slide.id"
              class="pl-[5px] md:pl-[15px]"
            >
              <div class="pt-2.5">
                <slot :slide="slide"></slot>
              </div>
            </Slide>
            <template #addons> </template>
          </Carousel>
        </ClientOnly>
      </div>
    </div>
    <div
      class="absolute -right-0.5 inset-y-0 cursor-pointer"
      @click="next"
      v-if="!carouselRef?.isCurrentEnd && containerScreen.width >= 800"
      style="
        background-image: linear-gradient(
          to left,
          #10131a,
          #10131a 2px,
          transparent
        );
      "
      :style="{ width: `calc(${decimalSlideWidth * 100}% + 2px)` }"
    ></div>
  </div>
</template>
