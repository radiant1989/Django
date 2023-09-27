<script setup lang="ts">
import { Carousel } from "@gambalabs/vue3-carousel";
import { CarouselProps } from "./types";

const props = withDefaults(defineProps<CarouselProps>(), {
  itemsToShow: 1,
  itemsToScroll: 1,
  wrapAround: false,
  snapAlign: "center",
  transition: 300,
  autoplay: 0,
  modelValue: 0,
  mouseDrag: true,
  touchDrag: true,
  pauseAutoplayOnHover: false,
  dir: "ltr",
});
const emits =
  defineEmits<{
    (e: "update:modelValue", v: number): void;
  }>();

const carouselRef = ref();
const v = {
  get currentSlide() {
    return carouselRef.value?.data.currentSlide.value || 0;
  },
  get isCurrentEnd() {
    return carouselRef.value?.data.currentSlide.value === carouselRef.value?.data.maxSlide.value;
  },
  get isCurrentStart() {
    return carouselRef.value?.data.currentSlide.value === carouselRef.value?.data.minSlide.value;
  }
};
const isCurrentEnd = computed(() => v.isCurrentEnd);
const isCurrentStart = computed(() => v.isCurrentStart);
const prev = () => {
  // when slide snap is not left aligned at the end slide
  if (v.currentSlide !== Math.ceil(v.currentSlide)) {
    if (props.dir === "ltr") {
      // ensure snap left-align in prev
      carouselRef.value.slideTo(
        Math.ceil(v.currentSlide) - props.itemsToScroll
      );
    }
  } else {
    carouselRef.value.prev();
  }
};

const onUpdateModelValue = (slideIndex: number) => {
  emits("update:modelValue", slideIndex);
};
provide('nav.prev', prev);
defineExpose({
  prev,
  next: () => carouselRef.value.next(),
  isCurrentEnd: isCurrentEnd,
  isCurrentStart: isCurrentStart
});
</script>
<template>
  <Carousel
    class="GCarousel"
    ref="carouselRef"
    v-bind="props"
    @update:modelValue="onUpdateModelValue"
  >
    <!-- forward slots -->
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </Carousel>
</template>
<style lang="scss">

@import "@gambalabs/vue3-carousel/dist/carousel.css";
.GCarousel {
  .carousel__slide {
    display: block;
  }
}
</style>
