<template>
  <div
    class="bg-ebony-clay-color border-t-2 border-t-cloud-burst-color rounded-lg"
  >
    <GTransitionHeight :initial-state="false" v-slot="{ state, setState }">
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
        <div
          class="text-steel-color child hover:text-white"
          @hover.self
          @click.stop
        >
          <span class="md:text-base text-sm text-white">{{ title }} </span>
          <span class="md:text-base text-sm text-slate-color"
            >&nbsp;-&nbsp;</span
          >
          <span class="text-sm md:text-base">{{ category }}</span>
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
        <slot name="table"></slot>
      </template>
    </GTransitionHeight>
  </div>
</template>
<script setup lang="ts">
import { GTransitionHeight } from "~/components/atoms";
import { arrowBelowIcon } from "~/icons";
defineProps<{
  title: string;
  category: string;
}>();
</script>
<style scoped>
.parent:hover {
  color: white;
}
.child:hover ~ * {
  color: #858da0;
}
</style>
