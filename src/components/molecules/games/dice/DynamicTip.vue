<script setup lang="ts">
const props = defineProps({
  randomValue: {
    type: Number,
  },
});
</script>

<template>
  <div class="relative w-full h-[55px]">
    <div
      class="
        bg-dark-color
        rounded-lg
        w-[70px]
        h-[45px]
        absolute
        -translate-x-1/2
        transition
        flex flex-row
        items-center
        justify-center
      "
      :style="[`left:${props.randomValue}%`]"
    >
      <p
        class="
          items-baseline
          py-3
          transition-all
          item-center
          sm:text-base
          md:text-lg
          text-primary-color
        "
      >
        {{ props.randomValue }}
      </p>
      <div
        class="
          absolute
          rotate-45
          left-1/2
          -translate-x-1/2
          -bottom-5
          -translate-y-1/2
          w-5
          h-5
          rounded-[2px]
          bg-dark-color bg-clip-padding
          border-2 border-transparent
        "
      ></div>
    </div>
  </div>
</template>

<style scoped>
.transition {
  transition-property: left;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}
</style>
