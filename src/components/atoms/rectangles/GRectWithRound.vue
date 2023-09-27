<script setup lang="ts">
defineProps({
  width: {
    type: Number,
  },
  ribbonBorderColor: {
    type: String,
  },
  rectBorder: {
    type: String,
  },
  rectBackgroundColor: {
    type: String,
  },
});
</script>
<template>
  <!--Dropdown ribbon-->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="46px"
    height="12px"
    viewBox="0 0 46 12"
    version="1.1"
    class="-mb-[2px] z-[3]"
  >
    <g id="surface1">
      <path
        style="
           {
            stroke: none;
            fill-rule: nonzero;
            fill: rgb(18.039216%, 19.215686%, 23.921569%);
            fill-opacity: 1;
          }
        "
        d="M 8.125 12.019531 C 8.992188 11.378906 9.796875 10.65625 10.523438 9.855469 L 10.566406 9.808594 C 13.878906 6.179688 15.863281 4.007812 19.863281 3.105469 C 21.925781 2.644531 24.066406 2.644531 26.132812 3.105469 C 30.132812 4.003906 32.117188 6.175781 35.421875 9.804688 L 35.46875 9.855469 C 36.195312 10.652344 37 11.378906 37.871094 12.015625 L 45.988281 12.015625 L 45.988281 11.742188 C 45.796875 11.742188 41.199219 12.179688 37.425781 8.039062 L 37.378906 7.992188 C 33.085938 3.28125 30.488281 0.429688 23.019531 0 L 22.972656 0 L 22.671875 0.0195312 C 20.308594 0.109375 17.980469 0.679688 15.835938 1.691406 C 11.808594 3.597656 9.863281 6.476562 8.609375 7.992188 L 8.566406 8.042969 C 4.792969 12.183594 0.195312 11.746094 0 11.746094 L 0 12.019531 Z M 8.125 12.019531 "
      />
      <path
        style="
          stroke: none;
          fill-rule: nonzero;
          fill: rgb(12.941176%, 14.117647%, 18.823529%);
          fill-opacity: 1;
        "
        d="M 35.464844 9.855469 L 35.417969 9.808594 C 32.113281 6.179688 30.128906 4.007812 26.128906 3.105469 C 24.0625 2.644531 21.921875 2.644531 19.859375 3.105469 C 15.855469 4.003906 13.875 6.175781 10.566406 9.804688 L 10.523438 9.855469 C 9.796875 10.65625 8.992188 11.378906 8.121094 12.015625 L 37.867188 12.015625 C 36.996094 11.378906 36.191406 10.65625 35.464844 9.855469 Z M 35.464844 9.855469 "
      />
    </g>
  </svg>
  <div
    class="Border p-[2px] rounded-lg shadow-dropdown-box"
    :style="{
      '--rect-border': `${rectBorder}`,
    }"
  >
    <div
      class="Container flex flex-col rounded-lg relative"
      :style="{ '--rect-background': rectBackgroundColor, width: `${width}px` }"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style scoped>
.Border {
  background: var(--rect-border);
}
.Container {
  background: var(--rect-background);
}
</style>
