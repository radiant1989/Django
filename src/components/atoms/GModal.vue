<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import GScrollbar from "./GScrollbar.vue";
import GCloseButton from "./GCloseButton.vue";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    width?: string;
    center?: boolean;
    zIndex?: number;
  }>(),
  { width: "412px", center: true, zIndex: 100 }
);

const emits =
  defineEmits<{
    (e: "update:modelValue", value: boolean): void;
  }>();
const state = reactive({
  modalVisible: props.modelValue, // actual visible, and can be true during close animation when modelValue is false
});
const dialogRef = ref<HTMLDivElement>();
const containerClass = props.center
  ? "min-h-full flex items-center justify-center py-[54px]"
  : "min-h-full flex items-start justify-center py-10 md:pt-40";

const onContainerClick = (e: MouseEvent): void => {
  emits("update:modelValue", false);
};
const onAfterLeave = () => {
  state.modalVisible = false;
};
watch(
  () => props.modelValue,
  (visible: boolean) => {
    if (visible) {
      state.modalVisible = true;
    }
  }
);
</script>
<template>
  <Teleport to="body" v-if="state.modalVisible">
    <div class="GModal-root" v-bind="$attrs">
      <Transition
        appear
        name="custom"
        enter-active-class="duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <!-- Backdrop -->
        <div
          v-if="modelValue"
          class="fixed inset-0"
          style="background: rgba(17, 20, 28, 0.7)"
          :style="{ zIndex }"
        ></div>
      </Transition>
      <GScrollbar
        style-type="content"
        class="fixed inset-0"
        :style="{ zIndex }"
        @click="onContainerClick"
      >
        <div class="px-5" :class="containerClass">
          <Transition
            appear
            name="custom"
            enter-active-class="duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            @after-leave="onAfterLeave"
          >
            <div
              v-if="modelValue"
              ref="dialogRef"
              class="
                w-full
                relative
                transform
                rounded-lg
                bg-ebony-clay-color
                border-2 border-cloud-burst-color
                transition-all
                text-steel-color
              "
              :style="{ maxWidth: width }"
              @click.stop
            >
              <slot></slot>
              <div class="absolute top-[18px] right-3 md:top-5 md:right-5">
                <GCloseButton
                  @click="$emit('update:modelValue', false)"
                  close-label="close modal"
                />
              </div>
            </div>
          </Transition>
        </div>
      </GScrollbar>
    </div>
  </Teleport>
</template>
