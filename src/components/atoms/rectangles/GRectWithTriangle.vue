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
    width="28"
    height="13"
    class="-mb-[2px] z-[3]"
    viewBox="0 0 28 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1_760)">
      <mask id="path-1-inside-1_1_760" fill="white">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M27.8308 11C27.0541 11 26.3077 10.6988 25.7486 10.1597L16.0822 0.840278C14.9201 -0.280093 13.0799 -0.280092 11.9178 0.840278L2.25142 10.1597C1.69229 10.6988 0.945882 11 0.169209 11H-4.5C-9.19442 11 -13 14.8056 -13 19.5C-13 24.1944 -9.19442 28 -4.5 28H33.5C38.1944 28 42 24.1944 42 19.5C42 14.8056 38.1944 11 33.5 11H27.8308Z"
        />
      </mask>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.8308 11C27.0541 11 26.3077 10.6988 25.7486 10.1597L16.0822 0.840278C14.9201 -0.280093 13.0799 -0.280092 11.9178 0.840278L2.25142 10.1597C1.69229 10.6988 0.945882 11 0.169209 11H-4.5C-9.19442 11 -13 14.8056 -13 19.5C-13 24.1944 -9.19442 28 -4.5 28H33.5C38.1944 28 42 24.1944 42 19.5C42 14.8056 38.1944 11 33.5 11H27.8308Z"
        fill="url(#paint0_linear_1_760)"
      />
      <path
        d="M25.7486 10.1597L27.2314 8.62166L25.7486 10.1597ZM16.0822 0.840277L14.5994 2.37834L16.0822 0.840277ZM14.5994 2.37834L24.2657 11.6978L27.2314 8.62166L17.5651 -0.697783L14.5994 2.37834ZM3.73428 11.6978L13.4006 2.37834L10.4349 -0.697783L0.768559 8.62166L3.73428 11.6978ZM0.169209 8.86353H-4.5V13.1365H0.169209V8.86353ZM-4.5 8.86353C-10.3744 8.86353 -15.1365 13.6256 -15.1365 19.5H-10.8635C-10.8635 15.9855 -8.01448 13.1365 -4.5 13.1365V8.86353ZM-15.1365 19.5C-15.1365 25.3744 -10.3744 30.1365 -4.5 30.1365V25.8635C-8.01448 25.8635 -10.8635 23.0145 -10.8635 19.5H-15.1365ZM-4.5 30.1365H33.5V25.8635H-4.5V30.1365ZM33.5 30.1365C39.3744 30.1365 44.1365 25.3744 44.1365 19.5H39.8635C39.8635 23.0145 37.0145 25.8635 33.5 25.8635V30.1365ZM44.1365 19.5C44.1365 13.6256 39.3744 8.86353 33.5 8.86353V13.1365C37.0145 13.1365 39.8635 15.9855 39.8635 19.5H44.1365ZM33.5 8.86353H27.8308V13.1365H33.5V8.86353ZM0.768559 8.62166C0.607617 8.77683 0.39277 8.86353 0.169209 8.86353V13.1365C1.499 13.1365 2.77696 12.6207 3.73428 11.6978L0.768559 8.62166ZM24.2657 11.6978C25.223 12.6207 26.501 13.1365 27.8308 13.1365V8.86353C27.6072 8.86353 27.3924 8.77683 27.2314 8.62166L24.2657 11.6978ZM17.5651 -0.697783C15.5754 -2.61603 12.4246 -2.61603 10.4349 -0.697783L13.4006 2.37834C13.7351 2.05585 14.2649 2.05585 14.5994 2.37834L17.5651 -0.697783Z"
        :fill="ribbonBorderColor"
        mask="url(#path-1-inside-1_1_760)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_1_760"
        x1="81.1829"
        y1="-0.00376707"
        x2="81.1829"
        y2="357.777"
        gradientUnits="userSpaceOnUse"
      >
        <stop :stop-color="rectBackgroundColor" />
        <stop offset="1" :stop-color="rectBackgroundColor" />
      </linearGradient>
      <clipPath id="clip0_1_760">
        <rect width="28" height="13" fill="white" />
      </clipPath>
    </defs>
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
