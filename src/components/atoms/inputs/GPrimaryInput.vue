<script setup lang="ts">
import { ref } from "vue";
import GButton from "~/components/atoms/GButton.vue";
import { eyeOffIcon, eyeOnIcon } from "~/icons";

export type InputProps = {
  inputType?: string;
  id?: string;
  autoFocus?: boolean;
  placeholder?: string;
  customClass?: string;
  modelValue?: string | number;
  readOnly?: boolean;
};
const props = withDefaults(defineProps<InputProps>(), {
  inputType: "text",
  autoFocus: false,
  placeholder: "",
  customClass: " rounded-lg",
  readOnly: false,
});
const _inputType = ref<string>(props.inputType);
const emit =
  defineEmits<{
    (e: "update:modelValue", value: string | number): void;
  }>();
const onToggleVisibility = () => {
  _inputType.value = _inputType.value === "password" ? "text" : "password";
};
const handleInputChange = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>
<template>
  <div class="h-full w-full relative">
    <input
      class="
        w-full
        h-full
        focus:ring-0
        focus:outline-none
        bg-dark-color
        shadow-dark-box
        text-steel-color
        focus:text-[#ffffff]
        pl-[12px]
        py-3
      "
      :id="id"
      :type="_inputType"
      :placeholder="placeholder"
      :readonly="readOnly"
      :value="modelValue"
      :class="customClass !== '' && customClass"
      @input="handleInputChange($event)"
    />
    <GButton
      style-type="transparent"
      :block="false"
      @click="onToggleVisibility"
      v-if="inputType === 'password'"
    >
      <svg class="w-[18px] h-[18px] icon" v-if="_inputType === 'password'">
        <use :xlink:href="eyeOffIcon"></use>
      </svg>
      <svg class="w-[18px] h-[18px] icon" v-else>
        <use :xlink:href="eyeOnIcon"></use>
      </svg>
    </GButton>
  </div>
</template>
<style scoped>
.GButton {
  color: #858da0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
}
.GButton:hover {
  color: #fff;
}
</style>
