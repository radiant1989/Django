<script setup lang="ts">
import { GPopover, GProgressbar, GButton } from "~/components/atoms";
import { AUTH, THEME, RIGHTBAR_STATE, LOGOUT } from "~/constants";
import {
  arrowBelowIcon,
  walletIcon,
  vaultIcon,
  affiliateIcon,
  transactionsIcon,
  notificationsIcon,
  statisticsIcon,
  sportsBetsIcon,
  communityIcon,
  settingsIcon,
  logoutIcon,
  messageLiveIcon,
} from "~/icons";
import { User } from "~/types";

const props =
  defineProps<{
    user: User;
  }>();

const emits =
  defineEmits<{
    (e: "clicked-vip"): void;
    (e: "open:notificationsBar"): void;
  }>();
const { screen } = inject(THEME)!;
const router = useRouter();
const onVIPButtonClick = () => {
  emits("clicked-vip");
};
const { rightbarContentType } = inject(RIGHTBAR_STATE)!;
const openNotificationsBar = (close: Function) => {
  rightbarContentType.value = "NOTIFICATION";
  close();
};
const openLogoutModal = (close: Function) => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      tab: LOGOUT,
      modal: "auth",
    },
  });
  close();
};
const openBetslipBar = (close: Function) => {
  rightbarContentType.value = "BETSLIP";
  close();
};
const profileVisible = ref<boolean>(false);

const openMiniProfile = (close: Function) => {
  profileVisible.value = true;
  close();
};
</script>
<template>
  <GPopover
    :block="true"
    :arrow="true"
    width="308px"
    :placement="screen.lg ? 'bottom' : 'bottomRight'"
  >
    <template #trigger="{ open }">
      <button
        id="popup-btn"
        :class="[
          { active: open },
          'bg-transparent flex flex-row gap-3 items-center group text-base text-steel-color group-hover:text-white',
        ]"
      >
        <div class="relative">
          <img
            :width="44"
            src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg"
            class="border-2 border-secondary-color rounded-lg"
            alt="loading..."
          />
          <div
            class="
              w-[14px]
              h-[14px]
              rounded-full
              absolute
              -top-[3px]
              right-[3px]
              translate-x-1/2
            "
          >
            <div
              class="
                absolute
                w-full
                h-full
                bg-ronil-color
                rounded-full
                border-2 border-secondary-color
              "
            ></div>
          </div>
        </div>
        <div class="flex flex-col gap-3 items-center">
          <div
            class="flex flex-row gap-4 items-center font-medium"
            :class="open && 'text-white'"
          >
            <span class="lg:flex hidden">
              {{ user.username }}
            </span>
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
          <GProgressbar
            height="6px"
            :percentage="65"
            class="rounded-[32px] lg:flex hidden"
          />
        </div>
      </button>
    </template>
    <template #panel="{ open, close }">
      <div class="px-[25px] py-[16px]">
        <div
          class="
            h-[65px]
            mb-[16px]
            w-full
            flex flex-row
            justify-between
            items-center
          "
        >
          <div class="flex flex-row">
            <img
              src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/profile.jpg"
              :width="65"
              class="border-2 border-white/10 rounded-lg cursor-pointer"
              alt="loading..."
              style="box-shadow: 0px 5.96891px 5.96891px rgba(0, 0, 0, 0.35)"
              @click="openMiniProfile(close)"
            />
            <div class="flex flex-col justify-center ml-[16px] font-medium">
              <div
                class="font-proximanova text-[16px] leading-[19px] text-[#fff]"
              >
                {{ user.username }}
              </div>
              <div class="text-xs text-white flex flex-row items-center mt-1.5">
                <img
                  src="https://storybook-gamba.s3.sa-east-1.amazonaws.com/assets/icons/Header/fxs.png"
                  width="20"
                  alt="loading..."
                />
                <span class="ml-[5px]"> Platinum II </span>
              </div>
            </div>
          </div>
          <GButton
            :block="false"
            style-type="third"
            class="shine shine-hover border-third-color border-2 px-[18px] py-3"
            @click="onVIPButtonClick"
          >
            VIP
          </GButton>
        </div>
        <div class="w-full flex justify-between text-xxs text-steel-color mb-1">
          <span> 1 lvl </span>
          <span> 2 lvl </span>
        </div>
        <GProgressbar height="6px" :percentage="60" class="rounded-[32px]" />
        <div class="flex flex-row justify-between w-full mt-4">
          <div class="flex flex-col justify-start items-start gap-4">
            <GButton style-type="transparent" :block="false">
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="walletIcon"></use>
                </svg>
                <span>Wallet</span>
              </div>
            </GButton>
            <GButton style-type="transparent" :block="false">
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="vaultIcon"></use>
                </svg>
                <span>Vault</span>
              </div>
            </GButton>
            <GButton style-type="transparent" :block="false">
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="affiliateIcon"></use>
                </svg>
                <span>Affiliate</span>
              </div>
            </GButton>
            <GButton style-type="transparent" :block="false">
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="transactionsIcon"></use>
                </svg>
                <span>Transactions</span>
              </div>
            </GButton>
          </div>
          <div class="flex flex-col justify-start items-start gap-4">
            <GButton
              style-type="transparent"
              :block="false"
              @click="openNotificationsBar(close)"
              class="md:hidden"
            >
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[19px] h-[15px]">
                  <use :xlink:href="notificationsIcon"></use>
                </svg>
                <span>Notifications</span>
              </div>
            </GButton>
            <GButton style-type="transparent" :block="false">
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="statisticsIcon"></use>
                </svg>
                <span>Statistics</span>
              </div>
            </GButton>
            <GButton
              style-type="transparent"
              :block="false"
              @click="openBetslipBar(close)"
            >
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="sportsBetsIcon"></use>
                </svg>
                <span>Bet slip</span>
              </div>
            </GButton>
            <GButton style-type="transparent" :block="false">
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="communityIcon"></use>
                </svg>
                <span>Community</span>
              </div>
            </GButton>
            <GButton style-type="transparent" :block="false">
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="settingsIcon"></use>
                </svg>
                <span>Settings</span>
              </div>
            </GButton>
          </div>
        </div>
        <div
          class="mt-5 w-full mb-[10px] h-[1px] rounded-[5px] bg-ebony-color"
        ></div>
        <div class="flex flex-row justify-between w-full">
          <div class="flex flex-col justify-start items-start">
            <GButton
              style-type="transparent"
              :block="false"
              @click="openLogoutModal(close)"
            >
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="logoutIcon"></use>
                </svg>
                <span>Log Out </span>
              </div>
            </GButton>
          </div>
          <div class="flex flex-col justify-start items-start">
            <GButton style-type="transparent" :block="false">
              <div class="flex flex-row gap-2 items-center justify-center">
                <svg class="w-[21px] h-[21px]">
                  <use :xlink:href="messageLiveIcon"></use>
                </svg>
                <span>Live Support </span>
              </div>
            </GButton>
          </div>
        </div>
      </div>
    </template>
  </GPopover>

  <GModal v-model="profileVisible" width="418px">
    <MiniProfile />
  </GModal>
</template>
<style scoped>
.shine {
  position: relative;
  overflow: hidden;
}
.shine::before {
  content: "";
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    110deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
}
.shine-hover::before {
  left: -100%;
  transition: all 0.65s ease-in-out;
}
.shine-hover:hover::before {
  left: 100%;
}
</style>
