<script setup lang="ts">
import { ref, watch } from "vue";
import { GTransitionHeight } from "~/components/atoms";
import { arrowBelowIcon } from "~/icons";
interface LinkGroup {
  type: string;
  label: string;
  key: string;
  url: string;
  icon: any;
  items: {
    type: string;
    key?: string;
    label?: string;
    url?: string;
    icon?: any;
    state?: string;
  }[];
}

const props = defineProps({
  group: {
    type: Object as () => LinkGroup,
  },
});
const isOpened = ref<boolean>(false);
const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    if (
      props.group?.items.find((item) => item.url === route.fullPath) ||
      props.group?.url === route.fullPath
    ) {
      isOpened.value = true;
    } else {
      isOpened.value = false;
    }
  }
);
onMounted(() => {
  if (
    props.group?.items.find((item) => item.url === route.fullPath) ||
    props.group?.url === route.fullPath
  ) {
    isOpened.value = true;
  } else {
    isOpened.value = false;
  }
});
</script>
<template>
  <GTransitionHeight :initial-state="isOpened" v-slot="{ state, setState }">
    <div
      :class="state ? 'text-white' : 'text-steel-color '"
      class="text-lg relative cursor-pointer px-5 group"
      @click="setState(!state)"
    >
      <div class="absolute top-1/2 right-4 -translate-y-1/2">
        <svg
          class="w-[9px] h-[6px] transition-transform duration-200"
          :class="
            state ? 'text-white' : 'text-steel-color group-hover:text-white'
          "
          :style="{ transform: `rotateX(${state ? '180deg' : '0deg'})` }"
        >
          <use :xlink:href="arrowBelowIcon"></use>
        </svg>
      </div>
      <span
        :class="
          !state &&
          'md:group-hover:text-white md:group-hover:pl-2 transition-all duration-200  ease-in-out'
        "
        >{{ props.group?.label }}</span
      >
    </div>
    <template v-if="state">
      <div class="pt-2.5">
        <div v-for="(item, index) in props.group?.items" class="px-2.5">
          <NuxtLink
            class="
              flex flex-row
              items-center
              gap-2
              py-2.5
              pl-2.5
              text-steel-color
              hover:text-white
              active:scale-95
            "
            :to="item.url"
            v-if="item.type === 'link'"
            active-class=" text-white w-full bg-primary-gradient border rounded-lg border-primary-color"
          >
            <svg class="w-5 h-5">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span class="text-base">{{ item.label }}</span>
          </NuxtLink>
          <div class="w-full px-2.5 my-3" v-else>
            <div class="bg-midnight-express-color w-full h-[2px]"></div>
          </div>
        </div>
      </div>
    </template>
  </GTransitionHeight>
</template>
