<script setup lang="ts">
import { GButton, GModal, notify } from "~/components/atoms";
import { GPagination } from "~/components/atoms";
import PagePopover from "~/components/molecules/popovers/PagePopover.vue";
import Currencies from "~/components/organisms/wallet/popovers/Currencies.vue";
import WhitelistAddressTable from "./WhitelistAddressTable.vue";
import {
  roundLeftArrowIcon,
  addAddressIcon,
  addressBookIcon,
  deleteIcon,
  removeAddressNotifyIcon,
} from "~/icons";
import { AUTH, WALLET } from "~/constants";
import { useMutation } from "@vue/apollo-composable";
import { REMOVE_FROM_WHITELIST_MUTATION } from "~/graphql";

const { mutate, loading, onError, onDone, error } = useMutation(
  REMOVE_FROM_WHITELIST_MUTATION
);

const { me, refetch } = inject(AUTH)!;
const { whitelist } = inject(WALLET)!;
const isConfirmModalOpen = ref<boolean>(false);
const address = ref<string>("");
const PAGE_LIST = [5, 10, 15];
const perPage = ref<number>(PAGE_LIST[0]);
const pageNumber = ref<number>(0);
const currency = ref<string>("ALL");
const router = useRouter();
const route = useRoute();
const totalPage = computed(() => {
  return Math.floor(whitelist.value.length / perPage.value);
});
watch(
  () => perPage.value,
  (newValue) => {
    pageNumber.value = 0;
  }
);
const openConfirmModal = (value: string) => {
  isConfirmModalOpen.value = true;
  address.value = value;
};
const onDelete = () => {
  mutate({
    userId: Number(me.value?.id),
    address: address.value,
  });
};
onDone(async ({ data }) => {
  notify.success({
    title: data.removeFromWhitelist.title,
    text: data.removeFromWhitelist.description,
    icon: {
      href: removeAddressNotifyIcon,
      class: "w-10 h-[52px]",
    },
  });
  refetch();
  isConfirmModalOpen.value = false;
});
onError(() => {
  notify.error(
    { title: "Error", text: error.value?.message || "Something went wrong" },
    4000
  );
});
const openWhitelistModal = () => {
  router.replace({
    query: {
      ...route.query,
      tab: "whitelist",
    },
  });
};
const openAddAddressModal = () => {
  router.replace({
    query: {
      ...route.query,
      tab: "add",
    },
  });
};
</script>
<template>
  <div class="md:pb-[60px] pb-12">
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
        <GButton
          style-type="transparent"
          :block="false"
          @click="openWhitelistModal"
        >
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

        <span class="md:text-base text-white text-sm ml-1.5 font-semibold">
          Address Book Management
        </span>
      </div>
    </div>
    <div class="md:px-[30px] md:mt-[30px] mt-5 w-full px-5">
      <GButton style-type="secondary" @click="openAddAddressModal">
        <div
          class="
            flex flex-row
            justify-center
            items-center
            gap-2.5
            text-steel-color
            group-hover:text-white
          "
        >
          <svg class="md:w-5 md:h-6 w-4 h-[18px]">
            <use :xlink:href="addAddressIcon"></use>
          </svg>
          <span>Add Withdrawal Address to Whitelist</span>
        </div>
      </GButton>
    </div>
    <div class="mt-5 md:mt-[30px] mb-5">
      <WhitelistAddressTable
        @delete:address="openConfirmModal"
        :per-page="perPage"
        :page-number="pageNumber"
        :currency="currency"
      />
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
        <label class="md:text-sm text-xs text-slate-color"> Currencies: </label>
        <Currencies v-model="currency" />
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
    <GModal v-model="isConfirmModalOpen" width="412px">
      <div class="p-5">
        <div class="flex gap-1 items-center">
          <svg class="w-3.5 md:w-4 h-4 text-steel-color">
            <use :xlink:href="deleteIcon"></use>
          </svg>
          <span class="text-white font-semibold text-sm md:text-base"
            >Confirm Address Deletion</span
          >
        </div>
        <div
          class="
            text-center
            my-5
            text-xs
            md:text-sm
            text-steel-color
            font-semibold
          "
        >
          Are you sure you want to delete {{ address }} from your Address Book?
        </div>
        <div class="flex gap-5">
          <GButton style-type="danger" @click="onDelete" :loading="loading"
            >Delete</GButton
          >
          <GButton style-type="secondary" @click="isConfirmModalOpen = false"
            >Cancel</GButton
          >
        </div>
      </div>
    </GModal>
  </div>
</template>
