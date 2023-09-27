<template>
  <div class="flex flex-col lg:gap-[30px] gap-5">
    <div>
      <BetAmountInput
        :model-value="betamount"
        @update:model-value="$emit('update:amountValue', $event)"
        @handle-half-click="$emit('handleHalfClick')"
        @handle-double-click="$emit('handleDoubleClick')"
        @handle-max-confirm-click="$emit('handleMaxConfirmClick')"
        :static="gameinprocess"
        class="mt-3"
      />
    </div>

    <div class="flex lg:flex-col flex-col-reverse lg:gap-[30px] gap-5">
      <div class="flex flex-col gap-3 w-full">
        <div
          class="
            flex flex-row
            items-center
            justify-between
            text-steel-color
            md:text-base
            text-sm
            font-semibold
          "
        >
          <span>Profit on Win</span>
          <span>{{
            !preferences?.displayInfiatEnabled
              ? `${currencyItems[preferences?.activeFiatCode ?? "USD"].text} ${(
                  Number(profitamount) * Number(fiatPrice)
                ).toFixed(2)}`
              : `${Number(profitamount).toFixed(8)} ${
                  activeCryptoCode ?? "BTC"
                }`
          }}</span>
        </div>
        <BitcoinInput
          :model-value="
            preferences?.displayInfiatEnabled
              ? (Number(profitamount) * Number(fiatPrice)).toFixed(2)
              : profitamount
          "
          :static="true"
          :is-suffix="!preferences?.displayInfiatEnabled"
          :prefix="currencyItems[preferences?.activeFiatCode ?? 'USD'].text"
        />
      </div>
      <GButton
        @click="$emit('play:betGame')"
        :disabled="gameinprocess || !playeable"
        >Bet</GButton
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { GButton } from "~/components/atoms";
import BetAmountInput from "~/components/molecules/inputs/BetAmountInput.vue";
import BitcoinInput from "~/components/molecules/inputs/BitcoinInput.vue";
import { useGameSettingStore } from "@/store/games/settings";
import { AUTH, PREFERENCE, currencyItems } from "~/constants";
defineEmits<{
  (e: "play:betGame"): void;
  (e: "update:amountValue"): void;
}>();
const props = withDefaults(
  defineProps<{
    gameinprocess: boolean;
    betamount: number;
    targetValue: number;
    conditionValue: boolean;
  }>(),
  { gameinprocess: false, betamount: 0, targetValue: 0, conditionValue: false }
);
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
const playeable = computed<boolean>(() => {
  let isError: boolean = false;
  Object.values(store.gameplayable).map((val: any) => {
    if (!val as boolean) isError = true;
  });
  return !isError;
});
const profitamount = computed<string>(() => {
  console.log(props.targetValue);
  return props.conditionValue
    ? (
        (99 / (100 - Number(props.targetValue))) * props.betamount -
        props.betamount
      ).toFixed(8)
    : (
        (99 / Number(props.targetValue)) * props.betamount -
        props.betamount
      ).toFixed(8);
});
</script>
