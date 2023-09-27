<script setup lang="ts">
import { inject } from "vue";
import { AUTH, THEME, LOGIN, PREFERENCE, WALLET, CONTAINER } from "~/constants";
import { notify } from "~/components/atoms";
import BetFormContainer from "@/games/dice/components/BetFormContainer.vue";
import GamePane from "@/games/dice/components/GamePane.vue";
import { BET_GAME, BetGameInput, BetGameResponse } from "~/graphql/bet";
import Footerbar from "~/games/dice/components/Footbar.vue";
import FeedTable from "~/games/FeedTable.vue";
import clickTickWav from "~/public/assets/audio/General_Click5_click.wav";
import { useTickCallback } from "~/hooks";
import { z2Icon, z3Icon, z4Icon } from "~/icons";
import { useGameSettingStore } from "@/store/games/settings";
const { activeCryptoCode } = inject(PREFERENCE)!;
const { currentWallet } = inject(WALLET)!;
const store = useGameSettingStore();
const { screen } = inject(THEME)!;
const { containerScreen } = inject(CONTAINER)!;
const me = inject(AUTH);
const router = useRouter();
function onShowLoginModal() {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      tab: "login",
      modal: "auth",
    },
  });
}
const selectedTab = ref<string>("manual");
const handleTab = (val: string) => {
  selectedTab.value = val;
};
const parameters = reactive({
  condition: "over",
  target: 50.5,
});
const input: BetGameInput = reactive({
  currencyCode: activeCryptoCode.value
    ? (activeCryptoCode.value as string)
    : "BTC",
  betAmount: 0,
  identifier: "inHouse:Dice",
  parameters: JSON.stringify(parameters),
});
watch(
  () => activeCryptoCode.value,
  (val) => {
    input.currencyCode = val as string;
  }
);
//declare Bet condition variables
const betamount = ref<number>(0);
const initBetAmount = ref<number>(0);
const target = ref<number>(parameters.target);
const betnumber = ref<number>(0);
const winpercent = ref<number>(0);
const losspercent = ref<number>(0);
const winreset = ref<boolean>(true);
const lossreset = ref<boolean>(true);
const profitamount = ref<number>(0);
const lossamount = ref<number>(0);
const condition = ref<boolean>(true);
const matchId = ref<string>();
//end declare
//bet button clicking sound

let audio: HTMLAudioElement;
const { tickCallback: playClickAudio } = useTickCallback(() => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.currentTime = 0;
  }
}, 40);
// let clickAudio = new Howl({
//   src: ["@/public/assets/audio/General_Click5_click.wav"],
// });
onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyEvent);
});
store.$onAction(({ name, store, after }) => {
  after(() => {
    if (name === "setAudiovolume") {
      audio.volume = store.audiovolume / 100;
    }
  });
});
const theatremode = computed(() => store.theatremode && screen.value.lg);
const handleTarget = (value: number) => {
  target.value = value;
  parameters.target = value;
  input.parameters = JSON.stringify(parameters);
};
const handleCondition = (value: boolean) => {
  condition.value = value;
  if (value) parameters.condition = "over";
  else parameters.condition = "under";
  input.parameters = JSON.stringify(parameters);
};

