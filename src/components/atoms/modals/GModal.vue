<script setup lang="ts">
import { watch, ref } from "vue";
const props = defineProps({
  isOpen: {
    type: Boolean,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  top: {
    type: Number,
    default: 150,
  },
});
const isAnimationStarted = ref<boolean>(false);
watch(
  () => props.height,
  () => {
    isAnimationStarted.value = true;
    setTimeout(() => {
      isAnimationStarted.value = false;
    }, 300);
  }
);
const emit =
  defineEmits<{
    (e: "closed:modal"): void;
  }>();
const handleCloseModal = () => {
  emit("closed:modal");
};
const onPreventClick = (event: Event) => {
  event.preventDefault();
};
</script>
<template>
  <div
    class="
      fixed
      top-0
      left-0
      w-full
      h-full
      bg-opacity-70 bg-[#11141c]
      overflow-auto
      transition-all
      duration-300
      ease-in-out
      z-30
    "
    v-if="isOpen"
    @click="handleCloseModal"
  >
    <div
      class="
        flex flex-col
        m-auto
        bg-ebony-clay-color
        border-[1.87px] border-cloud-burst-color
        rounded-lg
        transition-all
        duration-200
        ease-in-out
        relative
      "
      :style="{
        width: `${width}px`,
        height: `${height}px`,
        marginTop: `${top}px`,
      }"
      :class="isAnimationStarted ? 'overflow-hidden' : ''"
      @click.stop="onPreventClick"
    >
      <slot name="content"> </slot>
    </div>
  </div>
</template>
