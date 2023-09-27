<template>
  <div
    class="flex lg:flex-col flex-col-reverse"
    :class="store.theatremode ? 'gap-5' : 'lg:gap-[30px] gap-5'"
  >
    <div
      class="flex flex-col"
      :class="store.theatremode ? 'gap-5' : 'lg:gap-[30px] gap-5'"
    >
      <div>
        <BetAmountInput
          :model-value="betAmount"
          @update:model-value="$emit('update:amountValue', $event)"
          @handle-half-click="$emit('handleHalfClick')"
          @handle-double-click="$emit('handleDoubleClick')"
          @handle-max-confirm-click="$emit('handleMaxConfirmClick')"
          :static="autoStatus !== 101 ? true : false"
        />
      </div>
      <div>
        <p
          for="numOfBets"
          class="mb-2.5 text-steel-color md:text-base text-sm font-semibold"
        >
          Number of Bets
        </p>
        <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
          <GTooltip
            :trigger="v$.localbetNumber.$error && (!blured || mouseEnterShow)"
          >
            <template #trigger>
              <GInputNumber
                id="numOfBets"
                :model-value="localbetNumber"
                :static="autoStatus !== 101 ? true : false"
                @update:model-value="$emit('update:betNumber', $event)"
                :status="
                  v$.localbetNumber.$error && blured ? 'error' : 'normal'
                "
                @blur="handleBlur"
                @focus="handleFocus"
            /></template>
            <template #panel>
              <div class="font-semibold text-white text-xs md:text-sm">
                {{ v$.localbetNumber.minValue.$invalid && `Minimum is "0"` }}
              </div>
            </template>
          </GTooltip>
        </div>
      </div>
      <div>
        <p class="mb-2.5 text-steel-color md:text-base text-sm font-semibold">
          On Win
        </p>
        <IncreaseByInput
          :model-value="winPercent"
          @update:model-value="$emit('update:winPercent', $event)"
          :static="autoStatus !== 101 ? true : false"
          @update:reset="$emit('update:winReset', $event)"
        />
      </div>
      <div>
        <div
          class="
            flex flex-row
            items-center
            justify-between
            text-steel-color
            md:text-base
            text-sm
            mb-2.5
            font-semibold
          "
        >
          <span>Stop on Profit</span>
          <span>{{
            !preferences?.displayInfiatEnabled
              ? `${currencyItems[preferences?.activeFiatCode ?? "USD"].text} ${(
                  Number(profitAmount) * Number(fiatPrice)
                ).toFixed(2)}`
              : `${Number(profitAmount).toFixed(8)} ${
                  activeCryptoCode ?? "BTC"
                }`
          }}</span>
        </div>
        <div class="w-full">
          <BitcoinInput
            @update:model-value="handleProfit"
            :static="autoStatus !== 101 ? true : false"
            :model-value="
              preferences?.displayInfiatEnabled
                ? Number(profitAmount) * Number(fiatPrice)
                : profitAmount
            "
            :is-suffix="!preferences?.displayInfiatEnabled"
            :prefix="currencyItems[preferences?.activeFiatCode ?? 'USD'].text"
            :to-fixed="preferences?.displayInfiatEnabled ? 2 : 8"
          />
        </div>
      </div>
      <div>
        <p class="mb-2.5 text-steel-color md:text-base text-sm font-semibold">
          On Loss
        </p>
        <IncreaseByInput
          :model-value="lossPercent"
          @update:model-value="$emit('update:lossPercent', $event)"
          :static="autoStatus !== 101 ? true : false"
          @update:reset="$emit('update:lossReset', $event)"
        />
      </div>
      <div>
        <div
          class="
            flex flex-row
            items-center
            justify-between
            text-steel-color
            md:text-base
            text-sm
            mb-2.5
            font-semibold
          "
        >
          <span>Stop on Loss</span>
          <span>{{
            !preferences?.displayInfiatEnabled
              ? `${currencyItems[preferences?.activeFiatCode ?? "USD"].text} ${(
                  Number(lossAmount) * Number(fiatPrice)
                ).toFixed(2)}`
              : `${Number(lossAmount).toFixed(8)} ${activeCryptoCode ?? "BTC"}`
          }}</span>
        </div>
        <div class="w-full">
          <BitcoinInput
            @update:model-value="handleLoss"
            :static="autoStatus !== 101 ? true : false"
            :model-value="
              preferences?.displayInfiatEnabled
                ? Number(lossAmount) * Number(fiatPrice)
                : lossAmount
            "
            :is-suffix="!preferences?.displayInfiatEnabled"
            :prefix="currencyItems[preferences?.activeFiatCode ?? 'USD'].text"
            :to-fixed="preferences?.displayInfiatEnabled ? 2 : 8"
          />
        </div>
      </div>
    </div>
    <GButton @click="$emit('play:autoGame')" :disabled="!playeable"
      >{{
        autoStatus === 101
          ? "Start AutoBet"
          : autoStatus === 102
          ? "Stop Bet"
          : "Finishing Bet"
      }}
    </GButton>
  </div>
