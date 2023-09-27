<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from "@/libraries/carousel";
import { THEME } from "~/constants";
const {
  screen,
  breakpoints: { sm, md, lg },
} = inject(THEME)!;
const current = ref(0);
const carouselRef = ref();

const next = () => {
  carouselRef.value.next();
};
const prev = () => {
  carouselRef.value.prev();
};
const slides = [
  {
    id: 1,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/d18a7c480b53fd1b9d7ce0915076ee752a0f812a.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 2,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/98d2c5c862c5c339f12dae7864ce4b49f29b2149.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 3,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/6ce09c5cab1a25b3adbaa6145446dfe63ce50c97.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 4,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/cc0e8802333702d6f4283587f55c0e8050a420e2.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 5,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/449ed8893147e12a533bc5c7a297e934a24eb60d.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 6,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/f5bad14aea98b67fbd00e7d2e364e5a6ddfe400c.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 11,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/d18a7c480b53fd1b9d7ce0915076ee752a0f812a.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 12,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/98d2c5c862c5c339f12dae7864ce4b49f29b2149.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 7,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/d18a7c480b53fd1b9d7ce0915076ee752a0f812a.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 13,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/6ce09c5cab1a25b3adbaa6145446dfe63ce50c97.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 14,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/cc0e8802333702d6f4283587f55c0e8050a420e2.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 15,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/449ed8893147e12a533bc5c7a297e934a24eb60d.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 16,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/f5bad14aea98b67fbd00e7d2e364e5a6ddfe400c.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 17,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/d18a7c480b53fd1b9d7ce0915076ee752a0f812a.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 22,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/98d2c5c862c5c339f12dae7864ce4b49f29b2149.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 23,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/6ce09c5cab1a25b3adbaa6145446dfe63ce50c97.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 24,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/cc0e8802333702d6f4283587f55c0e8050a420e2.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 25,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/449ed8893147e12a533bc5c7a297e934a24eb60d.mp4?tr=f-webm,h-300,r-7",
  },
  {
    id: 26,
    title: "Title here",
    content: "Description here",
    src: "https://ik.imagekit.io/gamba/f5bad14aea98b67fbd00e7d2e364e5a6ddfe400c.mp4?tr=f-webm,h-300,r-7",
  },
];
const carouselOptions = computed(() => {
  const breakpoints = {
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
    [lg]: {
      itemsToShow: 8.25,
      itemsToScroll: 8,
    },
  };
  if (screen.value.lg) {
    return breakpoints[lg];
  } else if (screen.value.md) {
    return breakpoints[md];
  } else if (screen.value.sm) {
    return breakpoints[sm];
  } else {
    return breakpoints[0];
  }
});
</script>
<template>
  <div>
    <div class="flex justify-end gap-x-3">
      <button class="disabled:opacity-40" @click="prev" :disabled="carouselRef?.isCurrentStart">prev</button>
      <button class="disabled:opacity-40" @click="next" :disabled="carouselRef?.isCurrentEnd">next</button>
    </div>
    <div class="-ml-[5px] md:-ml-[15px] relative">
      <Carousel
        :transition="500"
        :mouseDrag="false"
        snap-align="start"
        v-model="current"
        ref="carouselRef"
        v-bind="carouselOptions"
      >
        <!-- adjust gap between slides using padding -->
        <Slide
          v-for="slide in slides"
          :key="slide.id"
          class="pl-[5px] md:pl-[15px]"
        >
          <div
            class="
              w-full
              pt-4
              transition-all
              duration-300
              hover:-translate-only-y-4
            "
          >
            <video
              class="w-full rounded-lg aspect-[150/200]"
              loop
              onmouseover="this.play()"
              onmouseout="this.pause();this.currentTime=0;"
            >
              <source :src="`${slide.src}`" type="video/webm" />
            </video>
          </div>
        </Slide>
      </Carousel>
      <div
        class="hidden lg:block absolute right-0 inset-y-0 cursor-pointer"
        @click="next"
        v-if="!carouselRef?.isCurrentEnd"
        style="
          width: calc(100% / 32);
          background-image: linear-gradient(
            to right,
            transparent,
            rgba(0, 0, 0, 1)
          );
        "
      ></div>
    </div>
  </div>
</template>
<style></style>
