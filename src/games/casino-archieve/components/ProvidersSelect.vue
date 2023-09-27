<script setup lang="ts">
import {
  GPopover,
  GButton,
  GScrollbar,
  GCheckbox,
  GInput,
} from "@/components/atoms";
import { Provider } from "~/cms-hygraph";
import { arrowBelowIcon, searchIcon } from "~/icons";

const props =
  defineProps<{
    providers: Provider[];
    modelValue: string[];
  }>();
const searchQuery = ref("");
const filteredProviders = computed(() => {
  const _providers = props.providers.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  _providers.sort((a, b) => {
    if (props.modelValue.includes(a.id) && !props.modelValue.includes(b.id))
      return -1;
    if (props.modelValue.includes(a.id) && props.modelValue.includes(b.id)) {
      return (
        props.modelValue.findIndex((p) => p === a.id) -
        props.modelValue.findIndex((p) => p === b.id)
      );
    }
    return (
      props.providers.findIndex((p) => p.id === a.id) -
      props.providers.findIndex((p) => p.id === b.id)
    );
  });
  return _providers;
});
const emits =
  defineEmits<{
    (e: "update:modelValue", v: string[]): void;
  }>();

const toggle = (id: string) => {
  if (props.modelValue.includes(id)) {
    emits(
      "update:modelValue",
      props.modelValue.filter((v) => v !== id)
    );
  } else {
    emits("update:modelValue", [...props.modelValue, id]);
  }
};
</script>
<template>
  <GPopover arrow :z-index="40">
    <template #trigger="{ open }">
      <GButton style-type="secondary" class="!px-3">
        <div class="flex items-center gap-[15px]">
          <span class="font-semibold flex-1 text-left text-sm md:text-base"
            >Providers</span
          >
          <svg
            class="
              text-steel-color
              group-hover:text-white
              w-[9px]
              h-[6px]
              transition-transform
              duration-100
            "
            :style="{ transform: `rotateX(${open ? '180deg' : '0deg'})` }"
          >
            <use :xlink:href="arrowBelowIcon"></use>
          </svg>
        </div>
      </GButton>
    </template>
    <template #panel>
      <div class="p-4 pr-1 w-[216px]">
        <div class="mb-2">
          <GInput
            v-model="searchQuery"
            style-type="dark-sm"
            placeholder="Search for provider"
          >
            <template #suffix>
              <div class="w-7 h-full flex items-center">
                <svg class="w-4 h-4 text-steel-color">
                  <use :xlink:href="searchIcon"></use>
                </svg>
              </div>
            </template>
          </GInput>
        </div>
        <GScrollbar height="300px" class="pr-3">
          <div class="text-sm font-semibold">
            <div
              v-for="provider of filteredProviders"
              class="
                flex
                items-center
                gap-2
                mb-2.5
                cursor-pointer
                text-steel-color
                hover:text-white
              "
              @click="toggle(provider.id)"
            >
              <GCheckbox
                :model-value="modelValue.includes(provider.id)"
                @update:model-value="toggle(provider.id)"
                size="22px"
                :id="`provider-checkbox-${provider.id}`"
              />
              <span class="mr-auto">{{ provider.name }}</span>
              <div
                class="
                  min-w-[40px]
                  h-[22px]
                  rounded-lg
                  bg-primary-gradient
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-primary-inset
                "
              >
                <span>56</span>
              </div>
            </div>
          </div>
        </GScrollbar>
      </div>
    </template>
  </GPopover>
</template>
