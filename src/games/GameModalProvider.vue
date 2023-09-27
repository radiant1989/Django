<script setup lang="ts">
import { GModal } from "~/components/atoms";
import { THEME } from "~/constants";
import BetDetailsModal from "~/components/molecules/modals/games/BetDetailsModal.vue";
import FairnessModal from "~/components/molecules/modals/games/FairnessModal.vue";
import HotkeyModal from "~/components/molecules/modals/games/HotkeyModal.vue";
import BetTransactionsModal from "~/components/molecules/modals/games/BetTransactionsModal.vue";
const { screen } = inject(THEME)!;
const modalType = computed(() => route.query.modal);
const route = useRoute();
const router = useRouter();
const modalVisible = computed(
  () =>
    route.query.modal === "fairness" ||
    route.query.modal === "bet" ||
    route.query.modal === "hotkey" ||
    route.query.modal === "transactions"
);
const oldQuery = ref<object | null>(null);
watch(
  () => route.query,
  (newVal, oldVal) => {
    oldQuery.value = oldVal;
  }
);
const isBackModal = ref<boolean>(false);
watch(
  () => route.query.modal,
  (newVal, oldVal) => {
    // if (newVal === "fairness" && oldVal === "bet") isBackModal.value = true;
    // else isBackModal.value = false;
  }
);
const onCloseModal = () => {
  if (oldQuery && isBackModal.value) {
    router.push({
      path: router.currentRoute.value.path,
      query: oldQuery.value,
    });
  } else
    router.push({
      path: router.currentRoute.value.path,
    });
};
const modalWidth = computed(() => {
  if (modalType.value === "transactions") {
    if (screen.value.md) return "648px";
    else return "461px";
  } else if (modalType.value === "bet") {
    if (screen.value.md) return "550px";
    return "461px";
  } else if (modalType.value === "fairness") return "461px";
  return "412px";
});
</script>
<template>
  <slot></slot>
  <GModal
    :model-value="modalVisible"
    @update:model-value="onCloseModal"
    :width="modalWidth"
  >
    <div v-if="modalType === 'fairness'">
      <FairnessModal />
    </div>

    <div v-else-if="modalType === 'bet'">
      <BetDetailsModal />
    </div>
    <div v-else-if="modalType === 'hotkey'">
      <HotkeyModal />
    </div>
    <div v-else-if="modalType === 'transactions'">
      <BetTransactionsModal />
    </div>
    <div v-else>
      <div>...else</div>
    </div>
  </GModal>
</template>
