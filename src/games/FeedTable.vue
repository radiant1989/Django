<template>
  <div
    class="
      bg-ebony-clay-color
      border-t-2 border-t-cloud-burst-color
      rounded-lg
      px-5
      py-5
      md:pt-[25px]
      md:pb-[30px]
    "
  >
    <div class="flex flex-col gap-5 md:gap-[30px]">
      <div class="flex flex-row justify-between">
        <div class="w-full md:w-[354px]">
          <GTabs
            :tabs="tabs"
            :model-value="selectedTab"
            @update:modelValue="handleTab"
            :disabled="betsLoading || betsUserLoaing || betsHighRollersLoading"
          />
        </div>
        <div class="hidden md:block">
          <ListingSelect
            :options="options"
            class="w-[77px]"
            :model-value="numperpage"
            @update:model-value="handlePerPage"
          ></ListingSelect>
        </div>
      </div>
      <div :class="table">
        <div>
          <div :class="thead" class="mb-5 md:mb-[30px] pb-[15px]">
            <div class="flex flex-row text-sm md:text-base font-semibold">
              <div
                :class="th"
                class="md:pl-[25px] pl-0"
                :style="{ flex: columns[0] }"
              >
                GAME
              </div>
              <div
                v-if="selectedTab !== 'mybets'"
                :class="th"
                :style="{ flex: columns[1] }"
                class="hidden md:block text-start pl-10"
              >
                PLAYER
              </div>
              <div
                :class="th"
                :style="{ flex: columns[2] }"
                class="hidden lg:block text-center"
              >
                TIME
              </div>
              <div
                :class="th"
                :style="{ flex: columns[3] }"
                class="hidden lg:block text-center"
              >
                BET
              </div>
              <div
                :class="th"
                :style="{ flex: columns[4] }"
                class="hidden md:block text-center"
              >
                MULITIPLER
              </div>
              <div
                :class="[th, 'flex justify-end md:justify-center']"
                :style="{ flex: columns[4] }"
                class="text-center"
              >
                PAYOUT
              </div>
            </div>
          </div>
        </div>
        <div :class="[tbody]">
          <div
            v-if="betsLoading || betsUserLoaing || betsHighRollersLoading"
            v-for="index in 10"
            :key="index"
            :class="[tr, trs[(index % 2) - 1]]"
          >
            <div
              v-for="i in selectedTab == 'mybets' ? 5 : 6"
              :style="{ flex: columns[i] }"
              class="mx-8 text-center"
              :class="td"
            >
              <SkeletonLoader class="w-50 h-4 my-3"></SkeletonLoader>
            </div>
          </div>
          <div v-else>
            <div
              v-for="(row, index) in rows"
              :key="index"
              :class="[tr, trs[index % 2]]"
              class="font-semibold"
            >
              <div
                :class="td"
                class="pl-3 md:pl-[27px] text-white cursor-pointer"
                :style="{ flex: columns[0] }"
              >
                <div class="flex flex-row justify-start">
                  <div
                    @click="() => openBetDetails(row?.transaction_id)"
                    class="group flex flex-row gap-[5px] cursor-pointer"
                  >
                    <svg
                      class="
                        w-[14px]
                        h-[14px]
                        md:w-4
                        md:h-4
                        text-steel-color
                        group-hover:text-white
                      "
                    >
                      <use
                        v-if="gameIcons[row.game]"
                        :xlink:href="gameIcons[row.game].icon"
                      ></use>
                    </svg>
                    <button>
                      <div class="group-active:scale-95">{{ row?.game }}</div>
                    </button>
                  </div>
                </div>
              </div>
              <div
                v-if="selectedTab !== 'mybets'"
                :class="[td, 'hidden md:flex justify-start pl-10']"
                :style="{ flex: columns[1] }"
              >
                <div
                  class="
                    flex flex-row
                    gap-[14px]
                    items-center
                    text-white
                    cursor-pointer
                  "
                >
                  <img
                    src="@/public/assets/icons/Game/dice/avatar.png"
                    alt="noimage"
                  />
                  <div
                    class="active:scale-95"
                    @click="
                      () => {
                        openMiniProfile(row?.display_name);
                      }
                    "
                  >
                    {{ row?.display_name }}
                  </div>
                </div>
              </div>
              <div
                :class="td"
                class="hidden lg:block text-center"
                :style="{ flex: columns[2] }"
              >
                {{ convertDateToReadable(row?.processed_at) }}
              </div>
              <div
                :class="td"
                class="hidden lg:flex justify-end"
                :style="{ flex: columns[3] }"
              >
                <div
                  class="
                    flex flex-row
                    gap-1.5
                    text-sm text-center
                    lg:pr-[30%]
                    xl:pr-[35%]
                  "
                >
                  {{
                    !preferences?.displayInfiatEnabled
                      ? convertFormatedNumber(Number(row?.amount).toFixed(7))
                      : `${
                          currencyItems[preferences?.activeFiatCode ?? "USD"]
                            ?.text
                        } ${convertFormatedNumber(
                          (
                            Number(row?.amount) *
                            Number(calcfiatPrice(row?.currency_code))
                          ).toFixed(2)
                        )}`
                  }}
                  <svg class="w-[14px] h-[14px] md:w-4 md:h-4">
                    <use
                      :xlink:href="cryptoCurrencies[row.currency_code].icon"
                    ></use>
                  </svg>
                </div>
              </div>
              <div
                :class="td"
                class="hidden md:block text-center"
                :style="{ flex: columns[5] }"
              >
                {{ (row.bet_multiplier || 0).toFixed(2) }}×
              </div>
              <div
                :class="td"
                class="flex text-sm justify-end"
                :style="{ flex: columns[6] }"
              >
                <div
                  class="
                    flex flex-row
                    items-center
                    gap-1.5
                    pr-[5%]
                    md:pr-[25%]
                    lxl:pr-[30%]
                  "
                >
                  <div
                    class="w-[6px] h-[6px] rounded-full"
                    :class="row.multiplier > 1 ? 'bg-green-color' : 'bg-error'"
                  ></div>
                  <span
                    :class="
                      row.multiplier > 1
                        ? 'text-green-color'
                        : 'text-steel-color'
                    "
                  >
                    {{
                      !preferences?.displayInfiatEnabled
                        ? convertFormatedNumber(Number(row?.payout).toFixed(7))
                        : `${
                            currencyItems[preferences?.activeFiatCode ?? "USD"]
                              ?.text
                          } ${convertFormatedNumber(
                            (
                              Number(row?.payout) *
                              Number(calcfiatPrice(row?.currency_code))
                            ).toFixed(2)
                          )}`
                    }}</span
                  >
                  <svg class="w-[14px] h-[14px] md:w-4 md:h-4">
                    <use
                      :xlink:href="cryptoCurrencies[row.currency_code].icon"
                    ></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject } from "vue";
