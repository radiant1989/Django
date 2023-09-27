<template>
  <GInput
    :model-value.number="localValue"
    @update:model-value="handleUpdateValue"
    @blur="handleBlur"
    type="number"
    :static="static"
  >
    <!-- forward slots -->
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </GInput>
</template>
<script setup lang="ts">
import GInput from "./GInput.vue";
const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    toFixed?: false | number;
    static?: boolean;
  }>(),
  { toFixed: false, static: false }
);
const emits =
  defineEmits<{ (e: "update:modelValue", value: string | number): void }>();

const localValue = ref<number | string>(
  props.toFixed && props.modelValue !== ""
    ? Number(props.modelValue).toFixed(props.toFixed)
    : props.modelValue
);
const handleUpdateValue = (value: string | number) => {
  emits("update:modelValue", value);
  localValue.value = props.toFixed ? value.toString() : value;
};
const handleBlur = () => {
  if (props.toFixed && localValue.value !== "") {
    localValue.value = Number(localValue.value).toFixed(props.toFixed);
  }
};
watch(
  () => props.toFixed,
  (val) => {
    localValue.value = Number(localValue.value).toFixed(props.toFixed);
  }
);
watch(
  () => props.modelValue,
  (v) => {
    if (props.toFixed) {
      if (
        Number(localValue.value).toFixed(props.toFixed) !==
        Number(v).toFixed(props.toFixed)
      ) {
        localValue.value = Number(v).toFixed(props.toFixed);
      }
    } else {
      if (localValue.value !== v) {
        localValue.value = v;
      }
    }
  }
);
</script>
