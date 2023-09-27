<script setup lang="ts">
import { GButton, GCloseButton } from "~/components/atoms";
import MessageList from "./MessageList.vue";
import SendMessageForm from "./SendMessageForm.vue";
import LanguageSelect from "./LanguageSelect.vue";
import RainModal from "~/components/molecules/modals/RainModal.vue";
import RuleModal from "~/components/molecules/modals/RuleModal.vue";
import { rulesIcon, rainIcon, gifIcon } from "~/icons";
import { DEFAULT_CHAT_TEXT_LIMIT_LENGTH } from "~/constants/mock_data";
import { RIGHTBAR_STATE } from "~/constants";
import { CHAT } from "./constants";
import ChatUserSelect from "./ChatUserSelect.vue";
import ReplyingTo from "./ReplyingTo.vue";
import ChatGifSelect from "./ChatGifSelect.vue";

const { chatRoomId, chatRooms, userRefOnInput, replyingTo, showGifSelect } = inject(CHAT)!;

const isRainModalOpen = ref<boolean>(false);
const isRulesModalOpen = ref<boolean>(false);
const chatLimitLength = ref<number>(DEFAULT_CHAT_TEXT_LIMIT_LENGTH);

const { closeRightBar } = inject(RIGHTBAR_STATE)!;

const onShowRainModal = () => {
  isRainModalOpen.value = true;
};
const onShowRulesModal = () => {
  isRulesModalOpen.value = true;
};
const onCloseRainModal = () => {
  isRainModalOpen.value = false;
};
const onCloseRulesModal = () => {
  isRulesModalOpen.value = false;
};
const onChatTextareaChange = (value: string) => {
  chatLimitLength.value = DEFAULT_CHAT_TEXT_LIMIT_LENGTH - value.length;
};
</script>
<template>
  <div class="ChatBar">
    <div class="w-full h-full flex flex-col">
      <div class="sticky top-0">
        <div
          class="
            flex
            items-center
            justify-between
            pl-5
            py-4
            lg:h-[90px]
            md:h-[79px]
            bg-black-russian-color
          "
        >
          <div class="flex gap-[15px] items-center">
            <span class="font-medium text-white text-lg">Chat</span>
            <LanguageSelect :options="chatRooms" v-model="chatRoomId" />
          </div>
        </div>
      </div>
      <div class="flex-1 min-h-0">
        <MessageList />
      </div>
      <div class="flex-none relative">
        <div class="bg-black-russian-color p-5 flex flex-col gap-3">
          <SendMessageForm @updated:modelValue="onChatTextareaChange" />
          <div class="flex items-center justify-between">
            <div class="flex gap-3">
              <GButton
                style-type="transparent"
                :block="false"
                @click="onShowRulesModal"
              >
                <svg class="w-4 h-3.5">
                  <use :xlink:href="rulesIcon"></use>
                </svg>
              </GButton>
              <GButton
                style-type="transparent"
                :block="false"
                @click="onShowRainModal"
              >
                <svg class="w-3 h-4">
                  <use :xlink:href="rainIcon"></use>
                </svg>
              </GButton>
              <GButton style-type="transparent" :block="false" @click="showGifSelect = !showGifSelect">
                <svg class="w-[13px] h-4">
                  <use :xlink:href="gifIcon"></use>
                </svg>
              </GButton>
            </div>
            <div
              class="
                bg-clip-text bg-danger-gradient
                font-medium
                text-sm
                inline-block
                scale-100
                focus:scale-95
              "
              :style="{ color: 'transparent' }"
              v-if="chatLimitLength < 0"
            >
              {{ chatLimitLength }}
            </div>
            <div class="text-sm font-medium text-slate-color" v-else>
              {{ chatLimitLength }}
            </div>
          </div>
        </div>
        <div v-if="replyingTo" class="absolute bottom-full inset-x-0">
          <div
            class="
              pt-2
              px-3
              pb-2.5
              bg-secondary-gradient
              rounded-t-lg
              border-t border-secondary-color
              shadow-secondary-box
              overflow-hidden
            "
          >
            <ReplyingTo />
          </div>
        </div>
        <div
          v-if="userRefOnInput.present"
          class="absolute bottom-full inset-x-0"
        >
          <ChatUserSelect :keyword="userRefOnInput.keyword" />
        </div>
        <div
          v-if="showGifSelect"
          class="absolute bottom-full inset-x-0"
        >
          <ChatGifSelect />
        </div>
      </div>
    </div>
    <div class="absolute top-10 right-5 hidden lxl:block">
      <GCloseButton @click="closeRightBar" />
    </div>
    <RainModal
      :is-visible="isRainModalOpen"
      @closed:rainmodal="onCloseRainModal"
    />
    <RuleModal
      :is-visible="isRulesModalOpen"
      @closed:rulemodal="onCloseRulesModal"
    />
  </div>
</template>
