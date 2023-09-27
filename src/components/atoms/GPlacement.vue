<script setup lang="ts">
import { usePlacement, type PlacementProps } from "./placement";
import { useDelayFalse } from '@/hooks';

const props = withDefaults(defineProps<PlacementProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  arrow: false,
  border: false,
  gap: 'default',
  modelValue: false,
  leftDeviation: '0',
  topDeviation: '0',
  zIndex: 300,
});

const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void
}>()

const triggerRef = ref<HTMLDivElement | null>(null);
const popupRef = ref<HTMLDivElement | null>(null);
const popupContentRef = ref<HTMLDivElement | null>(null);
const state = reactive({
  visible: false,
  style: {},
  arrowStyle: {},
});

const { style, arrowStyle, arrowClass } = usePlacement(triggerRef, popupContentRef, computed(() => ({
  placement: props.placement,
  gap: props.gap === 'default' ? (props.arrow ? '16px' : '12px') : props.gap,
  enabled: state.visible,
})));

// when mouse moves into popup, popup UI should be persist as visible
const uiVisible = useDelayFalse(computed(() => state.visible));

const onMouseenter = () => {
  if (props.trigger !== 'hover') return;
  if (uiVisible.value) return;

  mountPopup();
};
const onMouseleave = (e: MouseEvent) => {
  if (props.trigger !== 'hover') return;
  if (popupRef.value?.contains(e.toElement) || triggerRef.value?.contains(e.toElement)) {
    return;
  }
  unmountPopup();
};
const onClick = () => {
  if (props.trigger !== 'click') return;
  state.visible ? unmountPopup() : mountPopup();
}
watch(() => props.trigger, (newValue)=> {
  newValue?mountPopup():unmountPopup();
} )
const onWinClick = (e: MouseEvent) => {
  if (popupRef.value && !popupRef.value.contains(e.target as HTMLElement) && !triggerRef.value!.contains(e.target as HTMLElement)) {
      unmountPopup();
    }
}
// this will be called at only browser, so we disable it on SSR
const mountPopup = () => {
  state.visible = true;
  emits("update:modelValue", true);
  // consider stopPropagation
  props.trigger === 'click' && document.addEventListener('click', onWinClick, true);
}
const unmountPopup = () => {
  emits("update:modelValue", false);
  state.visible = false;
  props.trigger === 'click' && document.removeEventListener('click', onWinClick, true);
}

watch(() => props.modelValue, modelValue => {
  if(modelValue !== state.visible) {
    state.visible = modelValue;
  }
});
onMounted(() => {
  if(props.modelValue) {
    mountPopup();
  }
})
onBeforeUnmount(() => {
  unmountPopup();
})
</script>
<template>
  <div
    ref="triggerRef"
    class="GPlacement"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @click="onClick"
  >
    <slot name="trigger" :open="uiVisible"></slot>
    <Teleport to="body" v-if="uiVisible">
      <div
        class="
          GPlacement--root
          absolute
          top-0
          left-0
          right-0
          bottom-0
          md:overflow-hidden
          pointer-events-none
        "
        :style="{ zIndex }"
      >
        <Transition
          :enter-active-class="transition?.['enter-active-class']"
          :enter-from-class="transition?.['enter-from-class']"
          :enter-to-class="transition?.['enter-to-class']"
          :leave-active-class="transition?.['leave-active-class']"
          :leave-from-class="transition?.['leave-from-class']"
          :leave-to-class="transition?.['leave-to-class']"
          appear
        >
          <div
            @mouseenter="onMouseenter"
            @mouseleave="onMouseleave"
            ref="popupRef"
            class="pointer-events-auto"
          >
            <div class="absolute" v-if="arrow && border" :style="arrowStyle">
              <div :class="arrowClass">
                <slot name="arrow" :before="true" :after="false">
                  <div
                    class="
                      rotate-45
                      w-5
                      h-5
                      rounded-[4px]
                      bg-ebony-clay-color
                      border-2 border-ash
                      shadow-popover
                    "
                  ></div>
                </slot>
              </div>
            </div>
            <div ref="popupContentRef" class="absolute" :style="style">
              <div
                class="relative"
                :style="{ top: topDeviation, left: leftDeviation }"
              >
                <slot
                  name="content"
                  :open="uiVisible"
                  :close="unmountPopup"
                ></slot>
              </div>
            </div>
            <div class="absolute" v-if="arrow" :style="arrowStyle">
              <div :class="arrowClass">
                <slot name="arrow" :before="false" :after="true">
                  <div
                    class="
                      rotate-45
                      w-5
                      h-5
                      rounded-[4px]
                      bg-ebony-clay-color bg-clip-padding
                      border-2 border-transparent
                    "
                  ></div>
                </slot>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Teleport>
  </div>
</template>
