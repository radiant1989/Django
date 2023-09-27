<script setup lang="ts">
const props =
  defineProps<{
    username: string;
  }>();
</script>
<template>
  <div class="UserDetails">UserDetails for <b>{{ username }}</b></div>
</template>
