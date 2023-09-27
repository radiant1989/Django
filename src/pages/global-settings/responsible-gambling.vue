<script setup lang="ts">
import {
  GButton,
  GInputMessage,
  GInputNumber,
  GModal,
} from "@/components/atoms";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import ListingSelect from "~/components/molecules/selects/ListingSelect.vue";

const form = reactive({
  timeUnit: 60,
  selfExclusion: "",
});
const modalVisible = ref(false);

const timeUnits = [
  {
    label: "Minutes",
    value: 60,
  },
  {
    label: "Hours",
    value: 60 * 60,
  },
  {
    label: "Days",
    value: 24 * 60 * 60,
  },
  {
    label: "Weeks",
    value: 7 * 24 * 60 * 60,
  },
  {
    label: "Months",
    value: 30 * 24 * 60 * 60,
  },
];
const rules = {
  selfExclusion: { required },
};
const v$ = useVuelidate(rules, form);
const onSubmit = async () => {
  if (!(await v$.value.$validate())) return;

  modalVisible.value = true;
};
</script>
<template>
  <div class="GlobalSettings-ResponsibleGambling">
    <h4 class="mb-5 text-white text-sm md:text-base">Responsible Gambling</h4>
    <p class="g-mb-md">
      Need a break from Gamba.com? You can choose to self-exclude yourself from
      your account for a self-determined period of time. It's important to note
      that self-exclusion is irreversible, and your account will remain locked
      until the designated period of time expires. We recommend exercising
      caution and careful consideration before opting for self-exclusion. You
      will receive an email notification once the self-exclusion period has
      ended.
    </p>
    <form @submit.prevent="onSubmit">
      <label class="g-label block mb-[15px]">Self Exclusion</label>
      <div class="lg:flex gap-8">
        <div class="md:w-[465px] mb-5 lg:mb-0">
          <GInputNumber
            v-model="form.selfExclusion"
            :status="v$.selfExclusion.$error ? 'error' : 'normal'"
          >
            <template #suffix>
              <div
                class="h-full w-[152px] flex flex-col justify-center relative"
              >
                <!-- to hide out-bordering when input focus -->
                <div
                  class="absolute inset-[-1px] left-2 bg-ebony-clay-color"
                ></div>
                <ListingSelect :options="timeUnits" v-model="form.timeUnit" />
              </div>
            </template>
          </GInputNumber>
          <GInputMessage v-if="v$.selfExclusion.$error"
            >Please enter valid number</GInputMessage
          >
        </div>
        <div class="flex-none">
          <GButton class="min-w-button" :disabled="v$.selfExclusion.$error">Confirm</GButton>
        </div>
      </div>
    </form>
    <GModal v-model="modalVisible" width="525px">
      <div class="p-5 md:p-[30px] font-medium">
        <h4 class="text-sm md:text-base text-white g-mb-md">
          Confirm Self-Exclusion
        </h4>
        <p class="text-xs md:text-sm g-mb-md whitespace-pre-line">
          Are you sure you want to proceed with self-exclusion?<br /><br />
          By confirming, you understand that self-exclusion is an irreversible
          action and your account will remain locked for the duration you have
          chosen. You will not be able to access your account or participate in
          any activities on Gamba.com during this period.<br /><br />
          Please consider this decision carefully before proceeding. If you are
          certain, click 'Confirm' to proceed with self-exclusion. If you have
          any concerns or questions, please contact our support team for
          assistance.
        </p>
        <div class="g-mb-md">
          <GInputNumber
            v-model="form.selfExclusion"
            :status="v$.selfExclusion.$error ? 'error' : 'normal'"
          >
            <template #suffix>
              <div
                class="h-full w-[152px] flex flex-col justify-center relative"
              >
                <!-- to hide out-bordering when input focus -->
                <div
                  class="absolute inset-[-1px] left-2 bg-ebony-clay-color"
                ></div>
                <ListingSelect :options="timeUnits" v-model="form.timeUnit" />
              </div>
            </template>
          </GInputNumber>
          <GInputMessage v-if="v$.selfExclusion.$error"
            >Please enter valid number</GInputMessage
          >
        </div>
        <GButton @click="modalVisible = false" :disabled="v$.selfExclusion.$error">Confirm</GButton>
      </div>
    </GModal>
  </div>
</template>
