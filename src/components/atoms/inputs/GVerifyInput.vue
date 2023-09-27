<script setup lang="ts">
defineProps({
  width: {
    type: String,
  },
});
const emit = defineEmits<{ (e: "update:code", value: string): void }>();

const code = ref<string[]>(new Array(6));

const inputRefs = ref([]);
let dataFromPaste: string[] | undefined = [];
const keysAllowed: string[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
const isNumber = (event: Event) => {
  (event.currentTarget as HTMLInputElement).value = "";
  const keyPressed: string = (event as KeyboardEvent).key;
  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault();
  }
};
const handleInput = async (event: Event, index: number) => {
  const inputType = (event as InputEvent).inputType;
  let currentActiveElement = event.target as HTMLInputElement;
  if (inputType === "insertText") {
    const nextInput = inputRefs.value[index + 1];
    code.value[index] = currentActiveElement.value;
    if (nextInput) {
      nextInput?.focus();
    } else {
      inputRefs.value[index]?.blur();
    }
    emit("update:code", code.value.join(""));
  }
  if (inputType === "insertFromPaste" && dataFromPaste) {
    for (const num of dataFromPaste) {
      let id: number = parseInt(currentActiveElement.id.split("_")[1]);
      code.value[id] = num;
      const nextInput = inputRefs.value[id + 1];
      if (nextInput) {
        currentActiveElement = nextInput as HTMLInputElement;
        nextInput?.focus();
      } else {
        nextInput?.blur();
      }
      emit("update:code", code.value.join(""));
    }
  }
};

const onPaste = (event: Event) => {
  dataFromPaste = (event as ClipboardEvent).clipboardData
    ?.getData("text")
    .trim()
    .split("");
  if (dataFromPaste) {
    for (const num of dataFromPaste) {
      if (!keysAllowed.includes(num)) event.preventDefault();
    }
  }
};
const onDelete = async (index: number) => {
  code.value[index] = "";
  const prevInput = inputRefs.value[index - 1];
  prevInput?.focus();
  emit("update:code", code.value.join(""));
};
</script>
<template>
  <input
    class="
      text-slate-color
      bg-secondary-gradient
      border-secondary-color
      shadow-steel-box
      rounded-lg
      focus:text-white
      text-center
      lg:text-[18px]
      border-[1px] border-solid
      focus:ring-0
      focus:outline-none
      focus:border-primary-color
    "
    :style="{ width: width, height: width }"
    v-for="(n, index) in code"
    :key="index"
    type="text"
    pattern="\d*"
    v-model="code[index]"
    :id="'input_' + index"
    maxlength="1"
    ref="inputRefs"
    @input="($event) => handleInput($event, index)"
    @keypress="isNumber"
    @keydown.delete="onDelete(index)"
    @paste="onPaste"
  />
</template>
