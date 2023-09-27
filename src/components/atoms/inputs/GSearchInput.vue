<script setup lang="ts">
import { Ref, ref, watch, nextTick } from "vue";
import { searchIcon, chatIcon } from "~/icons";

let isFocus: Ref<boolean> = ref(false);
let value: string | number = "";
const props = defineProps({
  isSearchExtended: {
    type: Boolean,
    default: false,
  },
});

// Define emit(focusout)
const emit =
  defineEmits<{
    (e: "focusout"): void;
  }>();

const search = ref();
watch(
  () => props.isSearchExtended,
  async (newValue) => {
    if (newValue) {
      await nextTick();
      search.value.focus();
    }
  }
);

function onFocus() {
  isFocus.value = true;
}
function onFocusOut() {
  isFocus.value = false;
  emit("focusout");
}
</script>
<template>
  <div class="h-full w-full absolute left-0">
    <div
      class="p-[1px] h-full rounded-lg w-60 -translate-x-full"
      :class="[isFocus && 'bg-primary-gradient ']"
    >
      <input
        class="
          w-full
          h-full
          focus:ring-0
          focus:outline-none
          bg-dark-color
          shadow-dark-box
          rounded-lg
          text-steel-color
          focus:text-[#ffffff]
          text-[18px]
          pl-[12px]
        "
        @focus="onFocus"
        @focusout="onFocusOut"
        v-model="value"
        autofocus
        ref="search"
      />
    </div>
    <svg class="w-[25px] h-[25px]">
      <use :xlink:href="chatIcon"></use>
    </svg>
    <div
      class="absolute top-1/2 right-[12px] -translate-y-1/2 text-slate-color"
    >
      <svg class="w-[20px] h-[20px]">
        <use :xlink:href="searchIcon"></use>
      </svg>
    </div>
  </div>
</template>
