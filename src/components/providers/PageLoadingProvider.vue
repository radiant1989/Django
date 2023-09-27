<script setup lang="ts">
import { PAGE_LOADING, SITE_LOADING } from "@/constants";
import { useLoading } from "@/hooks";

const props = withDefaults(
  defineProps<{
    level?: number;
    heightWhenLoading?: string;
  }>(),
  { heightWhenLoading: "calc(100vh - 300px)", level: 1 }
);
const { addLoading, useAddLoading, ready, loadings } = useLoading({
  level: props.level,
  timeout: 1500,
});
const { onInitialRendering, addLoading: addSiteLoading } =
  inject(SITE_LOADING)!;

const styles = computed(() => {
  if (ready.value) {
    return {};
  }
  return { minHeight: props.heightWhenLoading };
});

const onPageRendering = (callback: () => void) => {
  if (!ready.value && process.client) {
    callback();
  }
};

onInitialRendering(() => {
  const remove = addSiteLoading();
  const stopWatch = watch(
    () => ready.value,
    (readyValue) => {
      if (readyValue) {
        remove();
        stopWatch();
      }
    }
  );
});

provide(PAGE_LOADING, { ready, loadings, addLoading, useAddLoading, onPageRendering });
</script>
<template>
  <div
    class="PageLoadingProvider relative"
    :class="{ 'overflow-hidden': !ready }"
  >
    <div :class="{ 'absolute inset-x-0 top-0': !ready }">
      <slot></slot>
    </div>
    <div
      class="relative flex items-center justify-center bg-[#10131C] p-7 z-10"
      :style="styles"
      v-if="!ready"
    >
      <img
        class="w-[150px] md:w-[240px]"
        src="/assets/icons/gamba-logo-ultra.gif"
      />
    </div>
  </div>
</template>
