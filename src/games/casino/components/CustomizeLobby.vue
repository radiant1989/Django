<script setup lang="ts">
import { GSwitch, GTransitionHeight } from "@/components/atoms";
import { arrowBelowIcon, draggableIcon, liveBetFeedIcon } from "~/icons";
import { CASINO_HOME } from "../constants";
import { GameProducer } from "@/types";
import { CategoryRow, ProducerRow, ProducersRow } from "../types";
import { THEME } from "~/constants";

const draggable = defineAsyncComponent({
  loader: () => import("vuedraggable"),
});

const { screen } = inject(THEME)!;
const {
  categoryProducerRows,
  liveBetFeedEnabled,
  producers,
  updateProducerEnabled,
} = inject(CASINO_HOME)!;
const applicableProducers = computed(() =>
  producers.map((p) => ({
    ...p,
    enabled: categoryProducerRows.value.some(
      (r) => r.type === "producer" && r.producerSlug === p.producerSlug
    ),
  }))
);

const onToggleProducerEnable = (producer: GameProducer, enabled: boolean) => {
  updateProducerEnabled(producer.slug, enabled);
};
const onToggleRowEnabled = (
  categoryProducerRow: CategoryRow | ProducersRow | ProducerRow,
  enabled: boolean
) => {
  if (categoryProducerRow.type === "producer") {
    updateProducerEnabled(categoryProducerRow.producerSlug, enabled);
  } else {
    categoryProducerRows.value = categoryProducerRows.value.map((row) => ({
      ...row,
      enabled:
        categoryProducerRow.type === row.type &&
        categoryProducerRow.id === row.id
          ? enabled
          : row.enabled,
    }));
  }
};
</script>
<template>
  <div class="CustomizeCasinoHome">
    <div class="text-base font-medium">
      <div class="md:-mx-2 mb-5">
        <ClientOnly>
          <draggable
            v-model="categoryProducerRows"
            item-key="id"
            :animation="250"
            ghostClass="ghost"
          >
            <template #item="{ element }">
              <button
                class="
                  group
                  py-2
                  md:px-2
                  block
                  w-full
                  text-left
                  active:cursor-grabbing
                "
              >
                <div class="flex items-center gap-x-2">
                  <div class="flex-none mouse:group-hover:text-white">
                    <svg class="w-1.5 h-[5px]">
                      <use :xlink:href="draggableIcon"></use>
                    </svg>
                  </div>
                  <div class="flex-none">
                    <svg class="w-[18px] h-[18px] mouse:group-hover:text-white">
                      <use :xlink:href="element.icon"></use>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-white">{{ element.title }}</div>
                  </div>
                  <div class="flex-none">
                    <div class="w-7 text-right text-sm">
                      {{ element.enabled ? "ON" : "OFF" }}
                    </div>
                  </div>
                  <div class="flex-none">
                    <GSwitch
                      class="w-6"
                      :model-value="element.enabled"
                      @update:model-value="onToggleRowEnabled(element, $event)"
                    />
                  </div>
                </div>
              </button>
            </template>
          </draggable>
        </ClientOnly>
        <div class="py-2 px-2">
          <div class="flex items-center gap-x-2">
            <div class="flex-none pt-0.5">
              <svg style="width: 13px; height: 19px">
                <use :xlink:href="liveBetFeedIcon"></use>
              </svg>
            </div>
            <div class="flex-1">
              <div class="text-white">Live Bet Feed</div>
            </div>
            <div class="flex-none">
              <div class="w-7 text-right text-sm">
                {{ liveBetFeedEnabled ? "ON" : "OFF" }}
              </div>
            </div>
            <div class="flex-none">
              <GSwitch class="w-6" v-model="liveBetFeedEnabled" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          bg-secondary-gradient
          border-2 border-secondary-color
          p-2.5
          rounded-lg
        "
      >
        <GTransitionHeight v-slot="{ state, setState }">
          <div class="cursor-pointer group" @click="setState(!state)">
            <div class="flex items-center">
              <div class="flex-1">
                <span class="text-white">Add a Provider</span>
              </div>
              <div class="flex-0">
                <svg
                  class="
                    text-slate-color
                    group-hover:text-white
                    w-[9px]
                    h-[6px]
                    transition-transform
                    duration-200
                  "
                  :style="{
                    transform: `rotateX(${state ? '180deg' : '0deg'})`,
                  }"
                >
                  <use :xlink:href="arrowBelowIcon"></use>
                </svg>
              </div>
            </div>
          </div>
          <div v-if="state">
            <div
              class="border-t-2 border-secondary-color mt-[14px] mb-2.5"
            ></div>
            <div>
              <div
                v-for="producer of applicableProducers"
                class="mb-2.5"
                :key="producer.id"
              >
                <div class="flex items-center gap-1.5">
                  <div class="flex-1">
                    <span :class="{ 'text-white': producer.enabled }">{{
                      producer.name
                    }}</span>
                  </div>
                  <div class="flex-none">
                    <div class="w-7 text-right text-sm">
                      {{ producer.enabled ? "ON" : "OFF" }}
                    </div>
                  </div>
                  <div class="flex-none">
                    <GSwitch
                      class="w-6"
                      :model-value="producer.enabled"
                      @update:model-value="
                        onToggleProducerEnable(producer, $event)
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GTransitionHeight>
      </div>
    </div>
  </div>
</template>
