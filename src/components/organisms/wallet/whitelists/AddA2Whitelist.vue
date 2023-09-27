<script setup lang="ts">
import {
  GButton,
  GInput,
  notify,
  GInputMessage,
  GModal,
} from "~/components/atoms";
import GVerifyInput from "~/components/atoms/inputs/GVerifyInput.vue";
import { useMutation } from "@vue/apollo-composable";
import { useVuelidate } from "@vuelidate/core";
import FullCurrenciesPopover from "~/components/organisms/wallet/popovers/FullCurrenciesPopover.vue";
import { ADD_TO_WHTIELIST_MUTATION, EMAIL_TWO_FA_MUTATION } from "~/graphql";
import {
  roundLeftArrowIcon,
  addressBookIcon,
  safeguardIcon,
  confirmCodeNotifyIcon,
  addAddressNotifyIcon,
  walletIcon,
  incorrectNotifyIcon,
} from "~/icons";
import { required, maxLength, minLength } from "@vuelidate/validators";
import { AUTH, ERRORS, THEME } from "~/constants";

const { me, refetch } = inject(AUTH)!;
const { screen } = inject(THEME)!;
const currency = ref<string>("BTC");
const addressName = ref<string>("");
const address = ref<string>("");
const route = useRoute();
const router = useRouter();
const addressError = ref<string>("");
const verifyCode = ref<string>("");

const valid = (address: string, currency: string) => {
  return WAValidator.validate(address, currency, "both");
};

const { mutate, loading, onDone, onError, error } = useMutation(
  ADD_TO_WHTIELIST_MUTATION
);
const rule = {
  addressName: { required, maxLength: maxLength(15) },
  address: { required },
  verifyCode: { required, minLength: minLength(6), maxLength: maxLength(6) },
};
const v$ = useVuelidate(rule, { addressName, address, verifyCode });
const isConfirmOpen = ref<boolean>(false);

