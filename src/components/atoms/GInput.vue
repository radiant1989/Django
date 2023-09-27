<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { useInput, type InputStyleType, type InputStatus } from './hooks';

type InputProps = {
  type?: "text" | "number" | "password" | "email";
  modelValue?: string | number;
  static?: boolean;
  placeholder?: string;
  styleType?: InputStyleType;
  status?: InputStatus;
  autolostFocus?: number;

};

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  modelValue: "",
  static: false,
  placeholder: "",
  styleType: "dark",
  status: "normal",
  autolostFocus:0,
});
const borderClassMap = {
  dark: {
    normal: "rounded-lg border-2 border-transparent peer-focus:border-[#3CD3AF]",
    error: "rounded-lg border-2 border-error",
    warning: "", // NOTE: fill when needed
  },
  "dark-sm": {
    normal: "rounded-lg border border-transparent peer-focus:border-primary-color",
    error: "",
    warning: "",
  },
  secondary: {
    normal: "",
    error: "",
    warning: "",
  },
};
const { typeClass, statusClass } = useInput(props);
const borderClass = computed(() => borderClassMap[props.styleType][props.status]);

const emits =
  defineEmits<{
    (e: "update:modelValue", value: string | number): void;
    (e: "focus"): void;
    (e: "blur"): void;
  }>();
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;
    const inputRef = ref<HTMLElement | null>(null);
const handleInputChange = (e: Event) => {
  emits("update:modelValue", (e.target as HTMLInputElement).value);
  if (props.autolostFocus > 0){
    clearTimeout(timer);
    timer = setTimeout(() => {
      inputRef.value?.blur();
    }, props.autolostFocus)
  }
};
const preventSpecialCharacters = (event: any) => {
  const disallowedKeys = ["e", "-", "+", "."];
  if (props.type === "number") {
    if (disallowedKeys.includes(event.key))
      event.preventDefault();
    }
}
</script>
<template>
  <div
    :class="[
      'GInput relative',
      typeClass,
      statusClass,
      static && 'bg-secondary-gradient shadow-dark-box',
    ]"
  >
    <div class="flex min-h-full">
      <div v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </div>
      <div
        :class="[
          'flex-1 py-2 md:py-2.5 flex items-center',
          !$slots.prefix && 'pl-[15px]',
          !$slots.suffix && 'pr-[15px]',
        ]"
      >
        <input
          :type="type"
          :value="modelValue"
          v-bind="$attrs"
          @input="handleInputChange"
          @keydown="preventSpecialCharacters"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
          :placeholder="placeholder"
          :disabled="static"
          :class="[
            'peer block w-full g-text-base font-semibold outline-0 bg-transparent focus:outline-none',
            static ? 'cursor-not-allowed text-danger-color' : 'text-white',
          ]"
          ref="inputRef"
        />
        <div
          :class="['inset-0 absolute pointer-events-none', borderClass]"
        ></div>
      </div>
      <div v-if="$slots.suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* hide arrow icon */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* hide arrow icon on Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
