<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";
import { GPopover, notify, GTooltip } from "~/components/atoms";
import Balances from "~/components/organisms/wallet/popovers/Balances.vue";

import { arrowBelowIcon, SolIcon, MaticIcon } from "~/icons";
import {
  AUTH,
  cryptoCurrencies,
  currencyItems,
  CONTAINER,
  PREFERENCE,
  WALLET,
} from "~/constants";
import { SAVE_USER_PREFERENCES_MUTATION } from "~/graphql";

const { refetch } = inject(AUTH)!;
const { preferences, activeCryptoCode } = inject(PREFERENCE)!;
const { currentWallet } = inject(WALLET)!;
const { mutate, onDone, onError, error } = useMutation(
  SAVE_USER_PREFERENCES_MUTATION
);
const { containerScreen } = inject(CONTAINER)!;
const onSelect = (code: string, close: Function) => {
  mutate({
    ...preferences.value,
    activeCryptoCode: code,
  });
  close();
};
onDone(() => {
  refetch();
});
onError(() => {
  notify.error(
    {
      title: "Error",
      text: error.value?.message || "Something went wrong",
    },
    4000
  );
});
const router = useRouter();
const route = useRoute();
const openSettingsModal = (close: Function) => {
  router.push({
    ...route,
    query: {
      modal: "setting",
    },
  });
  close();
};
</script>
<template>
  <GPopover
    :block="true"
    class="h-full"
    :left-deviation="containerScreen.width >= 768 ? '50px' : '28px'"
  >
    <template #trigger="{ open }">
      <GTooltip placement="bottom" position="absolute" class="hidden md:block">
        <template #trigger>
          <div
            class="
              bg-dark-color
              hover:bg-opacity-70 hover:bg-[#11141c]
              shadow-dark-box
              h-10
              md:h-[45px]
              rounded-l-lg
              flex flex-row
              items-center
              justify-between
              px-2.5
              md:px-[15px]
            "
          >
            <span
              class="text-white g-text-base font-semibold"
              v-if="preferences?.displayInfiatEnabled"
              >{{ currencyItems[preferences?.activeFiatCode].text }}</span
            >
            <span
              class="text-white g-text-base mr-[5px] font-semibold"
              v-if="preferences?.displayInfiatEnabled"
              >{{
                Number(
                  Number(
                    currentWallet.currency.quotes.values[
                      preferences?.activeFiatCode
                    ]
                  ) * currentWallet.free_amount
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}</span
            >
            <div
              :class="
                !preferences?.displayInfiatEnabled
                  ? 'mr-[5px]'
                  : 'mr-[5px] md:mr-2.5'
              "
            >
              <SolIcon v-if="activeCryptoCode === 'SOL'" />
              <MaticIcon v-else-if="activeCryptoCode === 'MATIC'" />
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
                  :xlink:href="cryptoCurrencies[activeCryptoCode].icon"
                ></use>
              </svg>
            </div>
            <div
              class="flex flex-row mr-[5px] md:mr-2.5"
              v-if="!preferences?.displayInfiatEnabled"
            >
              <span class="lg:text-base text-sm text-white font-semibold"
                >{{ parseInt(currentWallet.free_amount.toFixed(8)) }}.</span
              >
              <span class="lg:text-base text-sm text-steel-color font-semibold">
                {{
                  (
                    currentWallet.free_amount -
                    parseInt(currentWallet.free_amount.toFixed(8))
                  )
                    .toFixed(8)
                    .substr(2)
                }}
              </span>
            </div>
            <svg
              class="w-[9px] h-[6px] transition-transform duration-200"
              :class="
                open ? 'text-white' : 'text-steel-color group-hover:text-white'
              "
              :style="{ transform: `rotateX(${open ? '180deg' : '0deg'})` }"
            >
              <use :xlink:href="arrowBelowIcon"></use>
            </svg>
          </div>
        </template>
        <template #panel>
          <div
            class="
              flex flex-row
              items-center
              justify-between
              px-2.5
              md:px-[15px]
            "
          >
            <span
              class="text-white g-text-base font-semibold"
              v-if="!preferences?.displayInfiatEnabled"
              >{{ currencyItems[preferences?.activeFiatCode].text }}</span
            >
            <span
              class="text-white g-text-base mr-[5px] font-semibold"
              v-if="!preferences?.displayInfiatEnabled"
            >
              {{
                Number(
                  Number(
                    currentWallet.currency.quotes.values[
                      preferences?.activeFiatCode
                    ]
                  ) * currentWallet.free_amount
                ).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </span>
            <div
              :class="
                preferences?.displayInfiatEnabled
                  ? 'mr-[5px]'
                  : 'mr-[5px] md:mr-2.5'
              "
            >
              <SolIcon v-if="activeCryptoCode === 'SOL'" />
              <MaticIcon v-else-if="activeCryptoCode === 'MATIC'" />
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
                  :xlink:href="cryptoCurrencies[activeCryptoCode].icon"
                ></use>
              </svg>
            </div>
            <div
              class="flex flex-row mr-[5px] md:mr-2.5"
              v-if="preferences?.displayInfiatEnabled"
            >
              <span class="lg:text-base text-sm text-white font-semibold"
                >{{ parseInt(currentWallet.free_amount.toFixed(8)) }}.</span
              >
              <span class="lg:text-base text-sm text-steel-color font-semibold">
                {{
                  (
                    currentWallet.free_amount -
                    parseInt(currentWallet.free_amount.toFixed(8))
                  )
                    .toFixed(8)
                    .substr(2)
                }}
              </span>
            </div>
          </div>
        </template>
      </GTooltip>
      <div
        class="
          bg-dark-color
          hover:bg-opacity-70 hover:bg-[#11141c]
          h-10
          md:h-[45px]
          rounded-l-lg
          shadow-dark-box
          flex-row
          items-center
          justify-between
          px-2.5
          md:px-[15px]
          flex
          md:hidden
        "
      >
        <span
          class="text-white g-text-base font-semibold"
          v-if="preferences?.displayInfiatEnabled"
          >{{ currencyItems[preferences?.activeFiatCode].text }}</span
        >
        <span
          class="text-white g-text-base mr-[5px] font-semibold"
          v-if="preferences?.displayInfiatEnabled"
          >{{
            Number(
              Number(
                currentWallet.currency.quotes.values[
                  preferences?.activeFiatCode
                ]
              ) * currentWallet.free_amount
            ).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}</span
        >
        <div
          :class="
            !preferences?.displayInfiatEnabled
              ? 'mr-[5px]'
              : 'mr-[5px] md:mr-2.5'
          "
        >
          <SolIcon v-if="activeCryptoCode === 'SOL'" />
          <MaticIcon v-else-if="activeCryptoCode === 'MATIC'" />
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
            <use :xlink:href="cryptoCurrencies[activeCryptoCode].icon"></use>
          </svg>
        </div>
        <div
          class="flex flex-row mr-[5px] md:mr-2.5"
          v-if="!preferences?.displayInfiatEnabled"
        >
          <span class="lg:text-base text-sm text-white font-semibold"
            >{{ parseInt(currentWallet.free_amount.toFixed(8)) }}.</span
          >
          <span class="lg:text-base text-sm text-steel-color font-semibold">
            {{
              (
                currentWallet.free_amount -
                parseInt(currentWallet.free_amount.toFixed(8))
              )
                .toFixed(8)
                .substr(2)
            }}
          </span>
        </div>
        <svg
          class="w-[9px] h-[6px] transition-transform duration-200"
          :class="
            open ? 'text-white' : 'text-steel-color group-hover:text-white'
          "
          :style="{ transform: `rotateX(${open ? '180deg' : '0deg'})` }"
        >
          <use :xlink:href="arrowBelowIcon"></use>
        </svg>
      </div>
    </template>
    <template #panel="{ open, close }">
      <Balances
        @selected:token="onSelect($event, close)"
        @open:settings="openSettingsModal(close)"
      />
    </template>
  </GPopover>
</template>
