<script setup lang="ts">
import { chatMuteIcon } from "@/icons";
import {
  GInput,
  GButton,
  GPopover,
  GDropdownArrow,
  GInputNumber,
  GInputMessage,
} from "~/components/atoms";
import { TOGGLE_CHAT_TIMEOUT_USER_MUTATION } from "@/graphql";
import ListingSelect from "~/components/molecules/selects/ListingSelect.vue";
import { CHAT } from "./constants";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";

const { muteConfirmationVisible } = inject(CHAT)!;
const form = reactive({
  username: "",
  reason: "",
  muteLength: 1,
  unit: 1,
});
const rules = {
  username: { required },
  reason: { required },
  muteLength: { required, min: minValue(1) },
  unit: { required },
};
const v$ = useVuelidate(rules, form);

const { mutate, loading, onError } = useMutation(
  TOGGLE_CHAT_TIMEOUT_USER_MUTATION
);

const reasons = [
  { id: 1, text: "Sending racist or ethically charged messages" },
  {
    id: 2,
    text: "Calling/Accusing Gamba of being a scam or rigged without any evidence",
  },
  { id: 3, text: "Repeated message spam" },
  { id: 4, text: "Self Promotion" },
  {
    id: 5,
    text: "Threatening/encouraging violence towards other community members or staff",
  },
  {
    id: 6,
    text: "Attempting to scam or take communication with community members outside of the platform",
  },
  {
    id: 7,
    text: "Attempting to advertise/sell/buy/trade any services and/or items",
  },
];
const unitOptions = [
  {
    value: 1,
    label: "Min",
  },
  {
    value: 60,
    label: "Hour",
  },
  {
    value: 60 * 24,
    label: "Day",
  },
  {
    value: 60 * 24 * 7,
    label: "Week",
  },
];
const onSubmit = async () => {
  if (!(await v$.value.$validate())) return;

  mutate({
    input: {
      user_id: 1,
      timeout_reason: form.reason,
      timeout_minutes: form.muteLength * form.unit,
    },
  });
};
</script>
<template>
  <div class="MuteConfirmation">
    <div class="flex items-center mb-[30px]">
      <svg class="w-4 h-4 text-error" style="margin-right: 5px">
        <use :xlink:href="chatMuteIcon"></use>
      </svg>
      <h4 class="text-white">Mute Confirmation</h4>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="g-form-item">
        <label class="block g-label mb-2.5">Username</label>
        <GInput
          v-model="form.username"
          :status="v$.username.$error ? 'error' : 'normal'"
        />
        <GInputMessage v-if="v$.username.$error"
          >Username is invalid</GInputMessage
        >
      </div>
      <div class="g-form-item">
        <label class="block g-label mb-2.5">Mute Reason</label>
        <div class="relative">
          <textarea
            class="g-textarea block w-full pr-10"
            :class="{ '!border-error': v$.reason.$error }"
            v-model="form.reason"
            rows="2"
            placeholder="Please provide a reason for the ban, or choose from the preset options available below."
          />
          <GInputMessage v-if="v$.reason.$error"
            >Reason is required</GInputMessage
          >
          <div class="absolute top-0 right-0">
            <GPopover placement="bottomRight">
              <template #trigger="{ open }">
                <GButton
                  style-type="secondary"
                  class="w-10 md:w-[45px] !px-0"
                  type="button"
                >
                  <GDropdownArrow :open="open" />
                </GButton>
              </template>
              <template #panel="{ close }">
                <div class="" style="max-width: 397px">
                  <ul class="list-decimal list-outside pl-7 marker:text-white">
                    <li
                      v-for="reason in reasons"
                      :key="reason.id"
                      class="py-2 cursor-pointer group px-[17px] hover:bg-ash"
                      @click="
                        form.reason = reason.text;
                        close();
                      "
                    >
                      {{ reason.text }}
                    </li>
                  </ul>
                </div>
              </template>
            </GPopover>
          </div>
        </div>
      </div>
      <div class="g-form-item">
        <label class="g-label mb-2.5">Mute Length</label>
        <GInputNumber
          v-model="form.muteLength"
          :status="v$.muteLength.$error ? 'error' : 'normal'"
        >
          <template #suffix>
            <ListingSelect
              style="min-width: 87px"
              v-model="form.unit"
              :options="unitOptions"
            />
          </template>
        </GInputNumber>
        <GInputMessage v-if="v$.muteLength.$error"
          >Mute length is invalid</GInputMessage
        >
      </div>
      <div class="flex gap-[15px]">
        <GButton style-type="danger" :loading="loading">Confirm</GButton>
        <GButton style-type="secondary" @click="muteConfirmationVisible = false"
          >Cancel</GButton
        >
      </div>
    </form>
  </div>
</template>