const handleAmount = (value: number | string | undefined) => {
  betamount.value = Number(value) ?? 0;
  input.betAmount = Number(value);
};
const limitbetnum = ref<boolean>(false);
const handleBetNumber = (value: number | string | undefined) => {
  betnumber.value = Number(value) ?? 0;
};
const handleWinPercent = (value: number | string | undefined) => {
  winpercent.value = Number(value) ?? 0;
};
const handleLossPercent = (value: number | string | undefined) => {
  losspercent.value = Number(value) ?? 0;
};
const handleWinReset = (value: boolean) => {
  winreset.value = value;
};
const handleLossReset = (value: boolean) => {
  lossreset.value = value;
};
const handleProfitAmount = (value: number | string | undefined) => {
  profitamount.value = Number(value) ?? 0;
};
const handleLossAmount = (value: number | string | undefined) => {
  lossamount.value = Number(value) ?? 0;
};
const betgameMutate = useMutation(BET_GAME).mutate;
onMounted(async () => {
  const me = inject(AUTH);
  audio = new Audio(clickTickWav);
  audio.volume = store.audiovolume / 100;
  document.addEventListener("keydown", handleKeyEvent);
});
const gameinprocess = ref<boolean>(false);
const totaldelta = ref<number>(0);
//Game way
enum GAMEWAY {
  MANUAL,
  AUTO,
}
const gameway = ref<GAMEWAY>(GAMEWAY.MANUAL);
//Game Result(will be used in autoway)
enum GAMERESULT {
  START,
  WON,
  LOST,
}
const gameresult = ref<GAMERESULT>(GAMERESULT.START);
//This is used in auto way to indicate start, stop, finishing....
enum AUTOSTATUS {
  START = 101,
  STOP,
  FINISHING,
}
const autowaystatus = ref<AUTOSTATUS>(AUTOSTATUS.START);

//this data will be stored in global state
const history_payload = ref<BetGameResponse[]>([]);
const history_item = ref<BetGameResponse>({
  balance: 0,
  delta: 0,
  matchId: "",
  partialResult: "",
  status: "",
  transactionId: "",
});

