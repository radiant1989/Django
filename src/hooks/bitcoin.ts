import { Ref, computed } from "vue";

export const useBitcoin = (coinAmount: Ref<number>) => {
  const coinToDollarRate = 31404;
  const dollarAmount = computed<number>(() => {
    return coinAmount.value * coinToDollarRate;
  });
  return {
    dollarAmount,
    coinToDollarRate,
  };
};
