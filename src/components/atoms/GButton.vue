<template>
  <button
    :class="[
      'GButton group relative flex flex-col justify-center items-stretch',
      buttonClass,
    ]"
    :disabled="disabled"
  >
    <div
      class="group-active:scale-95 text-center"
      :class="{ invisible: loading }"
    >
      <slot></slot>
    </div>
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center bg-black/10"
      @click.prevent
    >
      <svg class="animate-spin h-5 w-5 text-white">
        <use :xlink:href="loadingIcon"></use>
      </svg>
    </div>
  </button>
</template>
<script setup lang="ts">
import { useButton, ButtonStyleType } from "./hooks";
import { loadingIcon } from "~/icons";
const props = withDefaults(
  defineProps<{
    styleType?: ButtonStyleType;
    block?: boolean;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  { styleType: "primary", block: true, loading: false, disabled: false }
);
// Note: pass props directly without destructing, so that this will keep reactivity
const { typeClass } = useButton(props);
const displayClass = props.block ? "block w-full" : "";
const buttonClass = computed(() => `${typeClass.value} ${displayClass}`);
</script>