const handleKeyEvent = (event: KeyboardEvent) => {
  if (!store.hotkey) return;
  event.preventDefault();
  if (event.key === " ")
    selectedTab.value === "manual"
      ? !gameinprocess.value && manualGame()
      : autoGame();
  else if (event.key === "s") handleAmount(betamount.value * 2);
  else if (event.key === "a") handleAmount(betamount.value / 2);
  else if (event.key === "d") handleAmount(0);
  else if (event.key === "q") handleCondition(!condition.value);
  else if (event.key === "w") handleTarget(target.value - 1);
  else if (event.key === "e") handleTarget(target.value + 1);
  else return;
};
let balance: number = 0;
const playGame = async () => {
  if (me?.isLoggedIn.value) {
    try {
      gameinprocess.value = true;
      gameresult.value = GAMERESULT.START;
      const res = await betgameMutate({ input });
      history_item.value = res?.data?.betGame;
      matchId.value = res?.data?.betGame?.matchId;
      balance = res?.data?.betGame?.balance;
      history_payload.value?.push(
        history_item.value ?? {
          balance: 0,
          delta: 0,
          matchId: "",
          partialResult: "",
          status: "",
        }
      );
      if (gameway.value === GAMEWAY.MANUAL) gameinprocess.value = false;
      else {
        //game is done in auto mode
        totaldelta.value += res?.data?.betGame?.delta;
        if (res?.data?.betGame?.status === "won")
          gameresult.value = GAMERESULT.WON;
        else gameresult.value = GAMERESULT.LOST;
        if (autowaystatus.value === AUTOSTATUS.FINISHING) {
          gameinprocess.value = false;
          autowaystatus.value = AUTOSTATUS.START;
        }
      }
    } catch (error: any) {
      console.log("error occured\n", error);
      gameinprocess.value = false;
      if (gameway.value === GAMEWAY.AUTO)
        autowaystatus.value = AUTOSTATUS.START;
      notify.error(
        {
          title: "Error occured",
          text: error?.message.toString() || "Something went wrong",
          icon: {
            class: "w-[41px] h-12 text-[#FFDB41]",
            href: z4Icon,
          },
        },
        4000
      );
    }
  } else {
    onShowLoginModal();
  }
};
//Manual Game way
const manualGame = async () => {
  if (!store.gameplayable) return;
  gameway.value = GAMEWAY.MANUAL;
  playClickAudio();
  playGame();
};
//Auto Game way
const initAuto = () => {
  gameresult.value = GAMERESULT.START;
  totaldelta.value = 0;
  initBetAmount.value = betamount.value;
  gameway.value = GAMEWAY.AUTO;
  autowaystatus.value = AUTOSTATUS.STOP;
  if (betnumber.value > 0) limitbetnum.value = true;
  else limitbetnum.value = false;
};
const delay = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
const autoGame = async () => {
  if (!store.gameplayable) return;
  if (me?.isLoggedIn.value) {
    // clickAudio.play();
    playClickAudio();
    if (autowaystatus.value === AUTOSTATUS.STOP) {
      autowaystatus.value = AUTOSTATUS.FINISHING;
      return;
    }
    notify.info({
      title: "Autobet Started",
      text: `Your autobet has started`,
      icon: {
        class: "w-[41px] h-12 text-white",
        href: z2Icon,
      },
    });
    initAuto();
    while (true) {
      //determine whether or not finish the bet
      if (betamount.value > balance && balance > 0) {
        autowaystatus.value = AUTOSTATUS.START;
        gameinprocess.value = false;
        notify.info({
          title: "Autobet Halted",
          text: "Autobet stopped due to insufficient funds.",
          icon: {
            class: "w-[41px] h-12 text-[#FFDB41]",
            href: z4Icon,
          },
        });
        break;
      }
      await playGame();
      betnumber.value = betnumber.value !== 0 ? betnumber.value - 1 : 0;
      if (
        (betnumber.value === 0 && limitbetnum.value) ||
        (totaldelta.value > profitamount.value && profitamount.value > 0) ||
        (totaldelta.value < -lossamount.value && lossamount.value > 0) ||
        autowaystatus.value === AUTOSTATUS.FINISHING ||
        autowaystatus.value === AUTOSTATUS.START ||
        betnumber.value < 0
      ) {
        autowaystatus.value = AUTOSTATUS.START;
        gameinprocess.value = false;
        let title: string, text: string, icon: any;
        if (betnumber.value === 0 && limitbetnum.value) {
          title = "Autobet Completed";
          text = "Your autobet has finished the set number of bets.";
          icon = {
            class: "w-[41px] h-12 text-[#FFDB41]",
            href: z3Icon,
          };
        } else if (betnumber.value < 0) {
          title = "Autobet Completed";
          text = `Bet Number should be greater than "0".`;
          icon = {
            class: "w-[41px] h-12 text-[#FFDB41]",
            href: z3Icon,
          };
        } else if (
          totaldelta.value > profitamount.value &&
          profitamount.value > 0
        ) {
          title = "Autobet Stopped on Profit";
          text = "Your autobet has stopped as you reached your profit goal.";
          icon = {
            class: "w-[41px] h-12 text-[#FFDB41]",
            href: z3Icon,
          };
        } else if (
          totaldelta.value < -lossamount.value &&
          lossamount.value > 0
        ) {
          title = "Autobet Stopped on Loss";
          text = "Your autobet has stopped as you reached your loss limit.";
          icon = {
            class: "w-[41px] h-12 text-[#FFDB41]",
            href: z4Icon,
          };
        } else {
          title = "Autobet Manually Stopped";
          text = "You have manually stopped your autobet.";
          icon = {
            class: "w-[41px] h-12 text-[#FFDB41]",
            href: z2Icon,
          };
        }
        notify.info({
          title,
          text,
          icon,
        });
        break;
      }
      if (gameresult.value === GAMERESULT.WON) {
        if (winreset.value) {
          input.betAmount = initBetAmount.value;
        }
        input.betAmount = input.betAmount * (1 + winpercent.value / 100);
      } else if (gameresult.value === GAMERESULT.LOST) {
        if (lossreset.value) {
          input.betAmount = initBetAmount.value;
        }
        input.betAmount = input.betAmount * (1 + losspercent.value / 100);
      }
      betamount.value = input.betAmount;
      if (!store.instantbet) await delay(300);
    }
  } else {
    onShowLoginModal();
  }
};
const handleHalfClick = () => {
  betamount.value /= 2;
  input.betAmount = Number(betamount.value);
};
const handleDoubleClick = () => {
  betamount.value *= 2;
  if (currentWallet.value && betamount.value > currentWallet.value.free_amount)
    betamount.value = currentWallet.value.free_amount;
  input.betAmount = Number(betamount.value);
};

