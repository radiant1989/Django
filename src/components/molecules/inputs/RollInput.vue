<template>
  <div
    class="cursor-pointer disable-focus focus:ring-transparent"
    @click="switchRoll"
  >
    <GInputNumber
      :model-value="modelValue"
      readonly
      :static="static"
      style-type="dark"
      min="0.01"
      max="98"
      class="cursor-pointer"
    >
      <template #suffix>
        <div class="pr-2.5 h-full">
          <GTooltip
            placement="top"
            :arrow="screen.md ? true : false"
            :border="true"
            class="h-full"
          >
            <template #trigger>
              <div class="flex h-full items-center">
                <GButton style-type="transparent">
                  <svg
                    class="
                      w-[14px]
                      h-[14px]
                      md:w-4
                      md:h-4
                      text-steel-color
                      hover:text-white
                    "
                  >
                    <use :xlink:href="rollIcon"></use>
                  </svg>
                </GButton>
              </div>
            </template>
            <template #panel>
              <div
                class="
                  text-white text-xs
                  md:text-sm
                  hidden
                  md:flex
                  whitespace-nowrap
                  font-semibold
                "
              >
                Flip
              </div>
            </template>
          </GTooltip>
        </div>
      </template>
    </GInputNumber>
  </div>
</template>
<script setup lang="ts">
import { GInputNumber, GButton, GTooltip } from "~/components/atoms";
import { rollIcon } from "~/icons/index";
import { THEME } from "~/constants";
const props = withDefaults(
  defineProps<{
    modelValue: number | "";
    static?: boolean;
  }>(),
  {
    static: false,
  }
);
const emits = defineEmits<{ (e: "update:modelValue", value: number): void }>();

const { screen } = inject(THEME)!;
const switchRoll = () => {
  if (props.static) return;
  const value = (100 - Number(props.modelValue)).toFixed(2);
  emits("update:modelValue", Number(value));
};
</script>
<style scoped>
.disable-focus:focus-within div .disable-focus div:focus {
  outline: none;
}
</style>
