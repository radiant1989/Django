<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { SITE_LOADING } from "@/constants";

const initialRendering = ref(true);
const mounted = ref(false);
const loadings = ref<string[]>([]);

const ready = computed<boolean>(
  () =>
    !initialRendering.value || (mounted.value && loadings.value.length === 0)
);
const onInitialRendering = (callback: () => void) => {
  if (initialRendering.value && process.client) {
    callback();
  }
};
const addLoading = (maxTimeout = 3000) => {
  const loadingID = uuid();
  loadings.value = [...loadings.value, loadingID];
  const removeLoading = () => {
    loadings.value = loadings.value.filter((l) => l !== loadingID);
  };
  // remove loading after max timeout
  setTimeout(() => {
    removeLoading();
  }, maxTimeout);

  return removeLoading;
};
const useAddLoading = (maxTimeout = 3000) => {
  const loadingID = uuid();

  const add = () => {
    loadings.value = [...loadings.value, loadingID];
    // remove loading after max timeout
    setTimeout(() => {
      remove();
    }, maxTimeout);
  };
  const remove = () => {
    loadings.value = loadings.value.filter((l) => l !== loadingID);
  };

  return {
    add,
    remove,
  };
};
watch(
  () => ready.value,
  (r) => {
    if (r) {
      initialRendering.value = false;
    }
  }
);

provide(SITE_LOADING, {
  addLoading,
  useAddLoading,
  mounted,
  ready,
  loadings,
  initialRendering,
  onInitialRendering,
});

onMounted(() => {
  // wait until children are mounted
  nextTick(() => {
    // make sure loading will be visible at least 1s
    setTimeout(() => {
      mounted.value = true;
    }, 1000);
  });
});
</script>
<template>
  <div class="LoadingProvider">
    <slot></slot>
    <div
      class="
        z-[1000]
        fixed
        inset-0
        flex
        items-center
        justify-center
        bg-[#10131C]
        p-7
      "
      v-if="!ready"
    >
      <img
        class="w-[200px] md:w-[320px]"
        src="/assets/icons/gamba-logo-ultra.gif"
      />
    </div>
  </div>
</template>
