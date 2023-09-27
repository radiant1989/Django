<script setup lang="ts">
import { Game, PlayType, GameProducer } from "@/types";
import GamePane from "./GamePane.vue";
import GameMetaPane from "./GameMetaPane.vue";
import { SOFTSWISS_GAME } from "../constants";
import { WAITING_PLAY, PREFERENCE, CONTAINER, THEME } from "~/constants";
import EscapeContainer from "@/components/molecules/containers/EscapeContainer.vue";
import GameMainMobile from "./GameMainMobile.vue";
import GameProducersRow from "~/games/casino/components/GameProducersRow.vue";
import GamesByCategoryRow from "~/games/casino/components/GamesByCategoryRow.vue";
import { recommendedIcon, providerIcon } from "~/icons";
import { GDelayed } from "~/components/atoms";

const props =
  defineProps<{
    game: Game;
    producers: GameProducer[];
  }>();
const { preferences } = inject(PREFERENCE)!;
const { screen } = inject(THEME)!;
const currentPlay = ref<PlayType>(WAITING_PLAY);
const fullScreen = ref(false);
const theatreMode = ref(false);
const currency = ref(preferences.value?.activeFiatCode || "USD");
const recommendedCategory = {
  id: "1",
  name: "Craps",
  slug: "slots",
};

watch(
  () => preferences.value?.activeFiatCode,
  (activeFiatCode) => {
    currency.value = activeFiatCode!;
  }
);

provide(SOFTSWISS_GAME, {
  game: props.game,
  currentPlay,
  fullScreen,
  theatreMode,
  currency,
});
</script>
<template>
  <div class="SoftswissGame">
    <div class="g-mb-md">
      <EscapeContainer
        v-if="screen.md"
        :enable="theatreMode"
        :class="{
          '-mt-5 md:-mt-10': theatreMode,
          'overflow-hidden rounded-lg': !theatreMode,
        }"
      >
        <div
          class="mx-auto"
          :style="{
            maxWidth: theatreMode
              ? 'calc((100vh - 90px - 55px) * 1360 / 765)'
              : 'none',
          }"
        >
          <GamePane />
        </div>
      </EscapeContainer>
      <GameMainMobile v-else />
    </div>
    <div class="g-mb-md">
      <GameMetaPane />
    </div>
    <div class="g-mb-md">
      <GDelayed :timeout="300">
        <GamesByCategoryRow
          :game-category="recommendedCategory"
          title="Recommended"
          :icon="recommendedIcon"
          in-page
        />
      </GDelayed>
    </div>
    <div class="g-mb-md">
      <GameProducersRow
        :producers="producers"
        :icon="providerIcon"
        title="Providers"
      />
    </div>
  </div>
</template>