</template>
<script setup lang="ts">
import { GButton, GInputNumber, GTooltip } from "~/components/atoms";
import BetAmountInput from "~/components/molecules/inputs/BetAmountInput.vue";
import BitcoinInput from "~/components/molecules/inputs/BitcoinInput.vue";
import IncreaseByInput from "~/components/molecules/inputs/IncreaseByInput.vue";
import { minValue, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useGameSettingStore } from "@/store/games/settings";
import { AUTH, PREFERENCE, currencyItems } from "~/constants";
import { EmitFlags } from "typescript";
const props = withDefaults(
  defineProps<{
    betAmount: number;
    betNumber: number;
    winPercent: number;
    lossPercent: number;
    profitAmount: number;
    lossAmount: number;
    autoStatus: number;
  }>(),
  {
    betAmount: 0,
    betNumber: 0,
    winPercent: 0,
    lossPercent: 0,
    profitAmount: 0,
    lossAmount: 0,
    autoStatus: 101,
  }
);
const emits =
  defineEmits<{
    (e: "update:amountValue"): void;
    (e: "update:winPercent"): void;
    (e: "update:lossPercent"): void;
    (e: "update:betNumber"): void;
    (e: "update:profitAmount", val: number): void;
    (e: "update:lossAmount", val: number): void;
    (e: "play:autoGame"): void;
  }>();
const { me } = inject(AUTH)!;
const { activeCryptoCode, preferences } = inject(PREFERENCE)!;
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
const store = useGameSettingStore();
const localbetNumber = ref<number>(props.betNumber);
const rules = computed(() => {
  return {
    localbetNumber: {
      required,
      minValue: minValue(0),
    },
  };
});
const playeable = computed<boolean>(() => {
  let isError: boolean = false;
  Object.values(store.gameplayable).map((val: any) => {
    if (!val as boolean) isError = true;
  });
  return !isError;
});
const v$ = useVuelidate(rules, { localbetNumber });
const isPlayeable = () => {
  if (v$.value.localbetNumber.$error) {
    store.setGamePlayeable({ betnumber: false });
  } else store.setGamePlayeable({ betnumber: true });
};
onMounted(async () => {
  blured.value = true;
  await v$.value.localbetNumber.$validate();
  // isPlayeable();
});
watch(
  () => props.betNumber,
  async (val) => {
    localbetNumber.value = Number(val);
    await v$.value.localbetNumber.$validate();
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
const handleProfit = (val: number) => {
  if (preferences.value?.displayInfiatEnabled)
    emits("update:profitAmount", val / Number(fiatPrice.value));
  else emits("update:profitAmount", val);
};
const handleLoss = (val: number) => {
  if (preferences.value?.displayInfiatEnabled)
    emits("update:lossAmount", val / Number(fiatPrice.value));
  else emits("update:lossAmount", val);
};
</script>
