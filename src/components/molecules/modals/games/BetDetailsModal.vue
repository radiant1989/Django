<template>
  <div>
    <div v-if="betLoading">
      <div
        class="
          pl-[30px]
          pr-[30px]
          pt-[60px]
          pb-[30px]
          flex flex-row
          justify-center
          items-center
        "
      >
        <SkeletonLoader class="p-[30px] w-full h-[300px] my-3"></SkeletonLoader>
      </div>
    </div>
    <div v-else>
      <div v-if="betData">
        <div v-if="modalTitle === 'betdetails'">
          <div
            class="
              px-[15px]
              md:px-[30px]
              pt-[55px]
              md:pt-[60px]
              pb-[15px]
              md:pb-[30px]
              flex flex-col
              gap-5
            "
          >
            <div class="flex flex-row gap-3 w-full">
              <img src="@/public/assets/icons/Game/dice/twodice.png" />
              <div
                class="flex flex-col justify-between font-semibold"
                :style="{ width: 'calc(100% - 112px)' }"
              >
                <div class="flex items-center h-1/5">
                  <span class="text-white md:text-base text-sm">{{
                    betData.game
                  }}</span>
                </div>
                <div class="flex items-center h-1/5">
                  <span class="text-white md:text-base text-sm"
                    >Gamba Originals</span
                  >
                </div>
                <div
                  class="
                    flex flex-row
                    gap-[5px]
                    justify-start
                    items-center
                    h-1/5
                  "
                >
                  <span
                    class="
                      text-white
                      md:text-base
                      text-sm
                      whitespace-nowrap
                      w-2/3
                      text-ellipsis
                      overflow-hidden
                    "
                    >ID {{ betData.transaction_id }}</span
                  >
                  <GTooltip :trigger="copyvisible" :arrow="screen.md && true">
                    <template #trigger>
                      <GButton style-type="transparent" @click="copyToClipBoard"
                        ><svg
                          class="
                            w-[15px]
                            h-[15px]
                            text-steel-color
                            hover:text-white
                          "
                        >
                          <use :xlink:href="copyIcon"></use>
                        </svg>
                      </GButton>
                    </template>
                    <template #panel>
                      <div class="text-sm md:text-sm font-semibold">
                        Copied, post it in chat!
                      </div>
                    </template>
                  </GTooltip>
                  <GTooltip :trigger="linkvisible" :arrow="screen.md && true">
                    <template #trigger>
                      <GButton style-type="transparent" @click="copyLink"
                        ><svg
                          class="
                            w-[15px]
                            h-[15px]
                            text-steel-color
                            hover:text-white
                          "
                        >
                          <use :xlink:href="linkIcon"></use>
                        </svg>
                      </GButton>
                    </template>
                    <template #panel>
                      <div class="text-sm md:text-sm font-semibold">
                        Link Copied!
                      </div>
                    </template>
                  </GTooltip>
                </div>
                <div
                  class="
                    flex flex-row
                    justify-start
                    items-center
                    text-steel-color
                    md:text-base
                    text-sm
                    h-1/5
                  "
                >
                  <span>Placed by</span>
                  <img
                    src="https://imagedelivery.net/ud0nKgC6_aGi3aA3QSI9OA/vip-rank-icons/platinum-3.png/public"
                    width="35"
                    height="35"
                  />
                  <div
                    @click="openMiniProfile"
                    class="active:scale-95 cursor-pointer hover:text-white"
                  >
                    {{ betData.display_name }}
                  </div>
                </div>
                <div class="flex flex-row items-center h-1/5">
                  <span class="text-steel-color md:text-base text-sm">{{
                    betData.created_at
                  }}</span>
                </div>
              </div>
            </div>
            <div class="bg-secondary-gradient rounded-lg">
              <div class="px-4 pt-[15px]">
                <div
                  class="
                    bg-black-russian-color
                    rounded-lg
                    w-full
                    md:gap-2.5
                    gap-[2px]
                    md:px-[14px]
                    px-1
                    py-2
                    flex flex-col
                    md:flex-row
                    flex-nowrap
                    font-semibold
                  "
                >
                  <div
                    class="
                      w-full
                      md:w-2/5
                      flex flex-col
                      justify-center
                      items-center
                      gap-2
                      pb-2
                      md:pb-0
                      border-b-2
                      md:border-b-0
                      border-divider
                    "
                  >
                    <span class="md:text-base text-sm text-steel-color"
                      >BET</span
                    >
                    <div
                      class="
                        flex flex-row
                        md:gap-1
                        gap-[5px]
                        items-center
                        justify-center
                      "
                    >
                      <span class="text-white md:text-base text-sm">{{
                        !preferences?.displayInfiatEnabled
                          ? Number(betData?.amount).toFixed(7)
                          : `${
                              currencyItems[
                                preferences?.activeFiatCode ?? "USD"
                              ]?.text
                            } ${(
                              Number(betData?.amount) *
                              Number(calcfiatPrice(betData?.currency_code))
                            ).toFixed(2)}`
                      }}</span>
                      <svg class="md:w-4 md:h-4 w-3 h-3 text-white">
                        <use :xlink:href="currencyIcon"></use>
                      </svg>
                    </div>
                  </div>
                  <div class="hidden md:block g-divider-in-panel"></div>
                  <div
                    class="
                      w-full
                      md:w-1/5
                      flex flex-row
                      md:gap-[15px]
                      gap-1
                      justify-center
                      items-center
                      pt-2
                      md:pt-0
                      pb-2
                      md:pb-0
                      border-b-2
                      md:border-b-0
                      border-divider
                    "
                  >
                    <div
                      class="
                        flex flex-col
                        gap-2
                        justify-center
                        items-center
                        px-[5px]
                      "
                    >
                      <span
                        v-if="isMulti"
                        class="md:text-base text-sm text-steel-color"
                        >MULTI</span
                      >
                      <span v-else class="md:text-base text-sm text-steel-color"
                        >MULTIPLIER</span
                      >
                      <div class="flex flex-row gap-1">
                        <span class="text-white md:text-base text-sm"
                          >{{ betData.bet_multiplier.toFixed(2) }}x</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="hidden md:block g-divider-in-panel"></div>
                  <div
                    class="
                      w-full
                      md:w-2/5
                      flex flex-col
                      pt-2
                      md:pt-0
                      gap-2
                      justify-center
                      items-center
                    "
                  >
                    <span class="md:text-base text-sm text-steel-color"
                      >PAYOUT</span
                    >
                    <div
                      class="
                        flex flex-row
                        md:gap-1
                        gap-[5px]
                        items-center
                        justify-center
                      "
                    >
                      <span class="text-white md:text-base text-sm">{{
                        !preferences?.displayInfiatEnabled
                          ? Number(betData?.payout).toFixed(7)
                          : `${
                              currencyItems[
                                preferences?.activeFiatCode ?? "USD"
                              ]?.text
                            } ${(
                              Number(betData?.payout) *
                              Number(calcfiatPrice(betData?.currency_code))
                            ).toFixed(2)}`
                      }}</span>
                      <svg class="md:w-4 md:h-4 w-3 h-3 text-white">
                        <use :xlink:href="currencyIcon"></use>
                      </svg>
                    </div>
                  </div>
                </div>
                <div v-if="betData.game === 'Dice'">
                  <DiceDetails :bet-data="betData"></DiceDetails>
                </div>
                <div v-else-if="betData.game === 'Limbo'">
                  <LimboDetails></LimboDetails>
                </div>
                <div v-else-if="betData.game === 'Mines'">
                  <MinesDetails></MinesDetails>
                </div>
              </div>
              <div class="mt-[19px] bg-ash rounded-b-lg font-semibold">
                <GTransitionHeight
                  :initial-state="isFairnessOpen"
                  v-slot="{ state, setState }"
                >
                  <div
                    @click="setState(!state)"
                    class="
                      relative
                      flex
                      items-center
                      h-[46px]
                      pl-4
                      cursor-pointer
                    "
                  >
                    <span class="md:text-base text-sm text-white"
                      >Provable Fairness</span
                    >
                    <div class="absolute top-1/2 right-4 -translate-y-1/2">
                      <svg
                        class="
                          w-[9px]
                          h-[6px]
                          transition-transform
                          duration-200
                        "
                        :class="
                          state
                            ? 'text-white'
                            : 'text-steel-color group-hover:text-white'
                        "
                        :style="{
                          transform: `rotateX(${state ? '180deg' : '0deg'})`,
                        }"
                      >
                        <use :xlink:href="arrowBelowIcon"></use>
                      </svg>
                    </div>
                  </div>
                  <template v-if="state">
                    <div class="flex flex-col gap-3 px-4 pb-[13px]">
                      <div class="flex flex-col gap-[3px]">
                        <span class="md:text-base text-sm text-steel-color"
                          >Server Seed</span
                        >
                        <CopyInput
                          :model-value="
                            betData.server_seed_unhashed ?? hashedServerSeed
                          "
                        ></CopyInput>
                      </div>
                      <div class="flex flex-col gap-[3px]">
                        <div class="flex flex-row justify-between">
                          <span class="md:text-base text-sm text-steel-color"
                            >Server Seed(Hashed)</span
                          >
                          <div
                            class="
                              md:text-base
                              text-sm
                              cursor-pointer
                              text-green-color
                            "
                            @click="openFairnessModal"
                          >
                            View Seed Settings
                          </div>
                        </div>

                        <CopyInput
                          :model-value="betData.server_seed_hashed"
                        ></CopyInput>
                      </div>
                      <div class="flex flex-row w-full flex-nowrap gap-3">
                        <div class="flex flex-col w-2/3 gap-[3px]">
                          <span class="md:text-base text-sm text-steel-color"
                            >Client Seed</span
                          >
                          <CopyInput
                            :model-value="betData.client_seed"
                          ></CopyInput>
                        </div>
                        <div class="flex flex-col w-1/3 gap-[3px]">
                          <span class="md:text-base text-sm text-steel-color"
                            >Nonce</span
                          >
                          <CopyInput :model-value="betData.nonce"></CopyInput>
                        </div>
                      </div>
                      <div class="flex flex-row items-center justify-center">
                        <span
                          v-if="betData.server_seed_unhashed !== null"
                          class="
                            md:text-base
                            text-sm text-steel-color
                            hover:text-white
                            active:scale-95
                            cursor-pointer
                          "
                          @click="openVerifyModal"
                          >Verify this Bet</span
                        >
                        <span
                          v-else
                          class="
                            md:text-base
                            text-sm text-steel-color
                            hover:text-white
                            active:scale-95
                            cursor-pointer
                          "
                        >
                          How are Results Generated?
                        </span>
                      </div>
                    </div>
                  </template>
                </GTransitionHeight>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <FairnessModal
            :seed-data="betData"
            :vclient-seed="vClientSeed"
            :vserver-seed="vServerSeed"
            :v-nonce="vNonce"
            @update:vclient-seed="handleVClientSeed"
            @update:vserver-seed="handleVServerSeed"
            @update:v-nonce="handleVNonce"
            @handle:change-seed="handleChangeSeed"
          />
        </div>
      </div>
      <div v-else>
        <div
          class="
            pl-[30px]
            pr-[30px]
            pt-[60px]
            pb-[30px]
            flex flex-row
            justify-center
            items-center
          "
        >
          <div
            class="
              p-[30px]
              w-full
              h-[300px]
              my-3
              text-white text-xl
              flex
              justify-center
              items-center
            "
          >
            The bet details can't be displayed
          </div>
        </div>
      </div>
    </div>
    <div class="absolute top-[15px] md:top-5 left-[30px] font-semibold">
      <div
        v-if="modalTitle === 'betdetails'"
        class="flex flex-row items-center gap-1.5"
      >
        <BetDetailsIcon></BetDetailsIcon>
        <span class="text-white md:text-base text-sm">Bet Details</span>
      </div>
      <div v-else class="flex flex-row items-center gap-1.5">
        <GButton style-type="transparent" class="svg-btn" @click="changeTitle">
          <svg class="w-5 h-5 text-white">
            <use :xlink:href="roundLeftArrowIcon"></use>
          </svg>
        </GButton>
        <svg class="w-5 h-5 text-white">
          <use :xlink:href="clipboardIcon"></use>
        </svg>
        <span class="text-white md:text-base text-sm">Fairness</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GButton, GTransitionHeight, GTooltip } from "~/components/atoms";
