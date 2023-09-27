<template>
  <div class="w-full h-full flex flex-row items-center justify-between">
    <div class="flex flex-row gap-4 items-center">
      <SettingPopover />
      <GTooltip
        class="hidden lg:flex"
        placement="top"
        :arrow="screen.md ? true : false"
        :border="true"
      >
        <template #trigger>
          <div class="py-2 flex flex-row items-center">
            <GButton
              style-type="transparent"
              :block="false"
              @click="handleTheatreModal"
            >
              <svg
                class="w-[19px] h-[12px]"
                :class="store.theatremode && 'text-white'"
              >
                <use :xlink:href="rectangleIcon"></use>
              </svg>
            </GButton>
          </div>
        </template>
        <template #panel>
          <div
            class="
              text-white text-xs
              md:text-sm
              hidden
              md:flex
              whitespace-nowrap
              font-semibold
            "
          >
            Theatre Mode
          </div>
        </template>
      </GTooltip>
      <GTooltip
        placement="top"
        :border="true"
        :arrow="screen.md ? true : false"
      >
        <template #trigger>
          <div class="py-2 flex flex-row items-center">
            <GButton style-type="transparent" :block="false">
              <svg class="w-[16px] h-[15px]">
                <use :xlink:href="barChartIcon"></use>
              </svg>
            </GButton>
          </div>
        </template>
        <template #panel>
          <div
            class="
              text-white text-xs
              md:text-sm
              hidden
              md:flex
              whitespace-nowrap
              font-semibold
            "
          >
            Live Stats
          </div>
        </template>
      </GTooltip>
      <GTooltip
        placement="top"
        :arrow="screen.md ? true : false"
        :border="true"
      >
        <template #trigger>
          <div class="py-2 flex flex-row items-center">
            <GButton style-type="transparent" :block="false">
              <svg class="w-[16px] h-[14px]">
                <use :xlink:href="outlineFavoriteIcon"></use>
              </svg>
            </GButton>
          </div>
        </template>
        <template #panel
          ><div
            class="
              text-white text-xs
              md:text-sm
              hidden
              md:flex
              whitespace-nowrap
              font-semibold
            "
          >
            Favorite
          </div></template
        >
      </GTooltip>
      <div class="g-divider-in-footer"></div>
    </div>
    <div class="hidden lg:flex mx-auto">
      <svg style="width: 116px; height: 23px; color: #3a404c">
        <use :xlink:href="gambaTextIcon"></use>
      </svg>
    </div>
    <div>
      <GButton style-type="transparent" :block="false" class="group">
        <span
          class="
            text-steel-color
            md:text-base
            text-sm
            group-hover:text-white
            font-semibold
          "
          @click="openFairnessModal"
        >
          Fairness
        </span>
      </GButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject } from "vue";
import { GButton, GTooltip } from "~/components/atoms";
import SettingPopover from "~/components/molecules/popovers/games/SettingPopover.vue";
import { THEME, AUTH, LOGIN } from "~/constants";
import {
  rectangleIcon,
  barChartIcon,
  outlineFavoriteIcon,
  gambaTextIcon,
} from "~/icons";
import { useGameSettingStore } from "~/store/games/settings";
const router = useRouter();
const { screen } = inject(THEME)!;
const isSSR = process.server;
const store = useGameSettingStore();
const handleTheatreModal = () => {
  store.toggleTheatreMode();
};
const me = inject(AUTH);
const { modalVisible, authType } = inject(AUTH)!;
function onShowLoginModal() {
  authType.value = LOGIN;
  modalVisible.value = true;
}
const openFairnessModal = () => {
  if (!me?.isLoggedIn.value) {
    onShowLoginModal();
  } else {
    //gameModalVisible.value = true;
    router.push({
      path: router.currentRoute.value.path,
      query: {
        modal: "fairness",
        noback: true,
      },
    });
  }
};
</script>
