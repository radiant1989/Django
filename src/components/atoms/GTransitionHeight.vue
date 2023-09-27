<script setup lang="ts">
import { watch } from "vue";
import { useElementRect } from "~/hooks";

const props = withDefaults(
  defineProps<{
    initialState?: any;
  }>(),
  { initialState: false }
);

const contentRef = ref(null);
const { ready, height } = useElementRect(contentRef);
const state = ref(props.initialState);
const setState = (v: any) => {
  state.value = v;
  transitioning.value = true; // NOTE: this is intended action, but may not be whether this will trigger transtion
};
const transitioning = ref<boolean>(false);
const style = computed(() => {
  if (!ready.value) return {};
  return {
    height: `${height.value}px`,
  };
});
watch(
  () => props.initialState,
  (value) => {
    state.value = value;
  }
);
</script>
<template>
  <div class="GTransitionHeight">
    <div
      class="overflow-hidden transition-all duration-200"
      :style="style"
      @transitionstart="transitioning = true"
      @transitionend="transitioning = false"
    >
      <div class="p-0" ref="contentRef">
        <slot
          :state="state"
          :transitioning="transitioning"
          :setState="setState"
        ></slot>
      </div>
    </div>
  </div>
</template>
