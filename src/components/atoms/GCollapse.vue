<template>
  <div
    class="
      relative
      flex
      items-center
      justify-center
      p-4
      bg-gray-200
      cursor-pointer
    "
    @click="collapsed = !collapsed"
  >
    <div>
      <slot name="trigger"></slot>
    </div>
    <div
      :class="[
        collapsed && 'arrow-flip',
        props.left ? 'left-[15px]' : 'right-[15px]',
      ]"
      class="
        absolute
        flex
        justify-center
        items-center
        transition-all
        duration-300
      "
    >
      <span
        class="
          flex
          justify-center
          items-center
          before:bg-steel-color
          before:relative
          before:w-2
          before:h-[3px]
          before:rotate-45
          before:left-[2px]
          after:bg-steel-color
          after:relative
          after:w-2
          after:h-[3px]
          after:-rotate-45 after:-left-[2px]
        "
      >
      </span>
    </div>
  </div>
  <div
    class="collapse-content overflow-hidden"
    :style="dynamicStyles"
    ref="content"
  >
    <slot name="default"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

let originalHeight: number = 0;
const props = defineProps({
  left: {
    type: Boolean,
    default: false,
  },
});
const collapsed = ref<boolean>(false);
const mounted = ref<boolean>(false);
const content = ref<HTMLDivElement>();
const dynamicStyles = computed(() => {
  if (collapsed.value) {
    return {
      height: "0px",
    };
  } else if (mounted.value) {
    return { height: `${originalHeight}px` };
  } else {
    return {};
  }
});

onMounted(() => {
  originalHeight = content.value.offsetHeight;
  collapsed.value = true;
  mounted.value = true;
});
</script>

<style scoped>
.arrow-flip {
  transform: rotateX(180deg);
}

.collapse-content {
  transition: height 0.3s ease-in-out;
}
</style>
