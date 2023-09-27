<script setup lang="ts">
import { CHAT } from "./constants";
import { GAvatar, GCloseButton } from "@/components/atoms";
import { replyIcon } from "@/icons";
import { AUTH } from "~/constants";
import { getModalLinkForUser } from "@/hooks";

const { replyingTo } = inject(CHAT)!;
const { me } = inject(AUTH)!;

const href = getModalLinkForUser(replyingTo.value!.user);
const classes =
replyingTo.value?.user.username === me.value?.username
    ? "g-text-third-gradient"
    : "g-text-primary-gradient";
</script>
<template>
  <div class="ReplyingTo text-white">
    <div class="flex items-center mb-1.5">
      <svg class="flex-none w-[15px] h-[14px] mr-2">
        <use :xlink:href="replyIcon"></use>
      </svg>
      <span class="text-sm font-medium mr-2.5">Replying to</span>
      <GAvatar
        :user="replyingTo!.user"
        class="
          mr-[5px]
          border
          rounded-[3px]
          overflow-hidden
          border-secondary-color
        "
        size="22px"
      />
      <a class="g-text-primary-gradient mr-auto" :href="href"
        >@{{ replyingTo?.user.username }}</a
      >
      <GCloseButton @click="replyingTo = null" />
    </div>
    <div class="text-sm font-medium" v-html="replyingTo?.message"></div>
  </div>
</template>
