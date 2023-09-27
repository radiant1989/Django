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
          type="number"
          style-type="dark"
          :to-fixed="2"
          :static="static"
          :status="
            v$.localValue.$error && isConstraint && blured ? 'error' : 'normal'
          "
          @blur="handleBlur"
          @focus="handleFocus"
        >
          <template #suffix>
            <div
              class="
                flex
                h-full
                justify-center
                items-center
                pr-2.5
                cursor-default
              "
            >
              <svg class="w-[14px] h-[14px] md:w-4 md:h-4 text-steel-color">
                <use :xlink:href="percentIcon"></use>
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
<script setup lang="ts">
import { maxValue, required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { GInputNumber, GTooltip } from "~/components/atoms";
import { percentIcon } from "~/icons/index";
import { useGameSettingStore } from "@/store/games/settings";
import { THEME } from "@/constants";
const props =
  defineProps<{
    modelValue: number | "";
    static?: boolean;
    min?: number;
    max?: number;
  }>();
const emits =
  defineEmits<{
    (e: "update:modelValue", value: string | number): void;
  }>();
const { screen } = inject(THEME)!;
const store = useGameSettingStore();
const handleUpdateValue = async (value: string | number) => {
  localValue.value = Number(value);
  await v$.value.localValue.$validate();
  isPlayeable();
  emits("update:modelValue", value);
};
const localValue = ref<number>(Number(props.modelValue));
const rules = computed(() => {
  return {
    localValue: {
      required,
      maxValue: maxValue(props.max ?? 0),
      minValue: minValue(props.min ?? 0),
    },
  };
});
const v$ = useVuelidate(rules, { localValue }, { $rewardEarly: false });
const isConstraint = computed(() => {
  if (props.max === 0 && props.min === 0) return false;
  return true;
});
const isPlayeable = () => {
  if (v$.value.localValue.$error) {
    store.setGamePlayeable({ chance: false });
  } else store.setGamePlayeable({ chance: true });
};
watch(
  () => props.modelValue,
  async (val) => {
    localValue.value = Number(val);
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
