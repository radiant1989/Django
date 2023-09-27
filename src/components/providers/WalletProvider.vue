<script setup lang="ts">
import { AUTH, WALLET, PREFERENCE } from "~/constants";
import { WALLET_UPDATED_SUBSCRIPTION } from "~/graphql";
import { notify } from "~/components/atoms";
import { userIcon, depositNotifyIcon } from "~/icons";
import { Wallet } from "~/types";

const { me, subscribeToMore } = inject(AUTH)!;
const { activeCryptoCode } = inject(PREFERENCE)!;
subscribeToMore({
  document: WALLET_UPDATED_SUBSCRIPTION,
  updateQuery(prev, { subscriptionData }) {
    console.log("subscriptionData", subscriptionData.data);
    if (subscriptionData.data.walletUpdated.action === "deposit") {
      notify.success({
        title: "Deposit Successful!",
        text: `Your deposit of ${subscriptionData.data.walletUpdated.free_amount} has been successfully credited to your account.`,
        icon: {
          class: "w-10 h-8 text-[#FFDB41]",
          href: depositNotifyIcon,
        },
      });
    }
    return {
      me: {
        ...prev.me,
        wallets: prev.me.wallets.map((wallet: Wallet) => {
          if (Number(wallet.id) !== subscriptionData.data.walletUpdated.id)
            return wallet;
          return {
            ...wallet,
            free_amount: Number(
              subscriptionData.data.walletUpdated.free_amount
            ),
          };
        }),
      },
    };
  },
});
const whitelist = computed(() => me.value?.whitelist || []);
const vaults = computed(() => me.value?.vault || []);
const selectedAddress = ref<string>("");
const currentWallet = computed(() =>
  me.value?.wallets.find(
    (wallet) => wallet.currency.code === activeCryptoCode.value
  )
);
const fee = ref<number>(currentWallet.value?.currency.last_price || 0);
provide(WALLET, {
  fee,
  currentWallet,
  vaults,
  whitelist,
  selectedAddress,
});
</script>
<template>
  <slot></slot>
</template>
