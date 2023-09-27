<script setup lang="ts">
defineProps({
  customClass: {
    type: String,
    default: "",
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
  dist: {
    type: Number,
    default: 2,
  },
});
const emit =
  defineEmits<{
    (e: "toggle-dropdown"): void;
  }>();
const onDropdownClick = () => {
  emit("toggle-dropdown");
};
</script>
<template>
  <button
    id="dropdown"
    class="
      text-left text-steel-color
      w-full
      h-full
      hover:text-[#FFFFFF]
      flex flex-row
      items-center
      justify-between
    "
    :class="[{ active: isOpened }, customClass !== '' && customClass]"
    type="button"
    v-on:click="onDropdownClick"
  >
    <slot name="dropdown"></slot>
    <Transition animation="ease">
      <span
        class="arrow"
        :style="{
          marginLeft: `${dist}px`,
        }"
      ></span>
    </Transition>
  </button>
  <slot name="dropdown-content"></slot>
</template>
<style scoped>
.arrow::before,
.arrow::after {
  position: relative;
  content: "";
  display: block;
  width: 8px;
  background-color: theme(colors.steel-color);
  height: 3px;
  transition: 0.3s ease-in-out;
}
.arrow::before {
  transform: rotate(45deg);
}
.arrow::after {
  left: 3.5px;
  top: -2.8px;
  transform: rotate(-45deg);
}
#dropdown.active .arrow::before {
  transform: rotate(-45deg);
}

#dropdown.active .arrow::after {
  transform: rotate(45deg);
}
</style>
