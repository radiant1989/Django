<script setup lang="ts">
import { computed } from "vue";
import { Chat, TAGGING_LIST } from "~/constants/mock_data";
const props = defineProps({
  data: {
    type: Object as () => Chat,
  },
});
const highlightTags = (text: string) => {
  return text.replace(/@\w+/g, (match: string) => {
    if (TAGGING_LIST.includes(match.substring(1))) {
      return `<span class="tag font-medium" style="background-image: radial-gradient(
            79.44% 190.83% at 47.12% 105.83%,
            #4affd4 0%,
            #008976 100%
          );
          color: transparent;
          -webkit-background-clip: text;">${match}</span>`;
    }
    return match;
  });
};
const computedContent = computed(() => {
  return highlightTags(props.data?.content ? props.data.content : "");
});
</script>
<template>
  <div class="flex flex-row items-start gap-2.5">
    <img
      :src="data?.profileImage"
      :width="26"
      class="border-2 border-secondary-color rounded-sm"
      alt="loading..."
    />
    <div class="flex flex-col gap-[5px] w-full">
      <div
        class="
          flex flex-row
          justify-between
          text-slate-color
          g-text-sm
          font-medium
          pt-1
        "
      >
        <span>{{ data?.sender }}</span>
        <span>{{ data?.time }}</span>
      </div>
      <div
        class="
          rounded-lg
          bg-secondary-gradient
          border-t-[1px] border-t-secondary-color
          p-2
          g-text-sm
          text-white
          font-medium
        "
        v-html="computedContent"
      ></div>
    </div>
  </div>
</template>
