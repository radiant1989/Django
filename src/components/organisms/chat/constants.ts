import { ChatMessage, ChatRoom, User } from "~/types";

export const CHAT = Symbol() as InjectionKey<{
  chatRoomId: Ref<number>;
  isScrolledUp: Ref<boolean>;
  isModerator: ComputedRef<boolean>;
  isMessagesLoaded: Ref<boolean>;
  input: Ref<string>;
  chatRoomUsers: ComputedRef<User[]>;
  chatRooms: ComputedRef<ChatRoom[]>;
  userRefOnInput: ComputedRef<{ present: boolean; keyword: string }>;
  replyingTo: Ref<ChatMessage | null>;
  showGifSelect: Ref<boolean>;
  muteConfirmationVisible: Ref<boolean>;
}>;
