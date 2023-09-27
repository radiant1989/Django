<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import { THEME } from "@/constants";
import GCloseButton from "./GCloseButton.vue";

type ClosePosition = {
  top: string;
  right: string;
};
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    placement?: string;
    width?: string;
    closable?: boolean;
    closePosition?: ClosePosition;
  }>(),
  {
    placement: "left",
    closable: true,
    closePosition: {
      top: "20px",
      right: "20px",
    },
    width: "100%",
  }
);

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
const { muteBodyScroll } = inject(THEME)!;
const state = reactive({
  isOpen: props.modelValue,
});
const onAfterLeave = () => {
  state.isOpen = false;
};
watch(
  () => props.modelValue,
  (visible: boolean) => {
    if (visible) {
      state.isOpen = true;
      muteBodyScroll.value = muteBodyScroll.value + 1;
    } else {
      muteBodyScroll.value = muteBodyScroll.value - 1;
    }
  }
);
</script>
<template>
  <Teleport to="body" v-if="state.isOpen">
    <Transition
      appear
      name="custom"
      enter-active-class="duration-200 ease-in"
      :enter-from-class="
        props.placement === 'left' ? '-translate-x-full' : 'translate-x-full'
      "
      enter-to-class="sm:translate-x-0 md:tanslate-x-full"
      leave-active-class="duration-200 ease-in"
      leave-from-class="translate-x-0"
      :leave-to-class="
        props.placement === 'left' ? '-translate-x-full' : 'translate-x-full'
      "
      @after-leave="onAfterLeave"
    >
      <div
        class="fixed w-screen z-50 bg-ebony-clay-color top-0 h-screen"
        :class="placement === 'left' ? 'left-0' : 'right-0'"
        :style="{
          maxWidth: props.width,
        }"
        v-if="modelValue"
      >
        <slot></slot>
        <div
          v-if="closable"
          class="absolute"
          :style="{
            top: props.closePosition.top,
            right: props.closePosition.right,
          }"
        >
          <GCloseButton @click="$emit('update:modelValue', false)" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
