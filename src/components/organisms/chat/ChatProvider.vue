<script setup lang="ts">
import ChatBar from "./ChatBar.vue";
import Icons from "./Icons.vue";
import {
  CHAT_ROOMS_QUERY,
  CHAT_ROOM_USER_SEARCH_QUERY,
  CHAT_MESSAGE_GIF_SEARCH_QUERY,
  CHAT_MESSAGE_GIF_AUTOCOMPLETE_QUERY,
  CHAT_MESSAGE_GIF_POSTS_QUERY,
} from "~/graphql";
import { GModal } from "@/components/atoms";
import MuteConfirmation from "./MuteConfirmation.vue";
import { ChatRoom, ChatRoomUser, ChatMessage } from "~/types";
import { AUTH } from "~/constants";
import { CHAT } from "./constants";

const { me } = inject(AUTH)!;
const isScrolledUp = ref<boolean>(false);
const chatRoomId = ref<number>(0);
const input = ref<string>("");
const muteConfirmationVisible = ref<boolean>(false);
const isModerator = computed(
  () =>
    !!me.value?.roles.some((role) =>
      ["superadmin", "admin", "developer", "moderator"].includes(role.name)
    )
);
const userRefOnInput = computed<{
  present: boolean;
  keyword: string;
}>(() => {
  const regex = /@(?<keyword>[^@\s\r]*)$/;
  const matches = input.value.match(regex);
  if (matches) {
    return {
      keyword: matches.groups?.keyword!,
      present: true,
    };
  }
  return {
    keyword: "",
    present: false,
  };
});
const replyingTo = ref<ChatMessage | null>(null);
const showGifSelect = ref<boolean>(false);

const { loading: chatRoomsLoading, result: chatRoomResult } =
  useQuery<{ chatRooms: ChatRoom[] }>(CHAT_ROOMS_QUERY);
const chatRooms = computed(
  () =>
    chatRoomResult.value?.chatRooms.map((r) => ({ ...r, id: Number(r.id) })) ||
    []
);
// TODO: needs to call after chatRoomId is resolved
const { result, loading: userSearchLoading } = useQuery<{
  chatRoomUserSearch: ChatRoomUser[];
}>(CHAT_ROOM_USER_SEARCH_QUERY, {
  input: {
    keyword: "",
    chat_room_id: chatRoomId,
  },
  limit: 100,
});

// const { result: gifResult } = useQuery(CHAT_MESSAGE_GIF_SEARCH_QUERY, {
//   q: "happy",
// });
// const { result: gifAutocompleteResult } = useQuery(
//   CHAT_MESSAGE_GIF_AUTOCOMPLETE_QUERY,
//   {
//     q: "happy",
//   }
// );
// const { result: gifPostsResult } = useQuery(CHAT_MESSAGE_GIF_POSTS_QUERY, {
//   ids: "16048037167635813074",
// });

const chatRoomUsers = computed(
  () =>
    result.value?.chatRoomUserSearch.map((chatRoomUser) => chatRoomUser.user) ||
    []
);
const isMessagesLoaded = ref(false);
watch(
  () => chatRoomResult.value?.chatRooms,
  (v) => {
    if (v) {
      chatRoomId.value = chatRooms.value[0].id;
    }
  },
  { immediate: true }
);

provide(CHAT, {
  isModerator,
  chatRoomId,
  isScrolledUp,
  isMessagesLoaded,
  input,
  chatRoomUsers,
  chatRooms,
  userRefOnInput,
  replyingTo,
  showGifSelect,
  muteConfirmationVisible,
});
</script>
<template>
  <div class="ChatProvider md:w-[370px] h-full relative">
    <ChatBar v-if="chatRoomId" class="h-full" />
    <div
      v-if="!isMessagesLoaded || userSearchLoading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <img
        class="w-[150px] md:w-[200px]"
        src="/assets/icons/gamba-logo-ultra.gif"
      />
    </div>
    <Icons />
    <GModal v-model="muteConfirmationVisible" width="461px">
      <div class="g-p-modal">
        <MuteConfirmation />
      </div>
    </GModal>
  </div>
</template>
