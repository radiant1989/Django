<script setup lang="ts">
import {
  GTabs,
  GPopover,
  GScrollbar,
  GDrawer,
  GCloseButton,
} from "@/components/atoms";
import Icons from "./Icons.vue";
import CustomizeLobby from "./CustomizeLobby.vue";
import {
  lobbyIcon,
  gameShowsIcon,
  liveCasinoIcon,
  originalsIcon,
  slotsIcon,
  tableGamesIcon,
  settingsIcon,
} from "~/icons";
import { THEME } from "~/constants";

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();
const { screen } = inject(THEME)!;
const state = reactive({
  settingsDrawerVisible: false,
});
const tabs = [
  {
    key: "lobby",
    label: "Lobby",
    value: "/casino/home",
    icon: lobbyIcon,
    iconActive: "#lobby-icon-active",
  },
  {
    key: "slots",
    label: "Slots",
    value: "/casino/home/slots",
    icon: slotsIcon,
    iconActive: "#slots-icon-active",
  },
  {
    key: "live_casino",
    label: "Live Casino",
    value: "/casino/home/live-casino",
    icon: liveCasinoIcon,
    iconActive: "#live-casino-icon-active",
  },
  {
    key: "game_shows",
    label: "Game Shows",
    value: "/casino/home/game-shows",
    icon: gameShowsIcon,
    iconActive: "#game-shows-icon-active",
  },
  {
    key: "table_games",
    label: "Table Games",
    value: "/casino/home/table-games",
    icon: tableGamesIcon,
    iconActive: "#table-games-icon-active",
  },
  {
    key: "originals",
    label: "Originals",
    value: "/casino/home/originals",
    icon: originalsIcon,
    iconActive: "#originals-icon-active",
  },
];
</script>
<template>
  <div class="CategoryNavigation">
    <GScrollbar width="100%" style-type="content">
      <div class="flex items-center gap-2.5 w-max pb-2 md:pb-0">
        <div class="flex-none" :style="{ width: `${tabs.length * 150}px` }">
          <GTabs
            :tabs="tabs"
            :model-value="$route.path"
            bar-class="border-t border-cloud-burst-color rounded-lg"
            style-type="default-lg"
          >
            <template #default="{ option, cssClass, selected }">
              <NuxtLink
                class="
                  !px-2
                  group
                  flex flex-col
                  justify-center
                  items-stretch
                  text-white
                  font-medium
                "
                :class="[cssClass]"
                :to="option.value"
              >
                <div class="flex items-center justify-center gap-x-2">
                  <div class="w-5 h-5 relative">
                    <div
                      class="
                        absolute
                        inset-0
                        group-hover:opacity-0
                        duration-200
                      "
                      :class="{ invisible: selected }"
                    >
                      <svg class="w-full h-full text-steel-color">
                        <use :xlink:href="option.icon"></use>
                      </svg>
                    </div>
                    <div
                      class="absolute inset-x-0 inset-y-0 duration-200"
                      :class="{
                        'opacity-0 group-hover:opacity-100': !selected,
                      }"
                    >
                      <svg class="w-full h-full">
                        <use :xlink:href="option.iconActive"></use>
                      </svg>
                    </div>
                  </div>
                  <span class="whitespace-pre">{{ option.label }}</span>
                </div>
              </NuxtLink>
            </template>
          </GTabs>
        </div>
        <div class="flex-none" v-if="screen.md">
          <GPopover arrow :zIndex="40">
            <template #trigger="{ open }">
              <button
                class="
                  h-[45px]
                  md:h-[50px]
                  aspect-square
                  flex
                  items-center
                  justify-center
                  bg-dark-color
                  border-t border-solid border-cloud-burst-color
                  rounded-lg
                  group
                "
                :class="{
                  'text-white': open,
                  'text-steel-color hover:text-white': !open,
                }"
              >
                <svg class="w-6 h-6 mx-auto group-active:scale-95">
                  <use :xlink:href="settingsIcon"></use>
                </svg>
              </button>
            </template>
            <template #panel>
              <div class="w-[373px] p-5">
                <h5 class="text-white mb-3">Customize Your Homepage</h5>
                <p class="text-sm text-steel-color mb-5">
                  Select which reels you would like displayed and then drag and
                  drop to change the order
                </p>
                <div class="border-b bordr-midnight-express-color mb-5"></div>
                <CustomizeLobby />
              </div>
            </template>
          </GPopover>
        </div>
        <div class="flex-none" v-else>
          <button
            @click="state.settingsDrawerVisible = true"
            class="
              h-[45px]
              md:h-[50px]
              aspect-square
              flex
              items-center
              justify-center
              bg-dark-color
              border-t border-solid border-cloud-burst-color
              rounded-lg
              text-steel-color
              hover:text-white
              group
            "
          >
            <svg class="w-6 h-6 mx-auto group-active:scale-95">
              <use :xlink:href="settingsIcon"></use>
            </svg>
          </button>
        </div>
      </div>
    </GScrollbar>
    <Icons />
    <GDrawer v-model="state.settingsDrawerVisible" :closable="false">
      <div class="h-full bg-black-russian-color">
        <GScrollbar height="100%" style-type="content">
          <div class="g-p-page text-steel-color g-text-base">
            <div class="flex items-center mb-4">
              <div class="flex-1">
                <h5 class="text-white font-medium text-base">
                  Customize Your Homepage
                </h5>
              </div>
              <div class="flex-none">
                <GCloseButton
                  close-label="close customize home drawer"
                  @click="state.settingsDrawerVisible = false"
                />
              </div>
            </div>
            <div
              class="
                pt-2.5
                p-[15px]
                bg-ebony-clay-color
                rounded-md
                border border-cloud-burst-color
              "
            >
              <p class="text-sm text-steel-color mb-5">
                Select which reels you would like displayed and then drag and
                drop to change the order
              </p>
              <div class="border-b-2 border-midnight-express-color mb-5"></div>
              <CustomizeLobby />
            </div>
            <div class="h-28"></div>
          </div>
        </GScrollbar>
      </div>
    </GDrawer>
  </div>
</template>
