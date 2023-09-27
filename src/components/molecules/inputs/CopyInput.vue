<template>
  <GInput
    :model-value="modelValue"
    style-type="dark"
    placeholder=""
    :static="true"
  >
    <template #suffix>
      <GTooltip
        position="absolute"
        placement="top"
        :trigger="visible"
        :arrow="screen.md && true"
      >
        <template #trigger>
          <button
            class="
              text-steel-color
              bg-secondary-gradient
              border-2 border-secondary-color
              h-10
              md:h-[45px]
              px-3
              hover:text-white
              hover:bg-secondary-hover-gradient
              hover:border-secondary-hover-color
              rounded-lg
              active:scale-95
              group
            "
            @click="copyToClipBoard"
          >
            <svg
              class="
                w-[14px]
                h-[14px]
                md:w-4
                md:h-4
                text-steel-color
                group-hover:text-white
              "
            >
              <use :xlink:href="copyIcon"></use>
            </svg>
          </button>
        </template>
        <template #panel>
          <div class="text-white text-base">Copied</div>
        </template>
      </GTooltip>
    </template>
  </GInput>
</template>
<script setup lang="ts">
import { THEME } from "~/constants";
import { GInput, GButton, GTooltip } from "~/components/atoms";
import { copyIcon } from "~/icons/index";
const props =
  defineProps<{
    modelValue: string | number;
  }>();
defineEmits<{ (e: "update:modelValue", value: string | number): void }>();
const visible = ref<boolean>(false);
const { screen } = inject(THEME)!;
let timer: ReturnType<typeof setTimeout> | undefined = undefined;
const copyToClipBoard = () => {
  navigator.clipboard.writeText(props.modelValue.toString());
  visible.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => {
    visible.value = false;
  }, 1000);
};
</script>