const {
  mutate: emailTwoFaMutate,
  onDone: onEmailTwoFaDone,
  onError: onEmailTwoFaError,
  error: emailTwoFaError,
  loading: emailTwoFaLoading,
} = useMutation(EMAIL_TWO_FA_MUTATION);
const onSubmit = async () => {
  if (me.value?.enable2fa && !(await v$.value.$validate())) return;
  if (!valid(address.value, currency.value)) {
    addressError.value = "Invalid address";
    return;
  }
  if (me.value?.id !== undefined) {
    if (!(await v$.value.addressName.$validate())) return;
    if (me.value.enable2fa) {
      await mutate({
        userId: Number(me.value?.id),
        addressName: addressName.value,
        address: address.value,
        currency: currency.value,
        code: verifyCode.value,
      });
    } else {
      emailTwoFaMutate({
        userId: Number(me?.value.id),
        action: "whitelistConfirmation",
      });
    }
  }
};
const onAddToWhitelist = async () => {
  if (!(await v$.value.verifyCode.$validate())) return;
  if (me.value?.id !== undefined) {
    await mutate({
      userId: Number(me.value?.id),
      addressName: addressName.value,
      address: address.value,
      currency: currency.value,
      code: verifyCode.value,
    });
  }
};
onDone(async ({ data }) => {
  refetch();
  notify.success({
    title: data.addToWhitelist.title,
    text: data.addToWhitelist.description,
    icon: {
      href: addAddressNotifyIcon,
      class: "w-10 h-[45px]",
    },
  });
  address.value = "";
  addressName.value = "";
  v$.value.$reset();
  router.replace({
    query: {
      ...route.query,
      tab: "management",
    },
  });
});
onError(() => {
  if (error.value?.message) {
    if (
      error.value.message ===
      `The 2FA code you entered doesn't match. Please try again.`
    ) {
      notify.error({
        title: "Incorrect 2FA Code",
        text: `The 2FA code you entered doesn't match. Please try again.`,
        icon: {
          href: incorrectNotifyIcon,
          class: "w-10 h-[38px]",
        },
      });
    } else {
      isConfirmOpen.value = false;
      addressError.value = error.value.message;
    }
  } else {
    isConfirmOpen.value = false;

    notify.error({ title: "Error", text: "Something went wrong" }, 4000);
  }
});
const inputAddressName = async () => {
  await v$.value.addressName.$validate();
};
const inputAddress = async () => {
  addressError.value = "";
};
onEmailTwoFaDone(async () => {
  notify.success({
    title: "Confirmation Email Sent",
    text: "Address whitelist pending. Check your email for a 6-digit code to confirm.",
    icon: {
      href: confirmCodeNotifyIcon,
      class: "w-10 h-[41px]",
    },
  });
  isConfirmOpen.value = true;
});
onEmailTwoFaError(() => {
  notify.error(
    {
      title: "Error",
      text: emailTwoFaError.value?.message || "Something went wrong",
    },
    4000
  );
});
const openAddrManageModal = () => {
  router.replace({
    query: {
      ...route.query,
      tab: "management",
    },
  });
};
const openEnable2faModal = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      modal: "enable2fa",
    },
  });
};
const updateVerifyCode = async (code: string) => {
  verifyCode.value = code;
  await v$.value.verifyCode.$validate();
};
</script>
<template>
  <div class="p-5 md:p-[30px] font-semibold">
    <div class="w-full flex items-center">
      <GButton
        style-type="transparent"
        :block="false"
        @click="openAddrManageModal"
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
      <span class="md:text-base text-white text-sm ml-1.5">
        Add Withdrawal Address to Whitelist
      </span>
    </div>
    <div class="mt-5 md:mt-[30px]">
      <form @submit.prevent="onSubmit">
        <div class="g-form-item w-full">
          <label class="g-label block md:mb-3 mb-2 font-semibold">
            Select Cryptocurrency
          </label>
          <FullCurrenciesPopover v-model="currency" />
        </div>
        <div class="g-form-item">
          <label class="g-label block md:mb-3 mb-2 font-semibold">
            Wallet Name
          </label>
          <GInput
            v-model="addressName"
            @update:model-value="inputAddressName"
          />
          <GInputMessage v-if="v$.addressName.$error">{{
            v$.addressName.maxLength.$invalid
              ? ERRORS.WHITELIST_ADDRESS_NAME_MAX_LENGTH
              : ERRORS.WHITELIST_ADDRESS_NAME_REQUIRED
          }}</GInputMessage>
        </div>
        <div class="g-form-item">
          <label class="g-label block md:mb-3 mb-2 font-semibold">
            Address
          </label>
          <GInput v-model="address" @update:model-value="inputAddress" />
          <GInputMessage v-if="v$.address.$error || !!addressError">{{
            !!addressError ? addressError : ERRORS.WHITELIST_ADDRESS_REQUIRED
          }}</GInputMessage>
        </div>
        <div class="g-form-item" v-if="me?.enable2fa">
          <div
            class="
              text-steel-color
              g-text-base
              mb-2
              md:mb-3
              font-semibold
              text-center
            "
          >
            Two Factor Code
          </div>
          <div class="flex items-center flex-col">
            <div class="flex gap-2.5 md:gap-[15px]">
              <GVerifyInput
                :width="screen.md ? '45px' : '40px'"
                @update:code="updateVerifyCode"
              />
            </div>
            <GInputMessage v-if="v$.verifyCode.$error">{{
              ERRORS.INVALID_2FA_CODE
            }}</GInputMessage>
          </div>
        </div>
        <GButton
          style-type="primary"
          :loading="loading || emailTwoFaLoading"
          :disabled="loading || emailTwoFaLoading"
        >
          Add Address
        </GButton>
      </form>
    </div>
    <div class="mt-5 md:mt-[30px]" v-if="!me?.enable2fa">
      <GButton
        style-type="secondary"
        @click="openEnable2faModal"
        class="px-4 text-steel-color"
        type="button"
      >
        <div
          class="
            flex flex-row
            items-center
            justify-center
            gap-2.5
            text-steel-color
            group-hover:text-white
          "
        >
          <svg class="w-[22px] h-[23px]">
            <use :xlink:href="safeguardIcon"></use>
          </svg>
          <span> Enable 2FA </span>
        </div>
      </GButton>
    </div>

    <GModal v-model="isConfirmOpen" width="412px">
      <div class="p-5 font-semibold">
        <div class="flex gap-2 items-center g-mb-md">
          <svg class="w-[18px] h-[18px] text-steel-color">
            <use :xlink:href="walletIcon"></use>
          </svg>
          <span class="text-white g-text-base">Whitelist Confirmation</span>
        </div>
        <p class="g-text-sm text-steel-color g-mb-md">
          Please enter the 6-digit code sent to your email within 15 minutes to
          confirm your withdrawal.
        </p>
        <form @submit.prevent="onAddToWhitelist">
          <div
            class="
              text-steel-color
              g-text-base
              mb-2
              md:mb-3
              font-semibold
              text-center
            "
          >
            Two Factor Code
          </div>
          <div class="flex items-center flex-col g-mb-md">
            <div class="flex gap-2.5 md:gap-[15px]">
              <GVerifyInput
                :width="screen.md ? '45px' : '40px'"
                @update:code="updateVerifyCode"
              />
            </div>
            <GInputMessage v-if="v$.verifyCode.$error">{{
              ERRORS.INVALID_2FA_CODE
            }}</GInputMessage>
          </div>
          <GButton :loading="loading">Confirm</GButton>
        </form>
      </div>
    </GModal>
  </div>
</template>
