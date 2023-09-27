<script setup lang="ts">
import { GButton, GPopover } from "~/components/atoms";
import { arrowBelowIcon, SolIcon, MaticIcon } from "~/icons";
import Balances from "./Balances.vue";
import { THEME, cryptoCurrencies } from "~/constants";

withDefaults(
  defineProps<{
    isVault: boolean;
  }>(),
  {
    isVault: false,
  }
);
const { screen } = inject(THEME)!;
const router = useRouter();
const route = useRoute();
const onSelect = (code: string, close: Function) => {
  router.replace({ query: { ...route.query, currency: code } });
  close();
};
</script>
<template>
  <GPopover
    :block="true"
    :width="screen.md ? '340px' : '290px'"
    :arrow="true"
    position="fixed"
    :placement="screen.md ? 'bottom' : 'bottomLeft'"
  >
    <template #trigger="{ open }">
      <GButton
        style-type="secondary"
        :block="true"
        class="!px-[15px]"
        type="button"
      >
        <div class="flex flex-row justify-between gap-4 items-center">
          <div class="flex flex-row gap-2 items-center">
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
            <span
              class="md:text-base text-sm"
              :style="open ? { color: 'white' } : { color: '#858DA0' }"
              >{{ route.query.currency }}</span
            >
          </div>
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
      </GButton>
    </template>
    <template #panel="{ open, close }">
      <Balances @selected:token="onSelect($event, close)" :is-vault="isVault" />
    </template>
  </GPopover>
</template>
