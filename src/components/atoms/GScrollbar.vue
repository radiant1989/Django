<script setup lang="ts">
import { ScrollStyleType } from "./hooks";

const typeClassMap = {
  primary: "primary-scrollbar",
  "primary-sm": "primary-sm-scrollbar",
  secondary: "secondary-scrollbar",
  invisible: "invisible-scrollbar",
  content: "content-scrollbar",
};

const props = withDefaults(
  defineProps<{
    height?: string;
    styleType?: ScrollStyleType;
    width?: string;
  }>(),
  {
    styleType: "primary",
  }
);
const elRef = ref<HTMLDivElement>()
const typeClass = computed(() => typeClassMap[props.styleType]);
const style = computed(() => ({
  ...(props.height ? { maxHeight: props.height } : {}),
  ...(props.width ? { maxWidth: props.width } : {}),
}));
defineExpose<{
  el: Ref<HTMLDivElement | undefined>
}>({
  el: elRef
})
</script>
<template>
  <div class="overflow-auto" :class="typeClass" :style="style" ref="elRef">
    <slot></slot>
  </div>
</template>
<style scoped>
.primary-scrollbar::-webkit-scrollbar {
  width: 2px;
  border-radius: 10px;
  background-image: theme(backgroundImage.secondary-gradient);
}
.primary-scrollbar::-webkit-scrollbar-thumb {
  width: 2px;
  border-radius: 7px;
  border: solid 1.6px theme(backgroundImage.primary-gradient);
  background: theme(backgroundImage.primary-gradient);
  box-shadow: theme(boxShadow.primary-box);
  -webkit-backdrop-filter: blur(4.6px);
  backdrop-filter: blur(4.6px);
}
.secondary-scrollbar::-webkit-scrollbar {
  width: 2px;
  border-radius: 10px;
  background-image: linear-gradient(to bottom, #343a47 0%, #2c3140 100%);
}
.secondary-scrollbar::-webkit-scrollbar-thumb {
  width: 2px;
  border-radius: 7px;
  border: solid 1.6px rgba(255, 255, 255, 0.25);
  -webkit-backdrop-filter: blur(4.6px);
  backdrop-filter: blur(4.6px);
}
.invisible-scrollbar::-webkit-scrollbar {
  width: 0px;
  background-color: transparent;
}
.content-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border-radius: 10px;
  background-color: #12151d;
}
.content-scrollbar::-webkit-scrollbar-thumb {
  width: 6px;
  height: 6px;
  border-radius: 7px;
  background: #303644;
  box-shadow: 0px 6.1792px 18.5376px rgba(48, 54, 68, 0.27);
  backdrop-filter: blur(2.3172px);
}
.primary-sm-scrollbar::-webkit-scrollbar {
  width: 4px;
  height: 6px;
  border-radius: 10px;
  background-image: theme(backgroundImage.secondary-gradient);
}
.primary-sm-scrollbar::-webkit-scrollbar-thumb {
  width: 4px;
  border-radius: 7px;
  border: solid 1.6px theme(backgroundImage.primary-gradient);
  background: theme(backgroundImage.primary-gradient);
  box-shadow: theme(boxShadow.primary-box);
  -webkit-backdrop-filter: blur(4.6px);
  backdrop-filter: blur(4.6px);
}
.primary-sm-scrollbar::-webkit-scrollbar-track {
  width: 2px;
  background: #1c202c;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}
</style>
