<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable";

import { RadioGroup, RadioGroupOption } from "@headlessui/vue";
import { GButton, notify } from "~/components/atoms";
import {
  draggableIcon,
  SolIcon,
  MaticIcon,
  settingsIcon,
  notifySettingsIcon,
} from "~/icons";
import { currencyItems, cryptoCurrencies, AUTH, PREFERENCE } from "~/constants";
import { SAVE_USER_PREFERENCES_MUTATION } from "~/graphql";

const router = useRouter();
const { refetch } = inject(AUTH)!;
const { preferences } = inject(PREFERENCE)!;
const draggable = defineAsyncComponent({
  loader: () => import("vuedraggable"),
});
const { mutate, onDone, onError, error, loading } = useMutation(
  SAVE_USER_PREFERENCES_MUTATION
);
const currency = ref<string>(preferences?.value?.activeFiatCode || "USD");
const orderedCryptoCodes = ref<string[]>(
  preferences?.value?.orderedCryptoCodes || []
);
const onSave = () => {
  mutate({
    ...preferences.value,
    activeFiatCode: currency.value,
    orderedCryptoCodes: orderedCryptoCodes.value,
  });
};
onDone(() => {
  notify.success({
    title: "Wallet Settings Updated",
    text: "Your changes have been successfully saved.",
    icon: {
      class: "w-10 h-[31px]",
      href: notifySettingsIcon,
    },
  });
  refetch();
  router.push({
    path: router.currentRoute.value.path,
  });
});
onError(() => {
  console.log(error.value);
  notify.error(
    {
      title: "Error",
      text: error.value?.message || "Something went wrong",
    },
    4000
  );
});
</script>
<template>
  <div class="p-5 font-semibold">
    <div class="flex gap-2 items-center g-mb-md">
      <svg class="w-[18px] h-[18px] text-steel-color">
        <use :xlink:href="settingsIcon"></use>
      </svg>
      <span class="text-white g-text-base"> Wallet Settings </span>
    </div>
    <div class="flex flex-col-reverse md:flex-row gap-[30px]">
      <div
        class="
          bg-secondary-gradient
          border-secondary-color
          px-3
          py-2.5
          border-2
          rounded-lg
        "
      >
        <ClientOnly>
          <draggable
            v-model="orderedCryptoCodes"
            item-key="id"
            :animation="250"
            ghostClass="ghost"
          >
            <template #item="{ element }">
              <button
                class="
                  group
                  py-2
                  md:px-2
                  block
                  w-full
                  text-left
                  active:cursor-grabbing
                "
              >
                <div class="flex items-center gap-x-2">
                  <div class="flex-none mouse:group-hover:text-white">
                    <svg class="w-1.5 h-[5px]">
                      <use :xlink:href="draggableIcon"></use>
                    </svg>
                  </div>
                  <div class="flex-none">
                    <SolIcon v-if="element === 'SOL'" />
                    <MaticIcon v-else-if="element === 'MATIC'" />
                    <svg
                      class="
                        w-[14px]
                        h-[14px]
                        md:w-4
                        md:h-4
                        mouse:group-hover:text-white
                      "
                      v-else
                    >
                      <use :xlink:href="cryptoCurrencies[element].icon"></use>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-white">{{ element }}</div>
                  </div>
                </div>
              </button>
            </template>
          </draggable>
        </ClientOnly>
      </div>
      <div class="flex flex-col justify-between">
        <div class="mb-5 md:mb-0">
          <div class="g-text-base text-white mb-[15px]">Fiat Display</div>
          <p class="g-text-base mb-5 text-steel-color">
            Choose the currency displayed when 'View in Fiat' is active. Please
            note, the values displayed are approximate conversions.
          </p>
          <RadioGroup v-model="currency">
            <div class="grid grid-cols-3 gap-5 md:gap-[30px]">
              <RadioGroupOption
                v-slot="{ checked }"
                v-for="(currencyItem, key) in currencyItems"
                :value="key"
              >
                <div class="flex cursor-pointer w-[86px] justify-between">
                  <div class="flex gap-2">
                    <div
                      class="
                        rounded-full
                        flex
                        items-center
                        justify-center
                        w-5
                        h-5
                        border-2 border-secondary-color
                      "
                      :class="
                        checked
                          ? 'bg-primary-gradient  shadow-radio-box border-primary-color'
                          : ' bg-dark-color shadow-dark-box'
                      "
                    ></div>
                    <span class="g-text-base text-white">{{ key }}</span>
                  </div>
                  <svg class="w-[14px] h-[14px] md:w-4 md:h-4">
                    <use :xlink:href="currencyItem.icon"></use>
                  </svg>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
        </div>
        <GButton @click="onSave" :loading="loading">Save</GButton>
      </div>
    </div>
  </div>
</template>
