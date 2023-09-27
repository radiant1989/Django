<template>
  <div
    class="
      relative
      rounded-full
      transition
      duration-1000
      ease-in-out
      shadow-dark-box
      bg-dark-color
      cursor-pointer
    "
    :style="{ width: `${size}px`, height: `${size / 2}px` }"
    @click="onToggle"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseleave="onMouseLeave"
  >
    <div
      class="
        absolute
        top-[50%]
        rounded-full
        mx-[3px]
        transition-all
        -translate-y-1/2
        duration-300
        ease-in-out
      "
      :class="{
        'bg-primary-color': checked,
        'shadow-steel-box bg-steel-color': !checked,
      }"
      :style="[
        !checked &&
          !isMouseClicked && {
            width: `${size / 2 - 5}px`,
            height: `${size / 2 - 5}px`,
            left: '0px',
          },
        !checked &&
          isMouseClicked && {
            width: `${size * 0.7}px !important`,
            height: `${size / 2 - 5}px`,
            left: `0px`,
          },
        checked &&
          !isMouseClicked && {
            width: `${size / 2 - 5}px`,
            height: `${size / 2 - 5}px`,
            left: `${size / 2}px`,
          },
        checked &&
          isMouseClicked && {
            width: `${size * 0.7}px !important`,
            height: `${size / 2 - 5}px`,
            left: `${size * 0.6 - 5}px`,
            transform: `translate(-${size * 0.3}px, -50%)`,
          },
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      isMouseClicked: false,
      width: 0,
    };
  },
  mounted() {
    this.width = this.size;
  },
  methods: {
    onMouseDown(event) {
      this.isMouseClicked = true;
    },
    onMouseUp(event) {
      this.isMouseClicked = false;
    },
    onToggle() {
      this.checked = !this.checked;
    },
    onMouseLeave(event) {
      if (!this.isMouseClicked) return;
      else {
        this.isMouseClicked = false;
      }
    },
  },
  props: {
    size: {
      type: Number,
    },
  },
};
</script>
