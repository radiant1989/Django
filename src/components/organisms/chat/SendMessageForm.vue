<script setup lang="ts">
import { ref, Ref } from "vue";
import { GButton } from "~/components/atoms";
import { CHAT } from "./constants";
import { SEND_CHAT_MESSAGE_MUTATION } from "~/graphql";
import { telegramIcon } from "~/icons";

const { chatRoomId, isScrolledUp, input, userRefOnInput, replyingTo } = inject(CHAT)!;
const { loading, mutate, onDone } = useMutation(SEND_CHAT_MESSAGE_MUTATION);

const height = ref<number>(40);
const textarea: Ref<HTMLTextAreaElement | undefined> = ref();

const updateTextareaHeight = () => {
  let newHeight: number;
  if (textarea.value) {
    if (textarea.value.scrollHeight > 84) {
      newHeight = 84;
    } else if (textarea.value.scrollHeight < 40) {
      newHeight = 40;
    } else {
      newHeight = textarea.value.scrollHeight;
    }
    if (input.value === "") {
      newHeight = 40;
    }
    height.value = newHeight;
  }
};
const onKeypress = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey && !userRefOnInput.value.present) {
    e.preventDefault();
    onSubmit();
  }
};
const onKeydown = (e: KeyboardEvent) => {
  if (userRefOnInput.value.present) {
    if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) {
      e.preventDefault();
    }
  }
};
onDone(() => {
  input.value = "";
  replyingTo.value = null;
});
const onSubmit = () => {
  isScrolledUp.value = false;
  mutate({
    chat_room_id: chatRoomId.value,
    message: input.value,
    reply_to: replyingTo.value?.msg_user_identifier || ""
  });
};

watch(() => input.value, () => {
  updateTextareaHeight();
})
watch(() => replyingTo.value, () => {
  textarea.value!.focus();
})
</script>
<template>
  <div class="relative">
    <form class="flex w-full items-end" @submit.prevent="onSubmit">
      <div class="relative flex items-end w-full">
        <textarea
          ref="textarea"
          class="
            bg-secondary-gradient
            text-base
            shadow-dark-box
            pl-2
            py-2
            pr-7
            text-white
            w-full
            md:w-[290px]
            chat-text
          "
          :class="height > 40 ? 'rounded-t-lg rounded-l-lg' : ' rounded-l-lg'"
          @keypress="onKeypress"
          @keydown="onKeydown"
          placeholder="Type your message"
          v-model="input"
          :style="{
            height: `${height}px`,
          }"
        />
      </div>
      <GButton
        style-type="primary"
        :block="false"
        class="send-btn"
        :loading="loading"
      >
        <svg class="w-4 h-4">
          <use :xlink:href="telegramIcon"></use>
        </svg>
      </GButton>
    </form>
  </div>
</template>
<style scoped>
.chat-text {
  resize: none;
  max-height: 80px;
  overflow-y: auto;
  border: 1px solid transparent;
}
.chat-text::-webkit-scrollbar {
  width: 0px;
  background: theme(colors.primary-color);
}

.chat-text:focus {
  outline: none !important;
  border: 1px solid theme(colors.primary-color);
}
.send-btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 2px solid theme(colors.primary-color);
  height: 40px;
  padding: 10px;
}
</style>
