<script setup lang="ts">
import { computed } from "vue";
import { ChatMessage } from "@/types";
import { GAvatar, GTooltip } from "@/components/atoms";
import { CHAT } from "./constants";
import { AUTH } from "~/constants";
import {
  deleteIcon,
  replyIcon,
  chatMuteIcon,
  roleAdminIcon,
  roleDeveloperIcon,
  roleModeratorIcon,
  roleSupportIcon,
} from "~/icons";
import { getModalLinkForUser } from "@/hooks";

const props =
  defineProps<{
    chatMessage: ChatMessage;
  }>();

const { chatRoomUsers, replyingTo, isModerator, muteConfirmationVisible } =
  inject(CHAT)!;
const { me } = inject(AUTH)!;
const roleIconMap: {
  [key in string]: string;
} = {
  superadmin: roleAdminIcon,
  admin: roleAdminIcon,
  developer: roleDeveloperIcon,
  moderator: roleModeratorIcon,
  support: roleSupportIcon,
};
const roleItems = computed(() =>
  props.chatMessage.user.roles
    .map((r) => r.name)
    .filter((role) => Object.keys(roleIconMap).includes(role))
    .map((role) => ({ name: role, icon: roleIconMap[role] }))
);
const router = useRouter();
const userModalLink = getModalLinkForUser(props.chatMessage.user);
const highlightTags = (text: string) => {
  return text.replace(/@\w+/g, (match: string) => {
    const chatUser = chatRoomUsers.value.find(
      (user) => user.username === match.substring(1)
    );
    if (chatUser) {
      const href = getModalLinkForUser(chatUser);
      const classes =
        chatUser.username === me.value?.username
          ? "g-text-third-gradient"
          : "g-text-primary-gradient";
      return `<a
          class="tag font-medium ${classes}"
          href="${href}"
          >${match}</a>`;
    }
    return match;
  });
};
const computedMessage = computed(() => {
  return highlightTags(props.chatMessage?.message || "");
});
const onMessageClick = (e: MouseEvent) => {
  const targetElement = e.target as HTMLElement;
  if (targetElement.tagName === "A") {
    const href = targetElement.getAttribute("href");
    router.push(href);
    e.preventDefault();
  }
};
const showMuteConfirmation = () => {
  muteConfirmationVisible.value = true;
};
</script>
<template>
  <div class="ChatMessage">
    <div
      v-if="chatMessage.reply_to"
      class="mb-1.5 flex items-center text-steel-color text-sm"
    >
      <svg class="w-[15px] h-[14px] mr-2">
        <use :xlink:href="replyIcon"></use>
      </svg>
      <span class="mr-2.5">Replying to</span>
      <GAvatar
        :user="chatMessage.reply_to.user"
        size="22px"
        class="
          mr-[5px]
          rounded-[3px]
          overflow-hidden
          border border-secondary-color
        "
      />
      <div
        class="flex-1 min-w-0 whitespace-nowrap text-ellipsis overflow-hidden"
      >
        <span
          :class="{
            'g-text-third-gradient':
              chatMessage.reply_to.user.username === me?.username,
          }"
          >@{{ chatMessage.reply_to.user.username }}</span
        >: {{ chatMessage.reply_to.message }}
      </div>
    </div>
    <div class="flex items-start gap-2.5">
      <div class="flex-none">
        <NuxtLink :to="userModalLink" class="block group">
          <GAvatar
            class="
              rounded-md
              overflow-hidden
              border border-secondary-color
              group-hover:border-white
            "
            size="30px"
            :user="chatMessage.user"
          />
        </NuxtLink>
      </div>
      <div class="flex-1 min-w-0">
        <div
          class="
            flex
            items-center
            text-slate-color
            g-text-sm
            font-medium
            pt-0.5
            leading-none
            mb-[5px]
          "
        >
          <div class="w-4 h-4 flex items-center justify-center mr-2.5">
            <img
              class="block w-6 h-6 max-w-none"
              src="https://imagedelivery.net/ud0nKgC6_aGi3aA3QSI9OA/vip-rank-icons/platinum-3.png/public"
            />
          </div>
          <svg
            v-for="role in roleItems"
            class="mr-2.5"
            style="width: 14px; height: 14px"
            :key="role.name"
          >
            <use :xlink:href="role.icon"></use>
          </svg>
          <NuxtLink :to="userModalLink" class="hover:text-white mr-auto">{{
            chatMessage.user.username
          }}</NuxtLink>
          <button
            v-if="isModerator"
            @click="showMuteConfirmation"
            class="group mr-[15px]"
          >
            <svg
              class="group-active:scale-95 text-error"
              style="width: 13px; height: 13px"
            >
              <use :xlink:href="chatMuteIcon"></use>
            </svg>
          </button>
          <button v-if="isModerator" class="group">
            <svg
              class="group-active:scale-95 text-error"
              style="width: 13px; height: 13px"
            >
              <use :xlink:href="deleteIcon"></use>
            </svg>
          </button>
        </div>
        <div
          class="
            relative
            group
            rounded-lg
            [&:not(:hover)]:bg-secondary-gradient
            hover:bg-secondary-color
            border-t
          "
          :class="{
            'border-[#F0B91E]': chatMessage.user.username === me?.username,
            'border-t-secondary-color':
              chatMessage.user.username !== me?.username,
          }"
        >
          <div
            class="
              p-2.5
              g-text-sm
              text-white
              font-normal
              whitespace-pre-line
              break-words
            "
            v-html="computedMessage"
            @click="onMessageClick"
          ></div>
          <div class="absolute -top-[15px] right-0 hidden group-hover:block">
            <GTooltip>
              <template #trigger>
                <button
                  class="
                    flex
                    items-center
                    justify-center
                    w-[30px]
                    h-[30px]
                    rounded-lg
                    [&:not(:hover)]:bg-secondary-gradient
                    hover:bg-secondary-hover-gradient
                    border-2 border-secondary-color
                    text-white
                    cursor-pointer
                    group
                  "
                  @click="replyingTo = chatMessage"
                >
                  <svg
                    class="group-active:scale-95"
                    style="width: 15px; height: 14px"
                  >
                    <use :xlink:href="replyIcon"></use>
                  </svg>
                </button>
              </template>
              <template #panel>
                <div>Click to reply</div>
              </template>
            </GTooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
