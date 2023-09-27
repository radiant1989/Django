<script setup lang="ts">
import { PREFERENCE, AUTH } from "~/constants";
const { me } = inject(AUTH)!;
const preferences = computed(() => me.value?.preferences);
const activeCryptoCode = computed(
  () => preferences.value?.activeCryptoCode || "BTC"
);
const currency = computed(() => preferences.value?.activeFiatCode || "USD");
const orderedCryptoCodes = ref(preferences.value?.orderedCryptoCodes || []);
provide(PREFERENCE, {
  currency,
  preferences,
  activeCryptoCode,
  orderedCryptoCodes,
});
</script>
<template>
  <slot></slot>
</template>
