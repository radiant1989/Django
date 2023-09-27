<script setup lang="ts">
import { START_DEMO_MUTATION, START_GAME_MUTATION } from "@/graphql";
import { SOFTSWISS_GAME } from "../constants";
import { GButton } from "@/components/atoms";
import CurrencySelect from "@/components/molecules/selects/CurrencySelect.vue";
import {
  PREFERENCE,
  WAITING_PLAY,
  FUN_PLAY,
  REAL_PLAY,
  AUTH,
  THEME,
  CREATE_USER,
} from "~/constants";

const router = useRouter();
const { screen } = inject(THEME)!;
const { isLoggedIn, modalVisible, authType } = inject(AUTH)!;
const { activeCryptoCode } = inject(PREFERENCE)!;
const { game, currentPlay, fullScreen, theatreMode, currency } =
  inject(SOFTSWISS_GAME)!;

const gameContainer = ref<HTMLDivElement>();
const {
  mutate: mutateStartDemo,
  onDone: onStartDemoDone,
  loading: demoMutateLoading,
} = useMutation(START_DEMO_MUTATION);
const {
  mutate: mutateStartReal,
  onDone: onStartRealDone,
  loading: realMutateLoading,
} = useMutation(START_GAME_MUTATION);
const loading = computed(
  () => demoMutateLoading.value || realMutateLoading.value
);
const styles = computed(() => {
  if (theatreMode.value) {
    return {
      height: screen.value.lg
        ? `calc(100vh - 90px - 55px)`
        : "calc(100vh - 79px - 55px)",
    };
  } else {
    return {
      aspectRatio: "1360/765",
    };
  }
});
const onGameSuccess = () => {};
const onGameError = (error) => {};

const launchGame = ({ game_url, strategy }) => {
  unmountGame();
  const gameLaunchOptions = {
    target_element: "game-play-container",
    launch_options: {
      game_url,
      strategy,
    },
  };
  window.sg.launch(gameLaunchOptions, onGameSuccess, onGameError);
};
const unmountGame = () => {
  gameContainer.value!.innerHTML = "";
};
const funPlay = () => {
  unmountGame();
  mutateStartDemo({
    game: game.identifier!,
  });
};
const realPlay = () => {
  unmountGame();
  mutateStartReal({
    game: game.identifier!,
    fiatCurrency: currency.value,
    cryptoCurrency: activeCryptoCode.value,
  });
};
const enterFullScreen = () => {
  gameContainer.value!.requestFullscreen();
};
const openAuthModal = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      tab: CREATE_USER,
      modal: "auth",
    },
  });
};
watch(
  () => currentPlay.value,
  (playValue) => {
    if (playValue === FUN_PLAY) {
      funPlay();
    } else if (playValue === WAITING_PLAY) {
      if (isLoggedIn.value) {
        realPlay();
      } else {
        funPlay();
      }
    }
  }
);
watch(
  () => fullScreen.value,
  (fullScreenValue) => {
    if (fullScreenValue) {
      enterFullScreen();
    }
  }
);
watch(
  () => currency.value,
  (currencyValue) => {
    if (currentPlay.value === WAITING_PLAY) {
      if (isLoggedIn.value) {
        realPlay();
      }
    } else if (currentPlay.value === REAL_PLAY) {
      currentPlay.value = WAITING_PLAY;
    }
  }
);
watch(
  () => activeCryptoCode.value,
  (v) => {
    if (currentPlay.value === WAITING_PLAY) {
      if (isLoggedIn.value) {
        realPlay();
      }
    } else if (currentPlay.value === REAL_PLAY) {
      currentPlay.value = WAITING_PLAY;
    }
  }
);
onStartDemoDone((result) => {
  if (currentPlay.value !== FUN_PLAY && isLoggedIn.value) return;
  const {
    data: {
      startDemo: { game_url, strategy },
    },
  } = result;
  launchGame({ game_url, strategy: "iframe" });
});
onStartRealDone((result) => {
  if (currentPlay.value === FUN_PLAY) return;
  const {
    data: {
      startGame: { game_url, strategy },
    },
  } = result;
  launchGame({ game_url, strategy: "iframe" });
});
onMounted(() => {
  watch(
    () => isLoggedIn.value,
    (v) => {
      if (v) {
        realPlay();
      } else {
        funPlay();
      }
    },
    { immediate: true }
  );

  gameContainer.value!.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
    } else {
      fullScreen.value = false;
    }
  });
});
</script>
<template>
  <div class="GameMain relative">
    <div
      id="game-play-container"
      style="background-color: rgba(0, 0, 0, 0.85)"
      :style="styles"
      ref="gameContainer"
    ></div>
    <div
      v-if="currentPlay === WAITING_PLAY"
      class="absolute inset-0 flex justify-center items-center font-semibold"
      style="background-color: rgba(0, 0, 0, 0.85)"
    >
      <div>
        <div class="flex items-center gap-x-2 mb-5">
          <span class="text-base font-semibold text-white"
            >Display Balance in</span
          >
          <div>
            <CurrencySelect v-model="currency" />
          </div>
        </div>
        <div class="flex gap-x-4">
          <GButton v-if="isLoggedIn" @click="currentPlay = REAL_PLAY"
            >Real Play</GButton
          >
          <GButton v-else @click="openAuthModal">Login/Register</GButton>
          <GButton style-type="secondary" @click="currentPlay = FUN_PLAY"
            >Fun Play</GButton
          >
        </div>
      </div>
    </div>
    <div
      v-else-if="loading"
      class="absolute inset-0 flex justify-center items-center"
    >
      <img
        class="w-[100px] md:w-[160px]"
        src="/assets/icons/gamba-logo-ultra.gif"
      />
    </div>
  </div>
</template>
<style lang="scss">
.GameMain {
  #game-play-container {
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
