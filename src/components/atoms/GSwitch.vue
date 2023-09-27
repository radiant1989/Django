<template>
  <Switch
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    class="
      relative
      inline-flex
      aspect-[2/1]
      items-center
      rounded-full
      bg-dark-color
    "
    style="min-width: 24px"
  >
    <span class="sr-only">Toggle Switch</span>
    <span
      :class="
        modelValue
          ? `translate-x-full bg-primary-color`
          : 'translate-x-0 shadow-steel-box bg-steel-color'
      "
      class="inline-block w-1/2 aspect-square transform rounded-full transition"
    ></span>
  </Switch>
</template>

<script setup lang="ts">
import { Switch } from "@headlessui/vue";

defineProps<{
  modelValue: boolean;
}>();
defineEmits<{
  (e: "update:modelValue", v: boolean): void;
}>();
</script>
