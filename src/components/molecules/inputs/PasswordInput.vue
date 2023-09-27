<script setup lang="ts">
import { ref } from "vue";
import { eyeOffIcon, eyeOnIcon } from "~/icons";
import { GInput, GButton } from "@/components/atoms";

defineProps<{
  modelValue?: string;
}>();
defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const passwordVisible = ref<boolean>(false);
</script>
<template>
  <GInput
    :type="passwordVisible ? 'text' : 'password'"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #suffix>
      <div class="flex h-full items-center pr-[15px]">
        <GButton
          style-type="transparent"
          :block="false"
          type="button"
          @click="passwordVisible = !passwordVisible"
        >
          <svg class="w-[18px] h-[18px] icon" v-if="!passwordVisible">
            <use :xlink:href="eyeOffIcon"></use>
          </svg>
          <svg class="w-[18px] h-[18px] icon" v-else>
            <use :xlink:href="eyeOnIcon"></use>
          </svg>
        </GButton>
      </div>
    </template>
  </GInput>
</template>
