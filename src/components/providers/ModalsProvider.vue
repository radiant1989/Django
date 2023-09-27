<script setup lang="ts">
import { GModal } from "@/components/atoms";
import MiniProfile from "@/components/organisms/user/MiniProfile.vue";
const router = useRouter();
const route = useRoute();
const modal = computed(() => route.query.modal);
const onModalVisibleChange = (show: boolean) => {
  if (!show) {
    const queryWithoutModal = { ...route.query };

    delete queryWithoutModal.modal;
    delete queryWithoutModal.name;

    router.push({
      ...route,
      query: queryWithoutModal,
    });
  }
};
</script>
<template>
  <slot></slot>
  <GModal
    :model-value="modal === 'user'"
    @update:model-value="onModalVisibleChange"
  >
    <div class="py-5 px-4">
      <MiniProfile :username="route.query.name" />
    </div>
  </GModal>
</template>
