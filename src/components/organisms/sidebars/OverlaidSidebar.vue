<script setup lang="ts">
import { default as GSidebar } from "./Leftbar.vue";

defineProps<{
  isOpened: boolean;
  isTriggered: boolean;
  sidebarWidth: string;
}>();

const emits =
  defineEmits<{
    (e: "close:overlay"): void;
    (e: "update:modelValue"): void;
  }>();

const onContainerClick = (e: MouseEvent): void => {
  emits("close:overlay");
};
</script>
<template>
  <Transition
    appear
    name="custom"
    enter-active-class="duration-100 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="fixed inset-0 overlay-container"></div>
  </Transition>

  <div
    class="fixed inset-0 overflow-y-auto"
    style="z-index: 101"
    @click="onContainerClick"
  >
    <Transition
      appear
      enter-active-class="duration-200 ease-in-out"
      enter-from-class="
         -translate-x-full
        "
      enter-to-class="tanslate-x-full"
      v-if="isTriggered"
    >
      <GSidebar
        :is-opened="isOpened"
        @update:model-value="$emit('update:modelValue')"
        :width="sidebarWidth"
        @click.stop
      />
    </Transition>
    <GSidebar
      :is-opened="isOpened"
      @update:model-value="$emit('update:modelValue')"
      :width="sidebarWidth"
      @click.stop
      v-else
    />
  </div>
</template>
<style scoped>
.overlay-container {
  background: rgba(17, 20, 28, 0.7);
  z-index: 100;
}
</style>
