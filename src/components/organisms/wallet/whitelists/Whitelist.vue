<script setup lang="ts">
import { GButton, GInput } from "~/components/atoms";
import { GPagination } from "~/components/atoms";
import PagePopover from "~/components/molecules/popovers/PagePopover.vue";
import { addressBookIcon, searchIcon, roundLeftArrowIcon } from "~/icons";
import { WALLET } from "~/constants";

const route = useRoute();
const router = useRouter();
const { whitelist } = inject(WALLET)!;
const PAGE_LIST = [5, 10, 15];
const perPage = ref<number>(PAGE_LIST[0]);
const pageNumber = ref<number>(0);
const searchWord = ref<string>("");
const rows = computed(() => {
  return whitelist.value
    .filter((list) => list.currency === route.query.currency)
    .filter((list) => list.address_name.search(searchWord.value) !== -1)
    .slice(
      pageNumber.value * perPage.value,
      (pageNumber.value + 1) * perPage.value
    );
});
const totalPage = computed(() => {
  return Math.floor(rows.value.length / perPage.value);
});
const selectAddress = (address: string) => {
  router.replace({
    query: {
      ...route.query,
      modal: "wallet",
      tab: "withdraw",
      address: address,
    },
  });
};

const openWalletModal = () => {
  router.replace({
    query: {
      ...route.query,
      modal: "wallet",
      tab: "withdraw",
    },
  });
};
const openAddrManageModal = () => {
  router.replace({
    query: {
      ...route.query,
      tab: "management",
    },
  });
};
</script>
<template>
  <div
    class="
      w-full
      flex
      items-center
      justify-between
      pl-5
      pt-5
      md:pl-[30px]
      md:pt-[30px]
    "
  >
    <div class="flex flex-row items-center">
      <GButton style-type="transparent" :block="false" @click="openWalletModal">
        <svg class="w-3 h-4 text-steel-color group-hover:text-white">
          <use :xlink:href="roundLeftArrowIcon"></use>
        </svg>
      </GButton>
      <svg
        class="
          w-3.5
          h-3.5
          md:w-4
          md:h-4
          text-steel-color
          group-hover:text-white
          ml-2
        "
      >
        <use :xlink:href="addressBookIcon"></use>
      </svg>
      <span class="lg:text-base text-white text-sm ml-1.5 font-semibold">
        Whitelisted Addresses
      </span>
    </div>
  </div>
  <div class="lg:px-[30px] px-[15px] w-full lg:pb-20 pb-[60px]">
    <!--Search input & Address management button-->
    <div
      class="
        flex flex-row
        justify-between
        gap-[15px]
        h-[45px]
        lg:my-5
        my-[15px]
      "
    >
      <div class="w-1/2">
        <GInput v-model="searchWord">
          <template #prefix>
            <div class="flex h-[45px] items-center pl-[15px] pr-2.5 pb-px">
              <svg class="w-4 h-4 text-steel-color">
                <use :xlink:href="searchIcon"></use>
              </svg>
            </div>
          </template>
        </GInput>
      </div>
      <div class="w-1/2">
        <GButton
          style-type="secondary"
          @click="openAddrManageModal"
          class="p-[10px]"
        >
          <span
            class="
              text-steel-color
              font-semibold
              group-hover:text-white
              lg:text-base
              text-sm
            "
          >
            Address Management
          </span>
        </GButton>
      </div>
    </div>
    <div
      class="
        flex flex-row
        justify-between
        items-center
        md:px-5
        px-3
        font-semibold
      "
      v-for="(list, index) in rows"
      :class="
        index % 2 === 0
          ? 'bg-secondary-gradient ring-[2px] ring-secondary-color rounded-lg py-[12px]'
          : 'py-[18px]'
      "
      :key="index"
    >
      <div class="flex flex-col">
        <label class="md:text-sm text-xs text-white font-semibold">{{
          list.address_name
        }}</label>
        <span
          class="
            text-xxs
            md:text-xs
            text-slate-color
            mt-1
            md:block
            hidden
            font-semibold
          "
          >{{ list.address }}</span
        >
        <span
          class="g-text-sm text-slate-color mt-1 md:hidden block font-semibold"
          >{{ list.address?.substring(0, 31) }}</span
        >
      </div>
      <GButton
        style-type="primary"
        class="select-btn sm:px-6 sm:py-[10px]"
        :block="false"
        @click="selectAddress(list.address)"
        >Select
      </GButton>
    </div>
  </div>
  <div
    class="
      md:h-[60px]
      h-12
      bg-secondary-gradient
      bottom-0
      absolute
      w-full
      rounded-b-[10px]
      flex flex-row
      items-center
      justify-between
      md:px-[30px]
      pl-[15px]
      pr-2
    "
  >
    <div class="flex flex-row items-center gap-2 font-semibold">
      <label class="text-sm hidden md:block text-slate-color">
        Show per page:
      </label>
      <label class="block md:hidden text-xs text-slate-color">
        Per page:
      </label>
      <PagePopover v-model="perPage" :list="PAGE_LIST" />
    </div>
    <GPagination :total="totalPage" v-model="pageNumber" />
  </div>
</template>