import CopyInput from "~/components/molecules/inputs/CopyInput.vue";
import { cryptoCurrencies } from "~/constants/micro-constants";
import { BetDetailsIcon, bitcoinIcon, roundLeftArrowIcon } from "~/icons";
import FairnessModal from "~/components/molecules/modals/games/FairnessModal.vue";
import { arrowBelowIcon, copyIcon, linkIcon } from "~/icons";
import { notify } from "~/components/atoms";
import { BET, BET_RESPONSE } from "~/graphql/bet";
import SkeletonLoader from "@/components/molecules/SkeletonLoader.vue";
import DiceDetails from "./dice/BetDetailsModal.vue";
import LimboDetails from "./limbo/BetDetailsModal.vue";
import MinesDetails from "./mines/BetDetailsModal.vue";
import { THEME, AUTH, PREFERENCE, currencyItems } from "~/constants";
const route = useRoute();
const router = useRouter();
const { screen } = inject(THEME)!;
const betData = ref<BET_RESPONSE | undefined>(undefined);
const betLoading = ref<boolean>(false);
const variables = { transaction_id: route.query.betID };
const {
  result: data,
  error,
  loading,
  onError,
  onResult,
  refetch,
} = useQuery<{ data: BET_RESPONSE }>(BET, variables);
betData.value = data.value?.bet;
betLoading.value = loading.value;
onResult(() => {
  betData.value = data.value?.bet;
  betLoading.value = loading.value;
});
onError(() => {
  betLoading.value = loading.value;
  notify.error(
    {
      title: "Error",
      text: error.value?.message?.toString() ?? "",
    },
    4000
  );
});
onMounted(() => {
  try {
    refetch();
  } catch (error: any) {
    console.log("error occured", error);
    notify.error(
      {
        title: "Error",
        text: error?.message?.toString() || "Something went wrong",
      },
      4000
    );
  }
});
const currencyIcon = computed(
  () => betData.value && cryptoCurrencies[betData.value?.currency_code].icon
);
const isFairnessOpen = ref<boolean>(false);
const openFairnessModal = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      betID: betData.value?.transaction_id,
      modal: "fairness",
      tab: "seeds",
    },
  });
};
const openVerifyModal = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      betID: betData.value?.transaction_id,
      modal: "fairness",
      tab: "verify",
      client_seed: betData.value?.client_seed,
      server_seed: betData.value?.server_seed_unhashed,
      nonce: betData.value?.nonce,
    },
  });
};
const modalTitle = ref<string>("betdetails");
const changeTitle = () => {
  modalTitle.value = "betdetails";
};
const vClientSeed = ref<string>("");
const vServerSeed = ref<string>("");
const vNonce = ref<number>(0);
const handleVClientSeed = (value: string) => {
  vClientSeed.value = value;
};
const handleVServerSeed = (value: string) => {
  vServerSeed.value = value;
};
const handleVNonce = (value: number) => {
  vNonce.value = value;
};
const hashedServerSeed = ref<string>("Seed has not been revealed yet");
const handleChangeSeed = (value: string | undefined) => {
  hashedServerSeed.value = value ?? "";
};
onUpdated(() => {
  hashedServerSeed.value = "Seed has not been revealed yet";
});
const copyvisible = ref<boolean>(false);
const linkvisible = ref<boolean>(false);
let copytimer: ReturnType<typeof setTimeout> | undefined = undefined;
let linktimer: ReturnType<typeof setTimeout> | undefined = undefined;
const copyToClipBoard = () => {
  navigator.clipboard.writeText(`/betid:${betData.value?.transaction_id}`);
  copyvisible.value = true;
  linkvisible.value = false;
  clearTimeout(copytimer);
  copytimer = setTimeout(() => {
    copyvisible.value = false;
  }, 1000);
};
const copyLink = () => {
  navigator.clipboard.writeText(
    `${window.location.origin}/casino/home?betID=${betData.value?.transaction_id}&modal=bet`
  );
  linkvisible.value = true;
  copyvisible.value = false;
  clearTimeout(linktimer);
  linktimer = setTimeout(() => {
    linkvisible.value = false;
  }, 1000);
};
const openMiniProfile = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      name: betData.value?.display_name,
      modal: "user",
    },
  });
};
const { me } = inject(AUTH)!;
const { preferences } = inject(PREFERENCE)!;
const calcfiatPrice = (currency: string) => {
  const wallet = me?.value?.wallets.find(
    (wallet: any) => wallet.currency.code === currency
  );
  return wallet?.currency.quotes.values[
    preferences?.value?.activeFiatCode ?? "USD"
  ];
};
const isMulti = computed<boolean>(() => {
  if (preferences.value?.displayInfiatEnabled) {
    if (
      Number(betData.value?.amount) *
        Number(calcfiatPrice(betData.value?.currency_code ?? "BTC")) >
        9999 ||
      Number(betData.value?.payout) *
        Number(calcfiatPrice(betData.value?.currency_code ?? "BTC")) >
        9999
    )
      return true;
  } else {
    if (
      Number(betData.value?.amount) > 9999 ||
      Number(betData.value?.payout) > 9999
    )
      return true;
  }
  return false;
});
</script>
<style scoped>
.svg-btn {
  width: 20px;
  height: 20px;
}
</style>
