<script setup lang="ts">
import copy from "copy-to-clipboard";
import QrcodeVue from "qrcode.vue";
import { AUTH, PREFERENCE, cryptoCurrencies, currencyItems } from "~/constants";
import {
  copyIcon,
  refreshIcon,
  incorrectNotifyIcon,
  refreshNotifyIcon,
} from "~/icons";
import { GTooltip, notify } from "~/components/atoms";
import TokenPopover from "~/components/organisms/wallet/popovers/TokenPopover.vue";
import RefreshConfirmModal from "./RefreshConfirmModal.vue";
import { GET_WALLET_ADDRESS_MUTATION } from "~/graphql";

const { me, refetch } = inject(AUTH)!;
const { preferences } = inject(PREFERENCE)!;
const route = useRoute();
const { mutate, loading, onDone, onError, error } = useMutation(
  GET_WALLET_ADDRESS_MUTATION
);
const wallet = computed(() =>
  me.value?.wallets.find(
    (wallet) => wallet.currency.code === route.query.currency
  )
);
const fiatPrice = computed(() => {
  return wallet.value?.currency.quotes.values[
    preferences?.value?.activeFiatCode ?? "USD"
  ];
});
const address = computed(() => wallet.value.activeAddress[0].address || "");
const isRefreshModalOpen = ref<boolean>(false);
const isTooltipVisible = ref<boolean>(false);
const copyToClipbaord = () => {
  copy(address.value);
  isTooltipVisible.value = true;
  setTimeout(() => {
    isTooltipVisible.value = false;
  }, 1000);
};
const closeRefreshModal = () => {
  isRefreshModalOpen.value = false;
};
const changeAddress = () => {
  mutate({
    types: wallet.value?.currency.code,
    userId: String(me.value?.id),
  });
};
onDone(async () => {
  notify.success({
    title: `${wallet.value?.currency.code} Deposit Address Changed`,
    text: `New ${wallet.value?.currency.code} deposit address has been set.`,
    icon: {
      href: refreshNotifyIcon,
      class: "w-10 h-10",
    },
  });
  refetch();
  isRefreshModalOpen.value = false;
});
onError(() => {
  notify.error(
    {
      title: "BTC Address Change Cooldown",
      text: error.value?.message || "Something went wrong",
      icon: {
        href: incorrectNotifyIcon,
        class: "w-10 h-[38px]",
      },
    },
    4000
  );
  isRefreshModalOpen.value = false;
});
</script>
<template>
  <div class="DepositForm font-semibold">
    <div class="g-form-item">
      <div class="flex justify-between mb-2.5">
        <label class="g-text-base block">Deposit Currency</label>
        <span class="g-text-base text-steel-color">Balance</span>
      </div>
      <div
        class="
          w-full
          bg-secondary-gradient
          shadow-dark-box
          rounded-lg
          md:h-[45px]
          sm:h-10
          flex flex-row
          justify-between
          items-center
          pr-[15px]
        "
      >
        <TokenPopover />
        <GTooltip
          placement="bottomRight"
          position="absolute"
          class="hidden md:block"
        >
          <template #trigger>
            <div class="flex flex-row" v-if="preferences?.displayInfiatEnabled">
              <span class="text-white g-text-base">{{
                currencyItems[preferences?.activeFiatCode].text
              }}</span>
              <span class="text-white g-text-base mr-[5px]">
                {{
                  Number(Number(fiatPrice) * wallet.free_amount).toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }
                  )
                }}
              </span>
            </div>
          </template>
          <template #panel>
            <div class="flex flex-row items-center gap-1.5">
              <p
                class="text-white text-sm md:text-base font-semibold"
                v-if="preferences?.displayInfiatEnabled"
              >
                {{ wallet.free_amount.toFixed(8) }}
              </p>
              <SolIcon v-if="route.query.currency === 'SOL'" />
              <MaticIcon v-else-if="route.query.currency === 'MATIC'" />
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
                  :xlink:href="cryptoCurrencies[route.query.currency].icon"
                ></use>
              </svg>
            </div>
          </template>
        </GTooltip>
        <div
          class="flex flex-row md:hidden"
          v-if="preferences?.displayInfiatEnabled"
        >
          <span class="text-white g-text-base">{{
            currencyItems[preferences?.activeFiatCode].text
          }}</span>
          <span class="text-white g-text-base mr-[5px]">
            {{
              Number(Number(fiatPrice) * wallet.free_amount).toLocaleString(
                undefined,
                {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }
              )
            }}
          </span>
        </div>
        <p
          class="text-white text-sm md:text-base"
          v-if="!preferences?.displayInfiatEnabled"
        >
          {{ wallet.free_amount.toFixed(8) }}
        </p>
      </div>
    </div>
    <div class="g-form-item g-mb-md overflow-hidden">
      <label class="text-steel-color g-text-base">
        {{ wallet?.currency.code }} Deposit Address
      </label>
      <div
        class="
          bg-secondary-gradient
          shadow-dark-box
          h-10
          md:h-[45px]
          rounded-lg
          g-text-sm
          relative
          flex
          items-center
          pl-4
          w-full
          mt-2.5
        "
      >
        <span class="g-text-base text-white">{{ address }}</span>
        <div
          class="
            absolute
            top-1/2
            right-0
            -translate-y-1/2
            flex
            items-center
            h-10
            md:h-[45px]
            bg-secondary-gradient
            border-2 border-secondary-color
            rounded-md
          "
        >
          <button
            class="
              text-steel-color
              px-3
              h-full
              scale-100
              hover:text-white
              hover:bg-secondary-hover-gradient
              hover:border-secondary-hover-color
              rounded-l-sm
              active:scale-95
              group
            "
            @click="isRefreshModalOpen = true"
          >
            <svg
              class="w-[18px] h-[18px] text-steel-color group-hover:text-white"
            >
              <use :xlink:href="refreshIcon"></use>
            </svg>
          </button>
          <span class="w-[1px] h-[33px] bg-midnight-express-color" />

          <GTooltip
            position="absolute"
            width="90px"
            placement="top"
            :trigger="isTooltipVisible"
          >
            <template #trigger>
              <button
                class="
                  text-steel-color
                  h-[36px]
                  md:h-[41px]
                  px-3
                  hover:text-white
                  hover:bg-secondary-hover-gradient
                  hover:border-secondary-hover-color
                  rounded-r-sm
                  active:scale-95
                  group
                "
                @click="copyToClipbaord"
              >
                <svg
                  class="
                    w-[18px]
                    h-[18px]
                    text-steel-color
                    group-hover:text-white
                  "
                >
                  <use :xlink:href="copyIcon"></use>
                </svg>
              </button>
            </template>
            <template #panel>
              <div class="text-white text-base">Copied</div>
            </template>
          </GTooltip>
        </div>
      </div>
    </div>
    <div class="g-mb-md">
      <div
        class="
          w-[150px]
          h-[150px]
          bg-secondary-gradient
          flex
          items-center
          justify-center
          border border-secondary-color
          rounded-lg
          mx-auto
        "
      >
        <qrcode-vue
          :value="address"
          :size="128"
          level="H"
          render-as="svg"
          foreground="white"
          background="transparent"
        />
      </div>
    </div>
    <div class="w-full flex justify-center">
      <p class="text-xxs md:text-xs text-steel-color mx-auto">
        NOTICE: Only send {{ wallet.currency.code }} to this address,
        {{ cryptoCurrencies[wallet.currency.code].confirms }} confirmation
        required.
      </p>
    </div>
    <RefreshConfirmModal
      :is-open="isRefreshModalOpen"
      :loading="loading"
      @close:modal="closeRefreshModal"
      @confirm:change-address="changeAddress"
    />
  </div>
</template>
