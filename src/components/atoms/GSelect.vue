<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { useInput, ScrollStyleType } from "./hooks";
import GScrollbar from "./GScrollbar.vue";
import GDropdownArrow from "./GDropdownArrow.vue";

type Value = string | number;
const props = withDefaults(
  defineProps<{
    options: Array<{ label: string; value: Value }>;
    modelValue: Value;
    dropdownHeight: string;
    scrollType?: ScrollStyleType;
  }>(),
  {
    scrollType: "content",
  }
);
defineEmits<{
  (e: "update:modelValue", value: Value): void;
}>();
const selectedOption = computed(() =>
  props.options.find((option) => option.value === props.modelValue)
);
const { typeClass, statusClass } = useInput({
  styleType: "dark",
  status: "normal",
});
</script>
<template>
  <Listbox
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="relative">
      <ListboxButton
        class="relative w-full cursor-pointer group"
        v-slot="{ open }"
      >
        <slot
          name="default"
          :value="modelValue"
          :label="selectedOption?.label"
          :open="open"
        >
          <div :class="[typeClass, statusClass]">
            <div
              class="
                h-full
                flex
                items-center
                pl-[15px]
                pr-[5px]
                rounded-lg
                text-left
                md:text-base
                text-sm
              "
            >
              <div class="flex-1 min-w-0">
                <span class="text-white text-sm md:text-base font-medium">{{
                  selectedOption?.label
                }}</span>
              </div>
              <div
                class="
                  md:w-[35px]
                  md:h-[35px]
                  w-[30px]
                  h-[30px]
                  rounded-md
                  border border-secondary-color
                  bg-secondary-gradient
                  group-hover:border-secondary-hover-color
                  flex
                  justify-center
                  items-center
                "
              >
                <GDropdownArrow :open="open" />
              </div>
            </div>
          </div>
        </slot>
      </ListboxButton>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            absolute
            z-10
            w-full
            overflow-auto
            rounded-lg
            focus:outline-none
            secondary-gradient
            border-2 border-ash
            bg-ebony-clay-color
            text-sm
            sm:text-base
            text-steel-color
            py-1.5
            container-snap
            mt-1
          "
          as="div"
        >
          <div class="w-full h-full">
            <GScrollbar :style-type="scrollType" :height="dropdownHeight">
              <ul>
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                  as="template"
                >
                  <slot
                    name="option"
                    :option="option"
                    :selected="selected"
                    :active="active"
                  >
                    <li
                      class="
                        group
                        z-20
                        px-[17px]
                        ml-0
                        py-2
                        relative
                        list-none
                        cursor-pointer
                        select-none
                      "
                      :class="{
                        'bg-menu-active': selected,
                        'hover:bg-ash': !selected,
                      }"
                    >
                      <span
                        :class="[
                          'font-medium',
                          selected && 'text-white',
                          active && 'text-white/80',
                          'block truncate',
                        ]"
                        >{{ option.label }}</span
                      >
                    </li>
                  </slot>
                </ListboxOption>
              </ul>
            </GScrollbar>
          </div>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<style scoped>
.container-snap::-webkit-scrollbar {
  display: none;
}
</style>
