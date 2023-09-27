<template>
  <div
    class="flex"
    :class="{
      'flex-row gap-[25px]': direction === 'row',
      'flex-col gap-1': direction === 'col',
    }"
  >
    <div
      class="flex flex-row justify-start items-center cursor-pointer"
      v-for="(item, index) in dataList"
      :key="index"
      v-on:click="onSelect(index)"
    >
      <div
        class="rounded-full flex items-center justify-center"
        :class="{
          'bg-primary-gradient  shadow-radio-box border-primary-color':
            selectedItem === item,
          'border-[1.6px] border-secondary-color bg-dark-color shadow-dark-box':
            selectedItem !== item,
        }"
        :style="[
          {
            width: `${size}px`,
            height: `${size}px`,
          },
          selectedItem === item && { borderWidth: `${size / 10}px` },
        ]"
      ></div>
      <p class="ml-[10px] text-[#fff] font-proximanova" :class="labelClass">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: "",
    };
  },
  methods: {
    onSelect(index) {
      this.selectedItem = this.dataList[index];
    },
  },
  props: {
    dataList: {
      type: Array,
    },
    direction: {
      type: String,
    },
    size: {
      type: Number,
    },
    labelClass: {
      type: String,
      default: "",
    },
  },
};
</script>
