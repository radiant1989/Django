<script setup lang="ts">
import { PAGE_LOADING, SUB_PAGE_LOADING } from "@/constants";
import { useLoading } from "@/hooks";

const props = withDefaults(
  defineProps<{
    level?: number;
    heightWhenLoading?: string;
  }>(),
  { heightWhenLoading: "400px", level: 2 }
);
const { loadings, addLoading, useAddLoading, ready } = useLoading({
  level: props.level,
  timeout: 1200,
});
const { onPageRendering, addLoading: addPageLoading } = inject(PAGE_LOADING)!;
const styles = computed(() => {
  if (ready.value) {
    return {};
  }
  return { minHeight: props.heightWhenLoading };
});

onPageRendering(() => {
  const remove = addPageLoading();
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

provide(SUB_PAGE_LOADING, { ready, loadings, addLoading, useAddLoading });
</script>
<template>
  <div
    class="SubPageLoadingProvider relative"
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
