<script setup lang="ts">
import { computed } from "vue";
import { GButton, GScrollbar, GTooltip } from "~/components/atoms";
import LinkGroup from "~/components/molecules/dropdowns/LinkGroup.vue";
import { ROUTES } from "~/constants/mock_data";
import LanguageCurrencyPopover from "~/components/molecules/popovers/LanguageCurrencyPopover.vue";
import {
  arrowLeftIcon,
  arrowRightIcon,
  liveSupportIcon,
  casinoIcon,
  sportIcon,
  homeIcon,
} from "~/icons";

defineProps<{
  isOpened: boolean;
  width: string;
}>();
defineEmits<{
  (e: "update:modelValue"): void;
}>();
const route = useRoute();
const groupName = computed(() => {
  if (route.path.split("/")[1] === "casino") {
    return "casino";
  } else if (route.path.split("/")[1] === "sports") {
    return "sports";
  }
  return "other";
});

const selectedLinkGroup = computed(() => {
  const selected_link_group = ROUTES.find((group) => {
    return group.url.split("/")[1] === route.path.split("/")[1];
  });
  return selected_link_group;
});
const topbarActiveClass =
  "bg-secondary-gradient border-2 border-solid border-secondary-color rounded-lg text-primary-color text-base font-medium text-center";
</script>
<template>
  <div
    class="
      bg-black-russian-color
      transition-all
      duration-200
      ease-in-out
      relative
      shadow-sidebar
    "
    :style="{
      width: width,
    }"
  >
    <GButton
      :style-type="isOpened ? 'secondary-sm' : 'primary-sm'"
      class="
        arrow-btn
        border-2
        right-0
        top-[45px]
        -translate-y-1/2
        translate-x-1/2
        text-white
        z-50
        hidden
        md:block
      "
      :class="isOpened ? 'border-secondary-color' : ' border-primary-color'"
      v-if="isOpened"
      :block="false"
      @click="$emit('update:modelValue')"
    >
      <svg class="w-3 h-3 text-white">
        <use :xlink:href="arrowLeftIcon" v-if="isOpened"></use>
        <use :xlink:href="arrowRightIcon" v-else></use>
      </svg>
    </GButton>
    <div
      class="
        transition-all
        duration-200
        ease-in-out
        overflow-hidden
        font-medium
      "
    >
      <!--Sidebar header section-->
      <div
        class="
          h-[90px]
          sticky
          px-5
          top-0
          flex
          items-center
          justify-center
          pr-[60px]
          md:pr-5
        "
        :style="{
          width: width,
        }"
      >
        <div
          class="
            flex
            items-center
            justify-center
            bg-midnight-express-color
            rounded-lg
            shadow-dark-box
          "
          :style="{
            width: width,
          }"
          v-if="isOpened"
        >
          <NuxtLink
            class="flex items-center justify-center gap-1 w-1/2 py-4 group"
            to="/casino/home"
            :active-class="topbarActiveClass"
            :class="
              groupName === 'casino'
                ? topbarActiveClass
                : 'text-steel-color hover:text-white'
            "
          >
            <div
              class="
                flex
                items-center
                justify-center
                gap-1
                group-active:scale-95
              "
            >
              <svg class="w-[18px] h-[18px]">
                <use :xlink:href="casinoIcon"></use>
              </svg>
              <span :class="groupName === 'casino' && 'text-white'"
                >Casino</span
              >
            </div>
          </NuxtLink>
          <NuxtLink
            class="flex items-center justify-center gap-1 w-1/2 py-4 group"
            to="/sports/home"
            :active-class="topbarActiveClass"
            :class="
              groupName === 'sports'
                ? topbarActiveClass
                : 'text-steel-color hover:text-white'
            "
          >
            <div
              class="
                flex
                items-center
                justify-center
                gap-1
                group-active:scale-95
              "
            >
              <svg class="w-[18px] h-[18px]">
                <use :xlink:href="sportIcon"></use>
              </svg>
              <span :class="groupName === 'sports' && 'text-white'"
                >Sports</span
              >
            </div>
          </NuxtLink>
        </div>
        <GButton
          style-type="secondary-sm"
          :block="false"
          class="flex items-center justify-center group topbar"
          @click="$emit('update:modelValue')"
          v-else
        >
          <svg class="w-5 h-5 group-active:scale-95">
            <use
              :xlink:href="
                groupName === 'casino'
                  ? casinoIcon
                  : groupName === 'sports'
                  ? sportIcon
                  : homeIcon
              "
            ></use>
          </svg>
        </GButton>
      </div>
      <div
        class="
          h-[calc(100vh_-_5.625rem)]
          md:py-5
          sm:pt-0
          md:px-0
          sm:px-2
          sm:pb-5
        "
        :style="{ width: width }"
      >
        <GScrollbar height="100%" class="min-h-full" style-type="invisible">
          <!--If the menu is closed, only menu icons should be showed.-->
          <div
            v-if="!isOpened"
            class="flex flex-col justify-center items-center"
          >
            <!--Group menu icons should be showed first.-->
            <div
              v-for="group in ROUTES"
              :key="group.key"
              class="hover:text-white p-2 group"
              :class="
                selectedLinkGroup?.key === group.key
                  ? 'bg-primary-gradient border rounded-lg border-primary-color text-white'
                  : 'text-steel-color'
              "
            >
              <GTooltip position="absolute" width="120px" placement="right">
                <template #trigger>
                  <NuxtLink :to="group.url">
                    <svg class="w-5 h-5 group-active:scale-95">
                      <use :xlink:href="group.icon"></use>
                    </svg>
                  </NuxtLink>
                </template>
                <template #panel>
                  <div class="text-white text-base">{{ group.label }}</div>
                </template>
              </GTooltip>
            </div>

            <!--There should be linke between link groups-->
            <div class="bg-midnight-express-color h-[2px] my-3 w-1/2"></div>
            <!--Iterate sublinks of link group when the linkgroup is selected.-->
            <template
              v-for="(link, index) in selectedLinkGroup?.items"
              :key="`sublink_${index}`"
            >
              <div
                class="bg-midnight-express-color h-[2px] my-3 w-1/2"
                v-if="link.type === 'divider'"
              ></div>
              <NuxtLink
                :to="link.url"
                class="text-steel-color p-2 hover:text-white group"
                active-class="bg-primary-gradient border rounded-lg border-primary-color text-white"
                v-else
              >
                <GTooltip position="absolute" width="120px" placement="right">
                  <template #trigger>
                    <svg class="w-5 h-5 group-active:scale-95">
                      <use :xlink:href="link.icon"></use>
                    </svg>
                  </template>
                  <template #panel>
                    <div class="text-white text-base">{{ link.label }}</div>
                  </template>
                </GTooltip>
              </NuxtLink>
            </template>
            <!--In closed menu, the divider should be showed after sublinks.-->
            <div
              class="bg-midnight-express-color h-[2px] mb-5 mt-3 w-1/2"
              v-if="selectedLinkGroup?.items?.length ?? 0 > 0"
            ></div>
          </div>
          <!--If the meun is opened, menu icons and labels should be showed.-->
          <template v-else>
            <div v-for="(group, index) in ROUTES" :key="index" class="mb-5">
              <LinkGroup :key="group.key" :group="group" />
            </div>
            <div class="w-full px-[20px] mb-5">
              <div class="bg-midnight-express-color w-full h-[2px]"></div>
            </div>
          </template>
          <div class="flex flex-row items-center justify-center w-full px-4">
            <GButton
              style-type="transparent"
              class="group"
              :class="
                isOpened
                  ? 'p-4 rounded-xl live-support-btn shadow-dark-box'
                  : 'p-0 flex flex-row items-center justify-center'
              "
            >
              <div
                class="
                  flex flex-row
                  items-center
                  text-steel-color
                  group-hover:text-white
                  justify-start
                  gap-2
                "
                v-if="isOpened"
              >
                <svg class="w-5 h-5">
                  <use :xlink:href="liveSupportIcon"></use>
                </svg>
                <span class="font-medium">Live Support</span>
              </div>
              <GTooltip
                position="absolute"
                width="120px"
                placement="right"
                v-else
              >
                <template #trigger>
                  <div
                    class="
                      flex flex-row
                      items-center
                      text-steel-color
                      group-hover:text-white
                      justify-center
                    "
                  >
                    <svg class="w-5 h-5">
                      <use :xlink:href="liveSupportIcon"></use>
                    </svg>
                  </div>
                </template>
                <template #panel>
                  <div class="text-white text-base">Live Support</div>
                </template>
              </GTooltip>
            </GButton>
          </div>
          <div class="px-4" :class="isOpened ? 'mt-5' : 'mt-3'">
            <span
              :class="isOpened ? 'block' : 'hidden'"
              class="text-base text-white mb-3"
              >Language & Currency</span
            >
            <LanguageCurrencyPopover :is-opened="isOpened" />
          </div>
        </GScrollbar>
      </div>
    </div>
  </div>
</template>
<style scoped>
.arrow-btn {
  position: absolute;
  border-radius: 8px;
  align-items: center;
}
.live-support-btn {
  background-color: theme(colors.midnight-express-color);
}
.topbar {
  padding: 18px 8px 18px 8px;
  color: theme(colors.primary-color);
}
.topbar:hover {
  color: white;
  background-image: theme(backgroundImage.primary-gradient);
  border: 2px solid theme(colors.primary-color);
}
</style>
