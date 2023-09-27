<script setup lang="ts">
import { GButton, GTabs } from "~/components/atoms";
import DepositForm from "./DepositForm.vue";
import WithdrawForm from "./WithdrawForm.vue";
import VaultForm from "./VaultForm.vue";
import TipForm from "./TipForm.vue";
import { transactionsIcon, walletIcon } from "~/icons";
import { THEME, AUTH } from "~/constants";
useHead({
  script: [
    {
      src: "/assets/js/wallet-address-validator.min.js",
      defer: true,
      tagPosition: "bodyClose",
    },
  ],
});
const tabs = [
  {
    value: "deposit",
    label: "Deposit",
  },
  {
    value: "withdraw",
    label: "Withdraw",
  },
  {
    value: "vault",
    label: "Vault",
  },
  {
    value: "tip",
    label: "Tip",
  },
];
const props = withDefaults(
  defineProps<{
    defaultTab: string;
  }>(),
  {
    defaultTab: "deposit",
  }
);
const { screen } = inject(THEME)!;
const { me } = inject(AUTH)!;

const selectedTab = ref<string>(props.defaultTab);
const router = useRouter();
const route = useRoute();
const onTabChange = (value: string) => {
  selectedTab.value = value;
  router.replace({ query: { ...route.query, tab: selectedTab.value } });
};
</script>
<template>
  <div class="pt-5 pb-5 md:pb-[30px]">
    <div
      class="
        w-full
        flex
        items-center
        justify-between
        md:pl-[30px]
        pl-6
        md:pr-[60px]
        pr-9
      "
    >
      <div class="flex flex-row items-center gap-[5px]">
        <svg class="md:w-5 md:h-5 w-4 h-4 text-white">
          <use :xlink:href="walletIcon"></use>
        </svg>
        <span class="text-white md:text-base text-sm font-semibold">
          Wallet
        </span>
      </div>
      <div class="flex">
        <div class="flex flex-row items-center gap-[5px]">
          <GButton style-type="transparent" :block="false">
            <div
              class="
                flex flex-row
                items-center
                gap-[6px]
                text-steel-color
                group-hover:text-white
              "
            >
              <svg class="md:w-5 md:h-5 w-4 h-4">
                <use :xlink:href="transactionsIcon"></use>
              </svg>
              <span class="md:text-base text-sm"> Transactions </span>
            </div>
          </GButton>
        </div>
      </div>
    </div>
    <div class="md:px-[30px] px-5 md:pt-[30px] pt-5">
      <GTabs
        :tabs="tabs"
        @update:model-value="onTabChange"
        :model-value="selectedTab"
        style-type="default"
        v-if="screen.md"
      />
      <GTabs
        :tabs="tabs"
        @update:model-value="onTabChange"
        :model-value="selectedTab"
        style-type="dark-sm"
        v-else
      />

      <!-- Tab content -->
      <div class="mt-5 md:mt-[30px] transition-all duration-500 ease-in-out">
        <DepositForm v-if="selectedTab === 'deposit'" />
        <WithdrawForm v-if="selectedTab === 'withdraw'" :code="verifyCode" />
        <VaultForm v-if="selectedTab === 'vault'" />
        <TipForm v-if="selectedTab === 'tip'" />
      </div>
    </div>
  </div>
</template>
