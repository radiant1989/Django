<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    size: string;
    id: string;
  }>(),
  { modelValue: false, size: "16px", id: "defaultId" }
);
const emit =
  defineEmits<{
    (e: "update:modelValue", value: boolean): void;
  }>();
const onChange = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).checked);
};
</script>
<template>
  <input
    class="input-checkbox-label"
    :id="props.id"
    type="checkbox"
    style="display: none"
    @input="onChange($event)"
  />
  <label
    class="
      checkbox-label
      flex
      justify-start
      items-start
      select-none
      cursor-pointer
      hover:border-primary-color
    "
    :for="props.id"
  >
    <div class="flex items-start">
      <span
        class="
          relative
          rounded-[3px]
          border border-solid border-[white] border-opacity-25
          transition-all
          duration-200
          ease-in-out
          before:bg-primary-color
        "
        :class="{
          'border-primary-color bg-primary-gradient': props.modelValue,
        }"
        :style="{
          width: `${props.size}`,
          height: `${props.size}`,
        }"
      >
        <svg class="svg absolute top-[15%] right-[10%]" viewBox="0 0 135 110">
          <path
            :class="[props.modelValue ? 'check' : 'stroke-0 fill-none']"
            d="M126.8,14L55.7,85.1L29.2,63.4"
          />
        </svg>
      </span>
    </div>
    <slot></slot>
  </label>
</template>
<style scoped>
.input-checkbox-label:checked + .checkbox-label span:first-child {
  animation: check 0.6s ease;
}
.svg .check {
  stroke: white;
  fill: none;
  stroke-width: 12;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: checkSign 0.4s linear forwards;
}

@keyframes check {
  50% {
    transform: scale(1.2);
  }
}
@keyframes draw {
  0% {
    stroke-dashoffset: -400;
  }
  100% {
    stroke-dashoffset: 400;
  }
}
@keyframes checkSign {
  0% {
    stroke-dashoffset: -400;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
