import { ID } from "./base";
import { User } from "./user";

export type ChatMessage = {
  __typename: string;
  id: string;
  message: string;
  msg_user_identifier: string;
  created_at: string;
  user: User;
  reply_to?: ChatMessage | null
};

export type ChatRoom = {
  id: number
  slug: string
  name: string
}

export type ChatRoomUser = {
  id: ID
  user: User
}
