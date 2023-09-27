<script setup lang="ts">
import { ref } from "vue";
import { GButton, GLogo, GModal, notify } from "~/components/atoms";
import WalletPopover from "~/components/organisms/wallet/popovers/WalletPopover.vue";
import ProfilePopover from "~/components/molecules/popovers/ProfilePopover.vue";
import VIPPopup from "../VIPPopup.vue";
import WalletContent from "~/components/organisms/wallet/contents/WalletContent.vue";
import Whitelists from "~/components/organisms/wallet/whitelists/Whitelist.vue";
import AddressManage from "~/components/organisms/wallet/whitelists/AddressManage.vue";
import AddA2Whitelist from "~/components/organisms/wallet/whitelists/AddA2Whitelist.vue";
import Activate2FA from "~/components/organisms/wallet/Activate2FA.vue";

import { walletIcon, envelopeIcon, searchIcon, chatIcon } from "~/icons";
import {
  AUTH,
  RIGHTBAR_STATE,
  CONTAINER,
  THEME,
  PREFERENCE,
  WALLET,
} from "~/constants";
import Settings from "~/components/organisms/wallet/Settings.vue";

const { me } = inject(AUTH)!;
const { selectedAddress } = inject(WALLET)!;
const { activeCryptoCode } = inject(PREFERENCE)!;
// This is containerScreen, we can use it in template. ie: containerScreen.md, containerScreen.lg, containerScreen.xl, ...
const { containerScreen } = inject(CONTAINER)!;
const { screen } = inject(THEME)!;
const { rightbarContentType } = inject(RIGHTBAR_STATE)!;
const router = useRouter();
const route = useRoute();
const isSSR = process.server;
const isVIPPopup = ref<boolean>(false);
const modalType = computed(() => route.query.modal);
const modalVisible = computed(() =>
  ["wallet", "whitelist", "setting", "enable2fa"].includes(modalType.value)
);
const tab = computed(() => route.query.tab);
const openWalletModal = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      tab: "deposit",
      currency: activeCryptoCode.value,
      modal: "wallet",
    },
  });
};

const closeWalletModal = () => {
  router.push({
    path: router.currentRoute.value.path,
  });
  selectedAddress.value = "";
};

const onVisibleVIPPopup = () => {
  isVIPPopup.value = true;
};

const onCloseVIPPopup = () => {
  isVIPPopup.value = false;
};

const openNotificationsBar = () => {
  rightbarContentType.value = "NOTIFICATION";
};
const openChatBar = () => {
  rightbarContentType.value = "CHAT";
};
const logoSize = computed<{
  width: number;
  size: "sm" | "lg";
}>(() => {
  if (!screen.value.md) {
    return {
      width: 30,
      size: "sm",
    };
  }
  if (containerScreen.value.width >= 768) {
    return {
      width: 180,
      size: "lg",
    };
  } else {
    return {
      width: 30,
      size: "sm",
    };
  }
});
</script>
<template>
  <div class="w-full lg:h-[90px] md:h-[79px] h-[54px] sticky top-0">
    <div class="h-full flex flex-row items-center justify-between">
      <GLogo :width="logoSize.width" :size="logoSize.size" />
      <div class="flex flex-row items-center">
        <WalletPopover @open:wallet-setting="openWalletSettingsModal" />
        <GButton
          style-type="secondary"
          :block="false"
          @click="openWalletModal"
          class="lg:px-4 px-3 text-steel-color !rounded-l-none"
        >
          <div class="flex flex-row items-center gap-[6px]">
            <svg class="w-3.5 md:w-4 h-3.5">
              <use :xlink:href="walletIcon"></use>
            </svg>
            <span class="lg:text-base lg:block hidden font-medium">
              Wallet
            </span>
          </div>
        </GButton>
      </div>
      <div class="flex flex-row gap-[15px] items-center justify-center">
        <div class="hidden md:block w-10 md:w-[45px]">
          <GButton class="circle-button group" style-type="secondary"
            ><div
              class="flex flex-row w-full items-center justify-center h-full"
            >
              <svg
                class="
                  md:w-[25px]
                  md:h-[25px]
                  w-5
                  h-5
                  group-hover:text-white
                  text-steel-color
                "
              >
                <use :xlink:href="searchIcon"></use>
              </svg>
            </div>
          </GButton>
        </div>
        <ProfilePopover
          @clicked-vip="onVisibleVIPPopup"
          :user="me!"
          @open:notifications-bar="openNotificationsBar"
        />
        <VIPPopup :is-open="isVIPPopup" @close:vip="onCloseVIPPopup" />
        <div class="hidden md:block w-10 md:w-[45px]">
          <GButton
            class="circle-button"
            :block="true"
            :style-type="
              rightbarContentType === 'NOTIFICATION' ? 'primary' : 'secondary'
            "
            @click="openNotificationsBar"
            ><div class="flex flex-row items-center justify-center">
              <svg
                class="md:w-[25px] md:h-[25px] w-5 h-5 group-hover:text-white"
                :class="
                  rightbarContentType === 'NOTIFICATION'
                    ? 'text-white'
                    : 'text-steel-color'
                "
              >
                <use :xlink:href="envelopeIcon"></use>
              </svg>
            </div>
          </GButton>
        </div>
        <div class="hidden md:block">
          <GButton
            class="circle-button"
            :block="true"
            :style-type="
              rightbarContentType === 'CHAT' ? 'primary' : 'secondary'
            "
            @click="openChatBar"
            ><div class="flex flex-row items-center justify-center">
              <svg
                class="md:w-[25px] md:h-[25px] w-5 h-5 group-hover:text-white"
                :class="
                  rightbarContentType === 'CHAT'
                    ? 'text-white'
                    : 'text-steel-color'
                "
              >
                <use :xlink:href="chatIcon"></use>
              </svg>
            </div>
          </GButton>
        </div>
      </div>
    </div>
    <GModal
      v-model="modalVisible"
      @update:model-value="closeWalletModal"
      :top="modalType === 'setting' ? '40px' : '160px'"
      width="525px"
    >
      <WalletContent :default-tab="tab" v-if="modalType === 'wallet'" />
      <Whitelists
        v-else-if="modalType === 'whitelist' && tab === 'whitelist'"
      />
      <AddressManage
        v-else-if="modalType === 'whitelist' && tab === 'management'"
      />
      <AddA2Whitelist v-else-if="modalType === 'whitelist' && tab === 'add'" />
      <Activate2FA v-else-if="modalType === 'enable2fa'" />
      <Settings v-else-if="modalType === 'setting'" />
    </GModal>
  </div>
</template>
<style scoped>
.GButton {
  margin: auto;
  color: #858da0;
}
.GButton:hover {
  color: #fff;
}
.circle-button {
  border-radius: 50%;
  padding-left: 9px;
  padding-right: 9px;
}
</style>