import { AUTH, PREFERENCE, currencyItems } from "~/constants";
import { GTabs } from "~/components/atoms";
import ListingSelect from "~/components/molecules/selects/ListingSelect.vue";
import { useTable } from "~/libraries/table";
import { gameIcons, cryptoCurrencies } from "~/constants/micro-constants";
import {
  BETSHIGHROLLERS,
  BETS,
  BETS_RESPONSE,
  BETS_BY_USER,
  LIVE_BET,
} from "~/graphql/bet";
import SkeletonLoader from "@/components/molecules/SkeletonLoader.vue";
const { table, thead, tbody, trs, th, tr, td } = useTable();
const columns = [
  "1 1 100px",
  "1 1 100px",
  "1 1 100px",
  "1 1 100px",
  "1 1 100px",
  "1 1 100px",
  "1 1 100px",
];
const tabs = reactive([
  {
    label: "My Bets",
    value: "mybets",
    active: "false",
  },
  {
    label: "All Bets",
    value: "allbets",
    active: "true",
  },
  {
    label: "High Rollers",
    value: "highrollers",
    active: "true",
  },
]);
const me = inject(AUTH)!;
const { preferences } = inject(PREFERENCE)!;
const selectedTab = ref<string>("allbets");
const handleTab = (val: string) => {
  selectedTab.value = val;
};
// const loading = ref<boolean>(false);
type Value = string | number;
const options = [
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];
const numperpage = ref<number>(10);
const filter = reactive({
  limit: 10,
  game_id: "",
});
const allFilter = reactive({
  limit: 10,
  game_id: "",
  amount_start: 0.00000001,
});
const handlePerPage = (val: Value) => {
  numperpage.value = val as number;
  filter.limit = numperpage.value;
  allFilter.limit = numperpage.value;
  refetchAllBets();
  refetchHighRollers();
};
const {
  result: betsHighRollersResult,
  loading: betsHighRollersLoading,
  error: betsHighRollersError,
  refetch: refetchHighRollers,
  onResult: resultHighRollers,
} = useQuery<{
  data: BETS_RESPONSE[];
}>(BETSHIGHROLLERS, filter);
const betsUser = ref<BETS_RESPONSE[]>([]);
const betsRollers = ref<BETS_RESPONSE[]>([]);
betsRollers.value = betsHighRollersResult.value?.betsHighRollers?.results;
resultHighRollers(() => {
  betsRollers.value = betsHighRollersResult.value?.betsHighRollers?.results;
});
let newBetData: BETS_RESPONSE;
const {
  result: betsResult,
  loading: betsLoading,
  error: betsError,
  subscribeToMore: betsSubscribeToMore,
  refetch: refetchAllBets,
  onResult: onBetsResult,
} = useQuery<{
  data: BETS_RESPONSE[];
}>(BETS, allFilter);
betsSubscribeToMore({
  document: LIVE_BET,
  updateQuery(prev, { subscriptionData }) {
    if (!subscriptionData.data.liveBet) return prev;
    console.log("all bets = ", subscriptionData.data.liveBet);
    newBetData = {
      action_id: subscriptionData.data.liveBet.action_id,
      amount: Number(subscriptionData.data.liveBet.amount),
      bet_conditions: "",
      client_seed: "",
      created_at: subscriptionData.data.liveBet.time,
      currency_code: subscriptionData.data.liveBet.currency_code,
      cursor: 0,
      display_name: subscriptionData.data.liveBet.display_name,
      final_results: "0",
      game: subscriptionData.data.liveBet.game,
      issued_at: "",
      multiplier: subscriptionData.data.liveBet.multiplier,
      bet_multiplier: subscriptionData.data.liveBet.bet_multiplier,
      nonce: 0,
      normalized_amount: 0,
      normalized_payout: 0,
      payout: subscriptionData.data.liveBet.payout,
      processed_at:
        subscriptionData.data.liveBet.date +
        " " +
        subscriptionData.data.liveBet.time,
      server_seed_hashed: "",
      server_seed_unhashed: "",
      updated_at: "",
      transaction_id: subscriptionData.data.liveBet.transaction_id,
    };
    console.log(subscriptionData.data.liveBet.user_id, me?.me?.value?.id);
    if (
      me?.isLoggedIn.value &&
      subscriptionData.data.liveBet.user_id === Number(me?.me?.value?.id)
    )
      betsUser.value = [newBetData, ...betsUser.value].slice(
        0,
        numperpage.value
      );
    if (Number(subscriptionData.data.liveBet.amount) < 0.00000001) return prev;
    if (subscriptionData.data.liveBet.high_roller)
      betsRollers.value = [newBetData, ...betsRollers.value].slice(
        0,
        numperpage.value
      );
    console.log("user  = ", betsUser.value);
    return {
      bets: {
        ...prev.bets,
        results: [newBetData, ...prev.bets.results],
      },
    };
  },
});
onBetsResult(() => {});
const rows = computed(() => {
  if (selectedTab.value === "allbets") {
    return betsResult.value?.bets?.results.slice(0, numperpage.value);
  } else if (selectedTab.value === "mybets") {
    if (me?.isLoggedIn.value) {
      return betsUser.value;
    }
    return [];
  } else {
    return betsRollers.value;
  }
});
const enableTabs = () => {
  tabs.map((item, index) => {
    if (!me?.isLoggedIn.value && index === 0)
      tabs[index] = { ...item, active: "false" };
    else tabs[index] = { ...item, active: "true" };
    return item;
  });
};
const betsUserLoaing = ref<boolean>(false);
watch(
  () => me?.isLoggedIn.value,
  (val) => {
    if (val) {
      console.log("mybets is loading...");
      tabs[0] = { ...tabs[0], active: "true" };
      const {
        result: betsByUserResult,
        loading: betsByUserLoading,
        error: betsByUserError,
        refetch: refetchBetsUser,
        onResult: onBetsUserResult,
        onError,
      } = useQuery<{
        data: BETS_RESPONSE[];
      }>(BETS_BY_USER, filter);
      if (betsUser.value.length === 0) refetchBetsUser();
      betsUserLoaing.value = betsByUserLoading.value;
      onBetsUserResult(() => {
        betsUser.value = betsByUserResult.value?.betsByUser.results;
        betsUserLoaing.value = betsByUserLoading.value;
      });
      return watch(
        () => numperpage.value,
        (val) => {
          filter.limit = val;
          refetchBetsUser();
          onBetsUserResult(() => {
            betsUser.value = betsByUserResult.value?.betsByUser.results;
            betsUserLoaing.value = betsByUserLoading.value;
          });
          onError(() => {
            betsUserLoaing.value = betsByUserLoading.value;
          });
        }
      );
    } else {
      betsUser.value = [];
      if (selectedTab.value === "mybets") selectedTab.value = "allbets";
      enableTabs();
    }
  },
  { immediate: true }
);
onMounted(() => {
  refetchAllBets();
  refetchHighRollers();
  if (me?.isLoggedIn.value) {
    // tabs[0]?.active = "true";
    tabs[0] = { ...tabs[0], active: "true" };
    selectedTab.value = "mybets";
  } else {
    // selectedTab.value = "highrollers";
    enableTabs();
  }
});
const router = useRouter();
const openBetDetails = (id: string) => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      betID: id,
      modal: "bet",
    },
  });
};
const openMiniProfile = (name: string) => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      name: name,
      modal: "user",
    },
  });
};
const convertDateToReadable = (date: string) => {
  let process_time: string = date.split(" ")[1];
  let hours: number = Number(process_time.split(":")[0]);
  let minutes: string = `0${process_time.split(":")[1]}`;
  minutes = minutes.slice(-2);
  let suffix_time: string;
  if (hours > 12) {
    suffix_time = "PM";
    hours = hours - 12;
  } else suffix_time = "AM";
  return `${hours}:${minutes} ${suffix_time}`;
};
const calcfiatPrice = (currency: string) => {
  const wallet = me?.me?.value?.wallets.find(
    (wallet: any) => wallet.currency.code === currency
  );
  return wallet?.currency.quotes.values[
    preferences?.value?.activeFiatCode ?? "USD"
  ];
};
const convertFormatedNumber = (val: string) => {
  let result: string = "";
  let isComma: boolean = false;
  let j: number = 0;
  for (let i = val.length - 1; i >= 0; i--) {
    result = val[i] + result;
    if (val[i] === ".") {
      isComma = true;
      continue;
    }
    if (isComma) {
      j++;
      if (j % 3 === 0 && i !== 0) {
        result = "," + result;
      }
    }
  }
  return result;
};
</script>
