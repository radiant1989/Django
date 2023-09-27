export const chatMessageFields = gql`
  fragment chatMessageFields on ChatMessage {
    id
    message
    msg_user_identifier
    created_at
    user {
      id
      username
      avatar
      roles {
        id
        name
      }
    }
  }
`;
export const CHAT_ROOMS_QUERY = gql`
  query chatRooms {
    chatRooms {
      id
      name
      slug
    }
  }
`;

export const CHAT_MESSAGES_QUERY = gql`
  query getLastChatMessagesByChatRoom($chat_room_id: Int, $limit: Int) {
    getLastChatMessagesByChatRoom(
      input: { chat_room_id: $chat_room_id, limit: $limit }
    ) {
      id
      messageList {
        ...chatMessageFields
        reply_to {
          ...chatMessageFields
        }
      }
    }
  }
  ${chatMessageFields}
`;

export const SEND_CHAT_MESSAGE_MUTATION = gql`
  mutation sendChatMessage(
    $chat_room_id: Int
    $message: String
    $reply_to: String
  ) {
    sendChatMessage(
      input: {
        chat_room_id: $chat_room_id
        message: $message
        reply_to: $reply_to
      }
    ) {
      message
    }
  }
`;

export const CHAT_MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription chatMessageSent($chatRoomId: Int) {
    chatMessageSent(chatRoomId: $chatRoomId) {
      ...chatMessageFields
    }
  }
  ${chatMessageFields}
`;

export const CHAT_ROOM_USER_SEARCH_QUERY = gql`
  query chatRoomUserSearch($input: chatRoomUserSearchInput, $limit: Int) {
    chatRoomUserSearch(input: $input, limit: $limit) {
      id
      user {
        id
        username
      }
    }
  }
`;

export const CHAT_MESSAGE_GIF_SEARCH_QUERY = gql`
  query chatMessageGifSearch($q: String!) {
    chatMessageGifSearch(q: $q)
  }
`;

export const CHAT_MESSAGE_GIF_AUTOCOMPLETE_QUERY = gql`
  query chatMessageGifAutocomplete($q: String!) {
    chatMessageGifAutocomplete(q: $q)
  }
`;

export const CHAT_MESSAGE_GIF_POSTS_QUERY = gql`
  query chatMessageGifPosts($ids: String!) {
    chatMessageGifPosts(ids: $ids)
  }
`;

export const TOGGLE_CHAT_TIMEOUT_USER_MUTATION = gql`
  mutation toggleChatTimeoutUser($input: timeoutUserInput!) {
    toggleChatTimeoutUser(input: $input) {
      status
    }
  }
`;
