<template>
  <div
    class="
      flex flex-row
      items-center
      justify-between
      text-steel-color
      md:text-base
      text-sm
      font-semibold
      mb-2.5
    "
  >
    <span>Bet Amount</span>
    <span
      >{{
        !preferences?.displayInfiatEnabled
          ? `${currencyItems[preferences?.activeFiatCode ?? "USD"]?.text} ${(
              localValue * Number(fiatPrice)
            ).toFixed(2)}`
          : `${localValue.toFixed(8)} ${activeCryptoCode ?? "BTC"}`
      }}
    </span>
  </div>
  <div
    class="BetAmountInput"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <GTooltip :trigger="v$.localValue.$error && (!blured || mouseEnterShow)">
      <template #trigger>
        <GInputNumber
          step="0.001"
          placeholder="0.00000000"
          :model-value="
            preferences?.displayInfiatEnabled
              ? localValue * Number(fiatPrice)
              : localValue
          "
          @update:model-value="updateAmount"
          :to-fixed="preferences?.displayInfiatEnabled ? 2 : 8"
          :static="static"
          :status="v$.localValue.$error && blured ? 'error' : 'normal'"
          @blur="handleBlur"
          @focus="handleFocus"
        >
          <template #prefix>
            <div class="flex items-center h-full pl-3 lg:pl-[15px]">
              <span
                v-if="preferences?.displayInfiatEnabled"
                class="
                  text-steel-color
                  md:text-base
                  text-sm
                  font-semibold
                  pr-[5px]
                "
                >{{
                  currencyItems[preferences?.activeFiatCode ?? "USD"].text
                }}</span
              >
            </div>
          </template>
          <template #suffix>
            <div class="flex items-center h-full">
              <div class="flex h-full items-center pr-2.5">
                <svg
                  v-if="!preferences?.displayInfiatEnabled"
                  class="w-[14px] h-[14px] md:w-4 md:h-4"
                >
                  <use :xlink:href="currencyIcon"></use>
                </svg>
              </div>
              <div
                class="
                  bg-secondary-gradient
                  rounded-md
                  border-2 border-secondary-color
                  text-sm
                  lg:text-base
                  text-steel-color
                  font-semibold
                  h-full
                  min-w-[127px]
                "
                style="z-index: 30"
              >
                <div
                  class="
                    flex flex-row
                    w-full
                    items-center
                    justify-between
                    h-full
                    z-300
                  "
                >
                  <button
                    class="
                      px-[11px]
                      rounded-l-md
                      lg:px-[14px]
                      group
                      hover:bg-secondary-hover-color
                      h-full
                      w-3/10
                    "
                    :class="[optionClass]"
                    type="button"
                    @click="$emit('handleHalfClick')"
                  >
                    <div class="group-active:scale-95">½</div>
                  </button>
                  <div class="g-divider-in-btn"></div>
                  <button
                    class="
                      px-[11px]
                      lg:px-[14px]
                      group
                      hover:bg-secondary-hover-color
                      h-full
                      w-3/10
                    "
                    :class="[optionClass]"
                    type="button"
                    @click="$emit('handleDoubleClick')"
                  >
                    <div class="group-active:scale-95">x2</div>
                  </button>
                  <div class="g-divider-in-btn"></div>
                  <button
                    v-if="!maxClicked"
                    class="
                      rounded-r-md
                      px-[11px]
                      lg:px-[14px]
                      group
                      hover:bg-secondary-hover-color
                      h-full
                      w-2/5
                    "
                    :class="[optionClass]"
                    type="button"
                    @click="handleMaxClick"
                  >
                    <div class="group-active:scale-95">Max</div>
                  </button>
                  <button
                    v-else
                    class="
                      px-[7px]
                      lg:px-[9px]
                      rounded-r-md
                      group
                      hover:bg-secondary-hover-color
                      h-full
                      w-2/5
                    "
                    :class="[optionClass]"
                    type="button"
                    @click="handleMaxConfirmClick"
                  >
                    <div class="group-active:scale-95 text-white">Sure?</div>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </GInputNumber>
      </template>
      <template #panel>
        <div class="font-semibold text-white text-xs md:text-sm">
          {{
            v$.localValue.minValue.$invalid
              ? "This must be greater than or equal to 0"
              : "Can't be more than your balance!"
          }}
        </div>
      </template>
    </GTooltip>
  </div>
</template>
<script setup lang="ts">
import { GInputNumber, GTooltip } from "~/components/atoms";
import { PREFERENCE, WALLET, AUTH, currencyItems } from "~/constants";
import { cryptoCurrencies } from "~/constants/micro-constants";
import { minValue, maxValue, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useGameSettingStore } from "@/store/games/settings";
const props = withDefaults(
  defineProps<{ modelValue?: number | string; static?: boolean }>(),
  {
    static: false,
  }
);
const emits =
  defineEmits<{
    (e: "update:modelValue", value: number | string): void;
    (e: "handleMaxConfirmClick"): void;
  }>();
const store = useGameSettingStore();
const { me } = inject(AUTH)!;
const { activeCryptoCode, preferences } = inject(PREFERENCE)!;
const { currentWallet } = inject(WALLET)!;
const localValue = ref<number>(Number(props.modelValue));
const wallet = computed(() =>
  me.value?.wallets.find(
    (wallet) => wallet.currency.code === activeCryptoCode.value
  )
);
const fiatPrice = computed(() => {
  return wallet.value?.currency.quotes.values[
    preferences?.value?.activeFiatCode ?? "USD"
  ];
});
const rules = computed(() => {
  return {
    localValue: {
      required,
      minValue: minValue(0),
      maxValue: maxValue(currentWallet.value?.free_amount ?? 0),
    },
  };
});
const v$ = useVuelidate(rules, { localValue });
const currencyIcon = computed(
  () => cryptoCurrencies[activeCryptoCode.value].icon
);
const maxClicked = ref<boolean>(false);
const optionClass = "py-2 md:py-2.5 hover:text-white";
const handleMaxClick = () => {
  maxClicked.value = true;
};
const handleMaxConfirmClick = () => {
  maxClicked.value = false;
  emits("handleMaxConfirmClick");
};
const isPlayeable = () => {
  if (v$.value.localValue.$error) {
    store.setGamePlayeable({ amount: false });
  } else store.setGamePlayeable({ amount: true });
};
onMounted(async () => {
  blured.value = true;
  await v$.value.localValue.$validate();
  isPlayeable();
});
watch(
  () => props.modelValue,
  async (val) => {
    localValue.value = Number(val);
    console.log(
      localValue.value,
      (currentWallet.value?.free_amount ?? 0) * Number(fiatPrice.value),
      currentWallet.value?.free_amount,
      currentWallet.value?.free_amount ?? 0,
      fiatPrice.value
    );
    await v$.value.localValue.$validate();
    isPlayeable();
  }
);
watch(
  () => activeCryptoCode.value,
  async (val) => {
    localValue.value = 0;
    emits("update:modelValue", 0);
    // await v$.value.localValue.$validate();
    // isPlayeable();
  }
);
const blured = ref<boolean>(true);
const handleBlur = () => {
  blured.value = true;
  mouseEnterShow.value = false;
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
const updateAmount = (val: number) => {
  if (preferences.value?.displayInfiatEnabled)
    emits("update:modelValue", val / Number(fiatPrice.value));
  else emits("update:modelValue", val);
};
</script>
<style scoped></style>