const handleMaxConfirmClick = () => {
  if (currentWallet.value) betamount.value = currentWallet.value.free_amount;
  input.betAmount = Number(betamount.value);
};
</script>
<template>
  <div
    class="
      mx-auto
      flex flex-col
      justify-center
      items-center
      gap-5
      lg:gap-[30px]
      max-w-[400px]
      md:max-w-content
    "
  >
    <div
      class="
        flex
        lg:flex-row
        gap-5
        flex-col-reverse
        justify-center
        lg:items-start
        items-center
      "
      :class="
        theatremode && screen.lg
          ? `-mt-5 md:-mt-10 expand-length theatre-width`
          : 'w-full'
      "
      :style="{ maxWidth: `${containerScreen.width}px` }"
    >
      <div
        :class="[
          ' h-[50vw] bg-ebony-clay-color border-t-2 border-t-cloud-burst-color rounded-lg relative pb-16 lg:pb-0 lg:max-w-[340px] md:max-w-[576px] w-full',
          selectedTab !== 'manual'
            ? 'lg:min-h-[786px] md:min-h-[759px] min-h-[707px] max-h-[707px]'
            : 'min-h-[361px] max-h-[361px] md:min-h-[385px] md:max-h-[385px]',
          theatremode && screen.lg ? 'theatre-mode' : 'lg:max-h-[730px]',
        ]"
      >
        <BetFormContainer
          :tab-value="selectedTab"
          @update:tabValue="handleTab"
          @play:bet-game="manualGame"
          @play:auto-game="autoGame"
          @update:amount-value="handleAmount"
          @update:bet-number="handleBetNumber"
          @update:win-percent="handleWinPercent"
          @update:loss-percent="handleLossPercent"
          @update:win-reset="handleWinReset"
          @update:loss-reset="handleLossReset"
          @update:profit-amount="handleProfitAmount"
          @update:loss-amount="handleLossAmount"
          @handle-half-click="handleHalfClick"
          @handle-double-click="handleDoubleClick"
          @handle-max-confirm-click="handleMaxConfirmClick"
          :gameinprocess="gameinprocess"
          :bet-amount="betamount"
          :target-value="target"
          :bet-number="betnumber"
          :win-percent="winpercent"
          :loss-percent="losspercent"
          :win-reset="winreset"
          :loss-reset="lossreset"
          :profit-amount="profitamount"
          :loss-amount="lossamount"
          :auto-status="autowaystatus"
          :condition-value="condition"
        />
      </div>
      <div
        :class="[
          'h-[50vw] min-h-[300px] bg-ebony-clay-color border-t-2 border-t-cloud-burst-color rounded-lg lg:mx-0 flex flex-col justify-between lg:pb-[75px] pb-5 px-5 pt-5 relative',
          selectedTab !== 'manual' && 'lg:min-h-[786px]',
          theatremode && screen.lg
            ? 'theatre-mode w-full'
            : 'lg:max-w-[1000px] md:max-w-[576px] w-full lg:max-h-[730px]',
        ]"
      >
        <GamePane
          @update:target-value="handleTarget"
          @update:condition-value="handleCondition"
          :histories="history_payload"
          :betresult="history_item"
          :gameinprocess="gameinprocess"
          :condition-value="condition"
          :range-value="target"
        />
      </div>
    </div>
    <div class="flex flex-row justify-center w-full">
      <div class="w-full lg:max-w-content md:max-w-[576px]">
        <Footerbar title="Dice" category="Gamba Originals" />
      </div>
    </div>
    <div class="flex flex-row justify-center w-full">
      <div class="w-full lg:max-w-content md:max-w-[576px]">
        <FeedTable />
      </div>
    </div>
  </div>
</template>
<style scoped>
.expand-length {
  margin-left: -40px;
  margin-right: -40px;
}
.theatre-mode {
  min-height: calc(100vh - 90px);
  max-height: calc(100vh - 90px);
}
.theatre-width {
  width: calc((100vh - 90px) * 1360 / 730);
}
</style>
