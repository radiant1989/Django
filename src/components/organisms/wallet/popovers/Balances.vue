<script setup lang="ts">
import { ref } from "vue";
import { GScrollbar, GButton, GInput, GSwitch } from "~/components/atoms";
import { searchIcon, settingsIcon, SolIcon, MaticIcon } from "~/icons";

import {
  AUTH,
  PREFERENCE,
  WALLET,
  cryptoCurrencies,
  currencyItems,
} from "~/constants";
import { SAVE_USER_PREFERENCES_MUTATION } from "~/graphql";
import { Vault } from "~/types";
withDefaults(
  defineProps<{
    isVault: boolean;
  }>(),
  {
    isVault: false,
  }
);
const { me, refetch } = inject(AUTH)!;
const { vaults } = inject(WALLET)!;
const { preferences } = inject(PREFERENCE)!;
const { mutate, onDone, onError, error, loading } = useMutation(
  SAVE_USER_PREFERENCES_MUTATION
);
const isHideZero = ref<boolean>(false);
const isFiat = ref<boolean>(preferences.value?.displayInfiatEnabled || false);
const emits =
  defineEmits<{
    (e: "selected:token", code: string): void;
    (e: "toggle:fiat", status: boolean): void;
  }>();
const searchWord = ref<string>("");
const onSelect = (code: string) => {
  emits("selected:token", code);
  searchWord.value = "";
};
const filteredWallets = computed(() =>
  me.value?.wallets.filter((wallet) =>
    wallet.currency.code.includes(searchWord.value.toUpperCase())
  )
);
const filteredVaults = computed(() =>
  vaults.value.filter((vault) =>
    vault.currency.includes(searchWord.value.toUpperCase())
  )
);
const walletFromVault = (vault: Vault) => {
  return me.value?.wallets.find(
    (wallet) => wallet.currency.code === vault.currency
  );
};
const toggleFiatSwitch = (value: boolean) => {
  mutate({
    ...preferences.value,
    displayInfiatEnabled: value,
  });
  refetch();
};
</script>
<template>
  <div class="px-4">
    <div class="mt-3 w-full relative">
      <div class="flex items-center gap-[15px]">
        <div class="flex-1">
          <GInput placeholder="Search for Token" v-model="searchWord">
            <template #suffix>
              <svg
                class="
                  w-[15px]
                  h-[15px]
                  absolute
                  top-1/2
                  right-[12px]
                  -translate-y-1/2
                  text-white
                "
              >
                <use :xlink:href="searchIcon"></use>
              </svg>
            </template>
          </GInput>
        </div>
        <GButton
          style-type="transparent"
          :block="false"
          class="block !w-[18px] md:hidden"
          @click="$emit('open:settings')"
        >
          <svg
            class="w-[18px] h-[18px] text-steel-color group-hover:text-white"
          >
            <use :xlink:href="settingsIcon"></use>
          </svg>
        </GButton>
      </div>
    </div>
  </div>
  <div class="pr-1.5 my-3">
    <GScrollbar height="300px" style-type="secondary">
      <div
        v-for="vault in filteredVaults"
        class="
          flex flex-row
          justify-between
          py-1.5
          md:py-[11px]
          pl-4
          cursor-pointer
          hover:bg-secondary-color
          pr-3.5
        "
        :key="vault.currency"
        v-on:click="onSelect(vault.currency)"
        v-if="isVault"
      >
        <div class="flex flex-row font-semibold">
          <SolIcon v-if="vault.currency === 'SOL'" />
          <MaticIcon v-else-if="vault.currency === 'MATIC'" />
          <svg
            class="
              w-[14px]
              h-[14px]
              md:w-4
              md:h-4
              text-steel-color
              group-hover:text-white
            "
            v-else
          >
            <use :xlink:href="cryptoCurrencies[vault.currency].icon"></use>
          </svg>
          <label class="ml-2 text-sm md:text-base text-white cursor-pointer">{{
            vault.currency
          }}</label>
        </div>

        <div class="flex flex-row g-text-base" v-if="!isFiat">
          <span class="lg:text-base text-sm text-white font-medium"
            >{{ parseInt(vault.amount.toFixed(8)) }}.</span
          ><span class="lg:text-base text-sm text-steel-color font-medium">
            {{
              (vault.amount - parseInt(vault.amount.toFixed(8)))
                .toFixed(8)
                .substr(2)
            }}
          </span>
        </div>
        <div class="flex flex-row text-white font-medium gap-1" v-else>
          <span>
            {{ currencyItems[preferences?.activeFiatCode].text }}
          </span>
          <span
            >{{
              Number(
                Number(
                  walletFromVault(vault).currency.quotes.values[
                    preferences?.activeFiatCode
                  ]
                ) * vault.amount
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}
          </span>
        </div>
      </div>
      <div
        v-for="wallet in filteredWallets"
        class="
          flex flex-row
          items-center
          justify-between
          py-1.5
          md:py-[11px]
          pl-4
          cursor-pointer
          hover:bg-secondary-color
          pr-3.5
        "
        :key="wallet.currency.code"
        v-on:click="onSelect(wallet.currency.code)"
        v-else
      >
        <div class="flex flex-row font-semibold items-center g-text-base">
          <SolIcon v-if="wallet.currency.code === 'SOL'" />
          <MaticIcon v-else-if="wallet.currency.code === 'MATIC'" />
          <svg
            class="
              w-[14px]
              h-[14px]
              md:w-4
              md:h-4
              text-steel-color
              group-hover:text-white
            "
            v-else
          >
            <use
              :xlink:href="cryptoCurrencies[wallet.currency.code].icon"
            ></use>
          </svg>
          <label class="ml-2 text-white cursor-pointer">{{
            wallet.currency.code
          }}</label>
        </div>
        <div class="flex flex-row" v-if="!isFiat">
          <span class="text-white font-medium"
            >{{ parseInt(wallet.free_amount.toFixed(8)) }}.</span
          ><span class="text-steel-color font-medium">
            {{
              (wallet.free_amount - parseInt(wallet.free_amount.toFixed(8)))
                .toFixed(8)
                .substr(2)
            }}
          </span>
        </div>
        <div class="flex flex-row text-white font-medium gap-1" v-else>
          <span>
            {{ currencyItems[preferences?.activeFiatCode].text }}
          </span>
          <span
            >{{
              Number(
                Number(
                  wallet.currency.quotes.values[preferences?.activeFiatCode]
                ) * wallet.free_amount
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}
          </span>
        </div>
      </div>
    </GScrollbar>
  </div>
  <div
    class="
      w-full
      h-10
      md:h-[45px]
      px-4
      flex
      items-center
      gap-2
      bg-secondary-gradient
      rounded-b-[10px]
    "
  >
    <GButton
      style-type="transparent"
      :block="false"
      class="hidden md:block"
      @click="$emit('open:settings')"
    >
      <svg class="w-[18px] h-[18px] text-steel-color group-hover:text-white">
        <use :xlink:href="settingsIcon"></use>
      </svg>
    </GButton>
    <div class="flex flex-row gap-2">
      <label class="g-text-sm text-steel-color font-semibold">
        View in fiat
      </label>
      <GSwitch
        class="w-[28px]"
        v-model="isFiat"
        @update:model-value="toggleFiatSwitch"
      />
    </div>
    <div class="flex flex-row gap-2">
      <label class="g-text-sm font-semibold"> Hide zero balance </label>
      <GSwitch class="w-[28px]" v-model="isHideZero" />
    </div>
  </div>
</template>
