<template>
  <div class="flex">
    <div class="py-2 flex flex-col gap-2 text-center w-[30%]">
      <span class="g-text-lg text-white font-bold"> 23123 </span>
      <span class="g-text-sm text-steel-color">Total Wins</span>
    </div>
    <div class="w-[32%] flex flex-col text-center py-2 gap-2 relative">
      <span class="g-text-lg text-white font-bold"> 42231 </span>
      <span class="g-text-sm text-steel-color">Total Bets</span>
      <div
        class="
          w-[2px]
          h-[calc(100%_-_10px)]
          bg-[#272A33]
          absolute
          top-1/2
          -translate-y-1/2
          left-0
        "
      ></div>
    </div>
    <div class="w-[38%] flex flex-col text-center py-2 gap-2 relative">
      <span class="g-text-lg text-white font-bold"> $10875.72 </span>
      <span class="g-text-sm text-steel-color">Total Wagered</span>
      <div
        class="
          w-[2px]
          h-[calc(100%_-_10px)]
          bg-[#272A33]
          absolute
          top-1/2
          -translate-y-1/2
          left-0
        "
      ></div>
    </div>
  </div>
</template>
