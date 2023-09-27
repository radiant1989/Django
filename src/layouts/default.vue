<template>
  <div id="AppLayout" class="bg-black-russian-color">
    <div class="flex overflow-x-hidden">
      <!-- Sidebar column -->
      <div class="flex-none">
        <!-- Site sidebar -->
        <!-- TODO: SSR render solution -->
        <ClientOnly>
          <div v-if="screen.md" class="hidden md:block sticky top-0 z-[60]">
            <div v-if="isOverlay" style="width: 60px">
              <OverlaidSidebar
                :sidebar-width="sidebarWidth"
                :is-opened="isOpened"
                @close:overlay="closeOverlay"
                @update:model-value="toggleOpen"
                :is-triggered="isTriggered"
              />
            </div>
            <GSidebar
              :is-opened="isOpened"
              @update:model-value="toggleOpen"
              :width="sidebarWidth"
              v-else
            />
          </div>
        </ClientOnly>
      </div>
      <!-- Content column -->
      <div class="flex-1 min-w-0">
        <!-- Site Header -->
        <div class="md:flex flex-col md:h-screen bg-[#13171f]">
          <div class="flex-none h-[54px] md:h-auto">
            <header
              id="site-header"
              class="fixed md:relative top-0 z-50 w-full bg-ebony-clay-color"
            >
              <div class="g-px-page">
                <div class="max-w-content mx-auto">
                  <ContainerProvider>
                    <LoggedOut v-if="!isLoggedIn" />
                    <LoggedIn v-else />
                  </ContainerProvider>
                </div>
              </div>
            </header>
          </div>
          <div class="flex-1 min-h-0">
            <GScrollbar height="100%" style-type="content">
              <!-- Site Main -->
              <PageLoadingProvider>
                <main id="site-main" class="bg-[#10131a]">
                  <ContainerProvider>
                    <GameModalProvider>
                      <div class="g-p-page">
                        <div class="max-w-content mx-auto">
                          <slot />
                        </div>
                      </div>
                    </GameModalProvider>
                  </ContainerProvider>
                </main>
              </PageLoadingProvider>
              <!-- Site Footer -->
              <footer id="site-footer">
                <GFooter />
              </footer>
              <!-- Preserve mobile footer area -->
              <div class="h-16 md:h-0"></div>
            </GScrollbar>
          </div>
        </div>
      </div>
      <div class="flex-none">
        <!-- TODO: SSR render solution -->
        <ClientOnly>
          <div v-if="screen.lxl" class="hidden lxl:block sticky top-0 z-50">
            <Rightbar />
          </div>
        </ClientOnly>
        <!-- TODO: SSR render solution -->
        <ClientOnly>
          <div
            v-if="screen.md && !screen.lxl"
            class="hidden md:block lxl:hidden sticky top-0 z-50"
          >
            <GDrawer
              :model-value="isRightbarOpen"
              placement="right"
              width="370px"
              @update:model-value="closeRightBar"
              :closable="true"
              :closePosition="{
                top: screen.lg ? '35px' : '30px',
                right: '20px',
              }"
            >
              <NotificationBar v-if="rightbarContentType === 'NOTIFICATION'" />
              <ChatProvider v-if="rightbarContentType === 'CHAT'" />
              <BetslipBar v-if="rightbarContentType === 'BETSLIP'" />
            </GDrawer>
          </div>
        </ClientOnly>
      </div>
    </div>
    <div class="md:hidden" v-if="isSSR || !screen.md">
      <MobileStickyFooter />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { inject, ref, watch } from "vue";
import { GScrollbar, GDrawer } from "~/components/atoms";
import ContainerProvider from "@/components/providers/ContainerProvider.vue";
import PageLoadingProvider from "@/components/providers/PageLoadingProvider.vue";
import LoggedOut from "~/components/organisms/headers/LoggedOut.vue";
import LoggedIn from "~/components/organisms/headers/LoggedIn.vue";
import { default as GFooter } from "~/components/organisms/Footer.vue";
import { default as GSidebar } from "~/components/organisms/sidebars/Leftbar.vue";
import OverlaidSidebar from "~/components/organisms/sidebars/OverlaidSidebar.vue";
import MobileStickyFooter from "~/components/organisms/sidebars/MobileStickyFooter.vue";
import Rightbar from "~/components/organisms/sidebars/Rightbar.vue";
import NotificationBar from "~/components/organisms/sidebars/NotificationBar.vue";
import ChatProvider from "~/components/organisms/chat/ChatProvider.vue";
import GameModalProvider from "~/games/GameModalProvider.vue";

import BetslipBar from "~/components/organisms/sidebars/BetslipBar.vue";
import {
  AUTH,
  THEME,
  RIGHTBAR_STATE,
  OPENED_SIDEBAR_WIDTH,
  CLOSED_SIDEBAR_WIDTH,
  MOBILE_SIDEBAR_WIDTH,
} from "~/constants";
const { screen } = inject(THEME)!;

const isSSR = process.server;
const { isLoggedIn } = inject(AUTH)!;

watch(
  () => isLoggedIn.value,
  (value) => {
    console.log("watch loggedin flat", isLoggedIn.value);
  }
);
const isOverlay = ref<boolean>(false);
const isOpened = ref<boolean>(false);
const isTriggered = ref<boolean>(false);
const rightbarContentType = ref<string>("");
const isRightbarOpen = computed(() => !!rightbarContentType.value);
const sidebarWidth = ref<string>(CLOSED_SIDEBAR_WIDTH);
// Close overlay
const closeOverlay = () => {
  isOpened.value = false;
  sidebarWidth.value = CLOSED_SIDEBAR_WIDTH;
  setTimeout(() => {
    isOverlay.value = false;
  }, 200);
};
const toggleOpen = () => {
  if (!isOpened.value) {
    isOpened.value = true;
    sidebarWidth.value = OPENED_SIDEBAR_WIDTH;
    screen.value.xl
      ? (isOverlay.value = false)
      : ((isOverlay.value = true), (isTriggered.value = true));
  } else {
    isOpened.value = false;
    sidebarWidth.value = CLOSED_SIDEBAR_WIDTH;
    if (isOverlay) {
      setTimeout(() => {
        isOverlay.value = false;
      }, 200);
    }
  }
};
watch(
  () => screen.value,
  (value) => {
    if (isOpened.value) {
      if (value.md) {
        sidebarWidth.value = OPENED_SIDEBAR_WIDTH;
        value.xl
          ? (isOverlay.value = false)
          : ((isOverlay.value = true), (isTriggered.value = false));
      } else {
        sidebarWidth.value = MOBILE_SIDEBAR_WIDTH;
        isOverlay.value = false;
      }
    }
  }
);
const closeRightBar = () => {
  rightbarContentType.value = "";
};
provide(RIGHTBAR_STATE, { isRightbarOpen, rightbarContentType, closeRightBar });
</script>
