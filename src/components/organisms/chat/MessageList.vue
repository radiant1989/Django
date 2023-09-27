<script setup lang="ts">
import ChatMessage from "./ChatMessage.vue";
import { GScrollbar } from "~/components/atoms";
import { CHAT_MESSAGES_QUERY, CHAT_MESSAGE_SENT_SUBSCRIPTION } from "@/graphql";
import type { ChatMessage as ChatMessageType, User } from "~/types";
import { CHAT } from "./constants";
import { downArrowIcon, pauseIcon } from "@/icons";

const scrollRef = ref();
const { chatRoomId, isScrolledUp, isMessagesLoaded } = inject(CHAT)!;
const newMessageCount = ref<number>(0);
const { loading, result, subscribeToMore } = useQuery<{
  getLastChatMessagesByChatRoom: ChatMessageType[];
}>(
  CHAT_MESSAGES_QUERY,
  {
    chat_room_id: chatRoomId,
    limit: 20,
  },
  {
    notifyOnNetworkStatusChange: true,
  }
);

const chatMessages = computed(
  () => result.value?.getLastChatMessagesByChatRoom.messageList || []
);

const scrollToBottom = (smooth = false) => {
  const scrollElement = scrollRef.value?.el;
  if (scrollElement) {
    scrollElement.scrollTo({
      left: 0,
      top: scrollElement.scrollHeight,
      behavior: smooth ? "smooth" : "instant",
    });
  }
};
const onScroll = (e) => {
  const scrollElement = e.target! as HTMLDivElement;
  if (
    scrollElement.scrollTop + scrollElement.clientHeight + 100 >
    scrollElement.scrollHeight
  ) {
    isScrolledUp.value = false;
  } else {
    isScrolledUp.value = true;
  }
};

const getChatMessageFromDetails = (
  chatMessage: ChatMessageType
): ChatMessageType => ({
  id: chatMessage.id || chatMessage.msg_user_identifier,
  created_at: chatMessage.created_at,
  message: chatMessage.message,
  msg_user_identifier: chatMessage.msg_user_identifier,
  __typename: "ChatMessage", // TODO: should resolved from backend
  reply_to: chatMessage.reply_to
    ? getChatMessageFromDetails(chatMessage.reply_to as ChatMessageType)
    : null,
  user: {
    id: chatMessage.user.id,
    username: chatMessage.user.username,
    avatar: chatMessage.user.avatar,
    __typename: "User", // TODO: should resolved from backend
  } as User,
});
watch(
  () => chatMessages.value,
  () => {
    nextTick(() => {
      if (!isScrolledUp.value) {
        scrollToBottom();
      }
    });
  },
  { immediate: true }
);
watch(
  () => isScrolledUp.value,
  (isScrolledUpValue) => {
    if (!isScrolledUpValue) {
      newMessageCount.value = 0;
    }
  }
);
watch(
  () => loading.value,
  (isLoading) => {
    if (!isLoading) {
      nextTick(() => {
        isMessagesLoaded.value = true;
      });
    } else {
      isMessagesLoaded.value = false;
    }
  },
  { immediate: true }
);
onMounted(() => {
  subscribeToMore({
    document: CHAT_MESSAGE_SENT_SUBSCRIPTION,
    variables: {
      chatRoomId,
    },
    updateQuery(prev, { subscriptionData }) {
      if (!subscriptionData.data?.chatMessageSent) return prev;
      if (isScrolledUp.value) {
        newMessageCount.value++;
      }
      return {
        getLastChatMessagesByChatRoom: {
          ...prev.getLastChatMessagesByChatRoom,
          messageList: [
            ...prev.getLastChatMessagesByChatRoom.messageList,
            getChatMessageFromDetails(subscriptionData.data.chatMessageSent),
          ],
        },
      };
    },
  });
});
</script>
<template>
  <div class="h-full relative">
    <GScrollbar
      class="ChatMessageList h-full p-4"
      height="100%"
      style-type="content"
      ref="scrollRef"
      @scroll="onScroll"
    >
      <div
        class="flex flex-col justify-end min-h-full gap-5 md:gap-[15px]"
        @touchmove.stop
      >
        <ChatMessage
          v-for="chatMessage in chatMessages"
          :key="chatMessage.id"
          :chat-message="chatMessage"
        />
      </div>
    </GScrollbar>
    <div
      v-if="isScrolledUp"
      class="absolute left-1/2 -translate-x-1/2"
      style="width: 240px; bottom: 30px"
      @click="scrollToBottom(true)"
    >
      <div
        class="
          group
          cursor-pointer
          text-white
          bg-black-russian-color
          rounded-lg
          border-2 border-secondary-color
          shadow-secondary-box
          font-medium
          text-sm
        "
        style=""
      >
        <div
          class="
            group-hover:hidden
            flex
            items-center
            justify-center
            gap-2.5
            h-10
          "
        >
          <svg class="text-white" style="width: 14px; height: 18px">
            <use :xlink:href="pauseIcon"></use>
          </svg>
          <div class="flex-none">Chat paused due to scroll</div>
        </div>
        <div
          class="
            hidden
            group-hover:flex
            items-center
            justify-center
            gap-2.5
            h-10
          "
        >
          <svg class="text-white" style="width: 16px; height: 18px">
            <use :xlink:href="downArrowIcon"></use>
          </svg>
          <div v-if="newMessageCount" class="flex-none">
            {{ newMessageCount }} + new messages
          </div>
          <div v-else class="flex-none">Scroll to latest messages</div>
        </div>
      </div>
    </div>
  </div>
</template>
