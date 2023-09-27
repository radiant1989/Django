<script setup lang="ts">
import { User } from "@/types";
import { avatarIcon } from "@/icons"
withDefaults(
  defineProps<{
    user: User;
    size?: string;
  }>(),
  {
    size: "50px",
  }
);
</script>
<template>
  <div class="GAvatar" :style="{ width: size, height: size }">
    <img v-if="user.avatar" :src="user.avatar" class="w-full h-full block" />
    <svg v-else class="w-full h-full block">
      <use :xlink:href="avatarIcon"></use>
    </svg>
  </div>
</template>
