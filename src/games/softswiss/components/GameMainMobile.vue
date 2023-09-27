<script setup lang="ts">
import { GButton } from "@/components/atoms";
import { barChartIcon, outlineFavoriteIcon } from "~/icons";
import { SOFTSWISS_GAME } from "../constants";
import CurrencySelect from "~/components/molecules/selects/CurrencySelect.vue";
import {
  AUTH,
  CREATE_USER,
  FUN_PLAY,
  REAL_PLAY,
  PREFERENCE,
  WAITING_PLAY,
} from "~/constants";
import { START_DEMO_MUTATION, START_GAME_MUTATION } from "~/graphql";

type LaunchOptions = { game_url: string; strategy: string };

const router = useRouter();
const { game, currency, currentPlay } = inject(SOFTSWISS_GAME)!;
const { isLoggedIn } = inject(AUTH)!;
const { activeCryptoCode } = inject(PREFERENCE)!;

let demoLaunchOptions: LaunchOptions | false = false;
let gameLaunchOptions: LaunchOptions | false = false;

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

const openAuthModal = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      tab: CREATE_USER,
      modal: "auth",
    },
  });
};
const gotoGame = (url: string) => {
  currentPlay.value = WAITING_PLAY;
  nextTick(() => {
    location.href = url;
  });
};
watch(
  () => currentPlay.value,
  (playType) => {
    if (playType === FUN_PLAY && demoLaunchOptions) {
      // get back status, so that this will work properly on iphone flush cache
      gotoGame(demoLaunchOptions.game_url);
    } else if (playType === REAL_PLAY && gameLaunchOptions) {
      gotoGame(gameLaunchOptions.game_url);
    }
  }
);
watch(
  () => currency.value,
  () => {
    if (isLoggedIn.value) {
      gameLaunchOptions = false;
      mutateStartReal({
        game: game.identifier!,
        fiatCurrency: currency.value,
        cryptoCurrency: activeCryptoCode.value,
      });
    }
  }
);
watch(
  () => activeCryptoCode.value,
  () => {
    if (isLoggedIn.value) {
      gameLaunchOptions = false;
      mutateStartReal({
        game: game.identifier!,
        fiatCurrency: currency.value,
        cryptoCurrency: activeCryptoCode.value,
      });
    }
  }
);

onStartDemoDone((result) => {
  const {
    data: {
      startDemo: { game_url, strategy },
    },
  } = result;
  demoLaunchOptions = { game_url, strategy };
  if (currentPlay.value === FUN_PLAY) {
    gotoGame(demoLaunchOptions.game_url);
  }
});
onStartRealDone((result) => {
  const {
    data: {
      startGame: { game_url, strategy },
    },
  } = result;
  gameLaunchOptions = { game_url, strategy };
  if (currentPlay.value === REAL_PLAY) {
    gotoGame(gameLaunchOptions.game_url);
  }
});
watch(
  () => isLoggedIn.value,
  (isLoggedInValue) => {
    if (isLoggedInValue) {
      mutateStartReal({
        game: game.identifier!,
        fiatCurrency: currency.value,
        cryptoCurrency: activeCryptoCode.value,
      });
    } else {
    }
  },
  { immediate: true }
);
onMounted(() => {
  mutateStartDemo({
    game: game.identifier,
  });
});
</script>
<template>
  <div class="GameMainMobile">
    <div class="flex gap-[15px] mb-5">
      <div class="flex-none">
        <img
          :src="game.image"
          class="block object-cover rounded-lg"
          style="width: 139px; height: 188px"
        />
      </div>
      <div class="flex-1 flex flex-col gap-2.5 text-steel-color">
        <h3 class="font-bold text-white">{{ game.title }}</h3>
        <h4 class="font-semibold text-sm">
          {{ game.gameCategory.name }}
        </h4>
        <div class="flex gap-[15px] mb-auto">
          <button class="group block hover:text-white">
            <svg
              class="group-active:scale-95"
              style="width: 19px; height: 19px"
            >
              <use :xlink:href="outlineFavoriteIcon"></use>
            </svg>
          </button>
          <button class="group block hover:text-white">
            <svg
              class="group-active:scale-95"
              style="width: 19px; height: 19px"
            >
              <use :xlink:href="barChartIcon"></use>
            </svg>
          </button>
        </div>
        <div class="flex items-center gap-2.5">
          <span class="text-sm font-semibold text-white">Display Balance</span>
          <div>
            <CurrencySelect v-model="currency" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-2.5">
      <div class="flex-1">
        <GButton
          v-if="isLoggedIn"
          @click="currentPlay = REAL_PLAY"
          :loading="currentPlay === REAL_PLAY"
          >Real Play</GButton
        >
        <GButton v-else @click="openAuthModal">Login/Register</GButton>
      </div>
      <div class="flex-1">
        <GButton
          style-type="secondary"
          @click="currentPlay = FUN_PLAY"
          :loading="currentPlay === FUN_PLAY"
          >Fun Play</GButton
        >
      </div>
    </div>
  </div>
</template>
