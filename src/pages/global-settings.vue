<script setup lang="ts">
import { GButton } from "@/components/atoms";
import ListingSelect from "@/components/molecules/selects/ListingSelect.vue";
import { THEME } from "~/constants";

const route = useRoute();
const { screen } = inject(THEME)!;
const isSSR = process.server;

const subRoutes = [
  {
    key: "privacy",
    to: "/global-settings/privacy",
    text: "Privacy",
  },
  {
    key: "security",
    to: "/global-settings/security",
    text: "Security",
  },
  {
    key: "active_sessions",
    to: "/global-settings/active-sessions",
    text: "Active Sessions",
  },
  {
    key: "verify",
    to: "/global-settings/verify",
    text: "Verify",
  },
  {
    key: "responsible_gambling",
    to: "/global-settings/responsible-gambling",
    text: "Responsible Gambling",
  },
];
const subRouteOptions = subRoutes.map((subRoute) => ({
  label: subRoute.text,
  value: subRoute.to,
}));
</script>
<template>
  <!-- have min height because some tab has small content without scrollbar -->
  <div class="GlobalSettingsPage" style="min-height: 710px">
    <h2 class="text-xl md:text-xxl text-white font-semibold g-mb-md">
      Global Settings
    </h2>
    <div class="flex gap-5">
      <div
        class="flex-none w-[235px] hidden md:block"
        v-if="isSSR || screen.md"
      >
        <div
          class="
            p-[15px]
            bg-ebony-clay-color
            border-t-2 border-cloud-burst-color
            rounded-lg
          "
        >
          <ul>
            <li v-for="subRoute in subRoutes" :key="subRoute.key">
              <NuxtLink :to="subRoute.to" class="block">
                <GButton
                  :style-type="
                    subRoute.to === route.path ? 'secondary' : 'size-md'
                  "
                  class="!text-left !font-medium whitespace-pre"
                  :class="{ 'text-steel-color': subRoute.to !== route.path }"
                  >{{ subRoute.text }}</GButton
                >
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-1 min-w-0">
        <div
          class="
            p-3
            pb-5
            md:p-[30px]
            bg-ebony-clay-color
            border-t-2 border-cloud-burst-color
            rounded-lg
            text-steel-color text-xs
            md:text-sm
            font-medium
          "
        >
          <div class="block md:hidden" v-if="isSSR || !screen.md">
            <div class="g-mb-md" style="width: 192px">
              <ListingSelect
                :modelValue="route.path"
                @update:modelValue="navigateTo($event)"
                :options="subRouteOptions"
                dropdownHeight="250px"
              />
            </div>
          </div>
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
