<script setup lang="ts">
import { maxValue, required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { GInputNumber, GTooltip } from "~/components/atoms";
import { multiplierIcon } from "~/icons/index";
import { useGameSettingStore } from "@/store/games/settings";
import { THEME } from "~/constants";
const props = withDefaults(
  defineProps<{
    modelValue: number | "";
    static?: boolean;
    min?: number;
    max?: number;
  }>(),
  {
    static: false,
    min: 0,
    max: 0,
  }
);
const { screen } = inject(THEME)!;
const emits =
  defineEmits<{
    (e: "update:modelValue", value: string | number): void;
    (e: "invalidMultiplier"): void;
  }>();
const store = useGameSettingStore();
const isSelfChange = ref<boolean>(false);
const handleUpdateValue = async (value: string | number) => {
  localValue.value = Number(value);
  isSelfChange.value = true;
  await v$.value.localValue.$validate();
  isPlayeable();
  emits("update:modelValue", value);
};
const localValue = ref<number>(Number(props.modelValue));
const rules = computed(() => {
  return {
    localValue: {
      required,
      minValue: minValue(props.min),
      maxValue: maxValue(props.max),
    },
  };
});
const v$ = useVuelidate(rules, { localValue });
const isConstraint = computed(() => {
  if (props.max === 0 && props.min === 0) return false;
  return true;
});
const otherChanged = ref<boolean>(false);
const isPlayeable = () => {
  if (v$.value.localValue.$error) {
    store.setGamePlayeable({ multiplier: false });
  } else store.setGamePlayeable({ multiplier: true });
};
watch(
  () => props.modelValue,
  async (val) => {
    if (!isSelfChange.value) {
      localValue.value = Number(val);
      otherChanged.value = true;
    } else otherChanged.value = false;
    isSelfChange.value = false;
    await v$.value.localValue.$validate();
    isPlayeable();
  }
);
const blured = ref<boolean>(true);
const handleBlur = () => {
  blured.value = true;
  mouseEnterShow.value = false;
  if (localValue.value || localValue.value === 0) {
    if (v$.value.localValue.minValue.$invalid) {
      localValue.value = Number(props.min);
    } else if (v$.value.localValue.maxValue.$invalid) {
      localValue.value = Number(props.max);
    }
    emits("update:modelValue", localValue.value);
  }
};
const handleFocus = () => {
  blured.value = false;
  mouseEnterShow.value = true;
};
const mouseEnterShow = ref<boolean>(false);
const handleMouseEnter = () => {
  if (blured.value) mouseEnterShow.value = true;
};
const handleMouseLeave = () => {
  if (blured.value) mouseEnterShow.value = false;
};
</script>
<template>
  <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <GTooltip
      :arrow="screen.md ? true : false"
      :trigger="
        v$.localValue.$error && isConstraint && (!blured || mouseEnterShow)
      "
    >
      <template #trigger>
        <GInputNumber
          :model-value="localValue"
          @update:model-value="handleUpdateValue"
          :to-fixed="4"
          type="number"
          style-type="dark"
          :static="static"
          :status="
            v$.localValue.$error && isConstraint && blured ? 'error' : 'normal'
          "
          @blur="handleBlur"
          @focus="handleFocus"
        >
          <template #suffix>
            <div
              class="flex h-full items-center pr-2.5 cursor-default opacity-100"
            >
              <svg class="w-[14px] h-[14px] md:w-4 md:h-4 text-steel-color">
                <use :xlink:href="multiplierIcon"></use>
              </svg>
            </div>
          </template>
        </GInputNumber>
      </template>
      <template #panel>
        <div class="font-semibold text-white text-xs md:text-sm">
          {{
            v$.localValue.minValue.$invalid
              ? `Minimum is ${props.min}`
              : `Maximum is ${props.max}`
          }}
        </div>
      </template>
    </GTooltip>
  </div>
</template>
