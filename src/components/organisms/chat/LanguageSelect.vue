<script setup lang="ts">
import { GPopover } from "~/components/atoms";
import GHoverDot from "~/components/atoms/dots/GHoverDot.vue";
import { arrowBelowIcon } from "~/icons";

const props =
  defineProps<{
    modelValue: number;
    options: Array<{
      id: number;
      name: string;
      slug: string;
    }>;
  }>();
const emits =
  defineEmits<{
    (e: "update:modelValue", v: number): void;
  }>();
const selectedOption = computed(() =>
  props.options.find((o) => o.id === props.modelValue)
);

const onSelect = (id: number, close: () => void) => {
  emits("update:modelValue", id);
  close();
};
</script>
<template>
  <GPopover
    :block="true"
    width="100px"
    placement="bottomLeft"
    top-deviation="-7px"
  >
    <template #trigger="{ open }">
      <button
        class="
          bg-secondary-gradient
          hover:bg-secondary-hover-gradient
          rounded-sm
          border border-secondary-color
          hover:border-secondary-hover-color
          shadow-dark-box
          px-2.5
          py-3
          min-w-[100px]
        "
        :class="open ? 'text-white' : 'text-steel-color hover:text-white'"
      >
        <div class="flex flex-row gap-1.5 items-center">
          <span class="text-sm mr-auto">{{ selectedOption?.name }}</span>
          <svg
            class="w-[9px] h-[6px] transition-transform duration-200"
            :style="{ transform: `rotateX(${open ? '180deg' : '0deg'})` }"
          >
            <use :xlink:href="arrowBelowIcon"></use>
          </svg>
        </div>
      </button>
    </template>
    <template #panel="{ open, close }">
      <div class="pt-[10px] pb-[5px]">
        <div class="flex flex-col w-full">
          <div
            v-for="item in options"
            class="
              flex flex-row
              justify-between
              cursor-pointer
              group
              z-20
              py-2
              pr-1
              pl-2.5
            "
            :class="{
              'bg-[#12151E]': item.id === modelValue,
              'hover:bg-secondary-hover-color': item.id !== modelValue,
            }"
            :key="item.id"
            v-on:click="onSelect(item.id, close)"
          >
            <div class="flex flex-row gap-[6px] items-center text-white">
              <label
                class="
                  g-text-content
                  font-semibold
                  cursor-pointer
                "
                >{{ item.name }}</label
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </GPopover>
</template>
