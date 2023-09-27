<script setup lang="ts"></script>
<template>
  <div
    class="
      h-full
      bg-secondary-gradient
      border-secondary-color border-[1px]
      flex flex-row
      rounded-[7px]
      text-[10px]
      font-proximanova
      leading-[12px]
      items-center
      justify-center
    "
  >
    <button
      class="
        text-steel-color
        pr-[8px]
        pl-[14px]
        h-full
        py-[5px]
        scale-100
        hover:text-[#fff]
        active:scale-95
      "
    >
      /2
    </button>
    <span class="w-[1px] h-[25px] bg-midnight-express-color" />
    <button
      class="text-steel-color px-[8px] h-full hover:text-[#fff] active:scale-95"
    >
      x2
    </button>
    <span class="w-[1px] h-[25px] bg-midnight-express-color" />

    <button
      class="
        text-steel-color
        pl-[8px]
        h-full
        hover:text-[#fff]
        pr-[14px]
        active:scale-95
      "
    >
      Max
    </button>
  </div>
</template>
