<template>
  <div
    class="pt-5 lg:pt-[70px] lg:pb-[90px] pb-[80px] min-h-[505px] max-h-[725px]"
  >
    <div class="flex flex-col gap-5 lg:gap-[30px] mt-[25px]">
      <div
        class="
          flex
          lg:flex-row
          flex-col-reverse
          gap-[19px]
          lg:gap-[28px]
          w-full
          px-5
          lg:px-[30px]
        "
      >
        <div v-if="screen.lg" class="lg:w-1/4 w-1/2 flex flex-col gap-2.5">
          <span class="text-steel-color text-xs md:text-sm font-semibold"
            >Game</span
          >
          <GSelect
            :options="options"
            dropdownHeight="185px"
            :model-value="game"
            @update:model-value="handleGame"
          ></GSelect>
        </div>
        <div
          class="
            flex flex-row
            gap-[19px]
            lg:gap-[28px]
            lg:w-1/2
            w-full
            font-semibold
          "
        >
          <div class="flex flex-col gap-2.5">
            <span class="text-steel-color text-xs md:text-sm">Bet Amount</span>
            <div class="flex flex-row gap-1 items-center">
              <GInput
                :model-value="amountstart"
                @update:modelValue="handleAmountStart"
              ></GInput>
              <span class="text-steel-color">-</span>
              <GInput
                :model-value="amountend"
                @update:modelValue="handleAmountEnd"
              ></GInput>
            </div>
          </div>
          <div class="flex flex-col gap-2.5">
            <span class="text-steel-color text-xs md:text-sm">Payout</span>
            <div class="flex flex-row gap-1 items-center">
              <GInput
                :model-value="payoutstart"
                @update:modelValue="handlePayoutStart"
              ></GInput>
              <span class="text-steel-color">-</span>
              <GInput
                :model-value="payoutend"
                @update:modelValue="handlePayoutEnd"
              ></GInput>
            </div>
          </div>
        </div>
        <div
          class="
            lg:w-1/4
            w-full
            flex
            lg:flex-col
            flex-row-reverse
            lg:justify-end
            gap-[19px]
          "
        >
          <div class="lg:w-full w-1/2">
            <GPopover>
              <template #trigger>
                <GButton style-type="secondary" class="no-padding">
                  <div class="flex flex-row items-center justify-center gap-2">
                    <svg class="w-[14px] h-[12px] text-white">
                      <use :xlink:href="calendarIcon"></use>
                    </svg>
                    <span class="text-white text-xs md:text-sm font-semibold"
                      >Select Date</span
                    >
                  </div>
                </GButton>
              </template>
              <template #panel="{ close }">
                <GCalendar
                  :selected-date="selectedDate"
                  @selected:date="
                    (value:string) => {
                      close();
                      handleDate(value);
                    }
                  "
                >
                </GCalendar>
              </template>
            </GPopover>
          </div>
          <div v-if="!screen.lg" class="lg:w-full w-1/2">
            <GSelect
              :options="options"
              dropdownHeight="185px"
              :model-value="game"
              @update:model-value="handleGame"
            ></GSelect>
          </div>
        </div>
      </div>

      <!-- Deskto Table -->
      <div class="px-[15px] lg:px-[30px]">
        <div :class="table" class="overflow-hidden">
          <div :class="thead" class="pb-[15px] mb-[15px]">
            <div class="flex px-3 lg:px-5">
              <div
                :class="th"
                :style="{ flex: columns[0] }"
                class="text-xs md:text-sm"
              >
                GAME/TIME
              </div>
              <div
                :class="th"
                :style="{ flex: columns[1] }"
                class="text-center text-xs md:text-sm"
              >
                BET AMOUNT
              </div>
              <div
                :class="th"
                :style="{ flex: columns[2] }"
                class="text-center text-xs md:text-sm"
              >
                PAYOUT
              </div>
            </div>
          </div>
          <div
            :class="[
              tbody,
              'overflow-y-scroll overflow-x-hidden container-snap lg:max-h-[370px] max-h-[226px]',
            ]"
          >
            <div
              v-if="loading"
              v-for="index in 10"
              :key="index"
              :class="[tr, trs[(index % 2) - 1]]"
            >
              <div
                v-for="i in 3"
                :style="{ flex: columns[i] }"
                class="mx-8 text-center"
                :class="td"
              >
                <SkeletonLoader class="w-14 h-4 my-3"></SkeletonLoader>
              </div>
            </div>
            <div v-else>
              <div
                v-for="(row, index) in rows"
                :class="[tr, trs[index % 2], 'px-3 lg:px-5']"
                clss="cursor-pointer"
              >
                <div :class="[td]" :style="{ flex: columns[0] }">
                  <button
                    class="text-white text-xs md:text-sm hidden lg:block"
                    @click="handleClick"
                  >
                    {{ row?.game }}
                  </button>
                  <div>{{ row?.processed_at }}</div>
                </div>
                <div
                  :class="td"
                  class="text-white text-center text-xs md:text-sm"
                  :style="{ flex: columns[1] }"
                >
                  <div class="flex flex-row gap-1 items-center justify-center">
                    {{ row.amount.toFixed(8) }}
                    <svg class="w-[18px] h-[14px] text-primary-color">
                      <use :xlink:href="jewelleryIcon"></use>
                    </svg>
                  </div>
                </div>
                <div
                  :class="td"
                  class="text-primary-color text-center text-xs md:text-sm"
                  :style="{ flex: columns[2] }"
                >
                  <div class="flex flex-row gap-1 items-center justify-center">
                    {{ (row.payout * 100).toFixed(2) }}
                    <svg class="w-[18px] h-[14px] text-primary-color">
                      <use :xlink:href="jewelleryIcon"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="absolute -top-10 lg:top-5 lg:left-[30px] left-0 font-semibold">
    <span class="text-white lg:text-base text-xl">Bet Transactions</span>
  </div>
  <div
    class="
      absolute
      bottom-0
      h-[50px]
      lg:h-[60px]
      bg-secondary-gradient
      w-full
      rounded-b-md
    "
    :class="isProcess && 'pointer-events-none'"
  >
    <Footer
      :max-page="maxpageNum"
      :current-pageNum="currentpageNum"
      :is-process="isProcess"
      @set:page-limit="handlePageLimit"
      @set:page-number="handlePageNumber"
      @set:currency-code="handleCurrencyCode"
    ></Footer>
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from "vue";
import { GSelect, GInput, GButton, GPopover } from "~/components/atoms";
import GCalendar from "~/components/molecules/calendars/GCalendar.vue";
import Footer from "~/components/organisms/wallet/Footer.vue";
import { calendarIcon, jewelleryIcon } from "~/icons";
import { useTable } from "~/libraries/table";
import { THEME } from "~/constants";
import { BETS_RESPONSE, BETS_BY_USER } from "~/graphql/bet";
import SkeletonLoader from "@/components/molecules/SkeletonLoader.vue";

const { screen } = inject(THEME)!;
const isProcess = ref<boolean>(false);
const rows = ref<BETS_RESPONSE[]>([]);
const totalrows = ref<BETS_RESPONSE[]>([]);
const currentpageNum = ref<number>(0);
const maxpageNum = ref<number>(0);
const exclusive_start_key = ref<any>(null);
const filter = reactive({
  limit: 10,
  game_id: "",
  amount_start: 0,
  amount_end: 0,
  payout_start: 0,
  payout_end: 0,
  // starts_at: null,
  // ends_at: null,
  // currency_code: "BTC",
  exclusive_start_key: null,
});
const options = [
  { label: "All", value: "all" },
  { label: "Dice", value: "dice" },
  { label: "Keno", value: "keno" },
  { label: "Mines", value: "mines" },
  { label: "Dice", value: "Dice" },
  { label: "Crash", value: "crash" },
];
const game = ref<string>("dice");
const handleClick = () => {
  //  emits("open:detailModal", props?.item);
};
const loading = ref<boolean>(false);
onMounted(async () => {
  await fetchData();
});
const fetchData = async () => {
  loading.value = true;
  rows.value = [];
  isProcess.value = true;
  const { data } = await useAsyncQuery<{
    results: BETS_RESPONSE[];
  }>(BETS_BY_USER, filter);
  if (!data.value?.betsByUser) throw new Error("Sth went wrong");
  isProcess.value = false;
  rows.value = data.value?.betsByUser?.results;
  totalrows.value = totalrows.value.concat(data.value?.betsByUser?.results);
  //max page set
  if (data?.value?.betsByUser?.paginate?.page_count === filter.limit) {
    //there are items remained
    maxpageNum.value++;
  }
  exclusive_start_key.value =
    data?.value?.betsByUser?.paginate?.exclusive_start_key;
  loading.value = false;
  console.log(currentpageNum.value, maxpageNum.value);
};
const handleGame = async (value: string) => {
  game.value = value;
  if (value === "all") filter.game_id = "";
  else if (value === "mines") filter.game_id = "1870";
  else if (value === "dice") filter.game_id = "1868";
  else filter.game_id = "500";
  await fetchData();
};
const init = () => {
  currentpageNum.value = 0;
  totalrows.value = [];
  filter.exclusive_start_key = null;
  exclusive_start_key.value = null;
  maxpageNum.value = 0;
};
const currentDate = new Date();
const year = currentDate.getFullYear(); // e.g., 2022
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // e.g., 06
const day = String(currentDate.getDate()).padStart(2, "0"); // e.g., 18
const formattedDate = `${year}-${month}-${day}`;
const selectedDate = ref<string>(formattedDate);
const handleDate = async (value: string) => {
  selectedDate.value = value;
  init();
  filter.starts_at = value;
  filter.ends_at = value;
  await fetchData();
};
const { table, thead, tbody, trs, th, tr, td } = useTable();
const columns = ["1 1 100px", "1 1 80px", "1 1 60px"];
const amountstart = ref<number>(0);
const amountend = ref<number>(0);
const payoutstart = ref<number>(0);
const payoutend = ref<number>(0);
const handleAmountStart = async (value: string | number) => {
  amountstart.value = Number(value);
  init();
  filter.amount_start = Number(value);
  await fetchData();
};
const handleAmountEnd = async (value: string | number) => {
  amountend.value = Number(value);
  init();
  filter.amount_end = Number(value);
  await fetchData();
};
const handlePayoutStart = async (value: string | number) => {
  payoutstart.value = Number(value);
  init();
  filter.payout_start = Number(value);
  await fetchData();
};
const handlePayoutEnd = async (value: string | number) => {
  payoutend.value = Number(value);
  init();
  filter.payout_end = Number(value);
  await fetchData();
};
const handlePageLimit = async (value: number) => {
  filter.limit = value;
  init();
  await fetchData();
};
const handlePageNumber = async (value: number) => {
  //fetch data if next
  currentpageNum.value = value;
  console.log(value, maxpageNum.value);
  if (value >= maxpageNum.value) {
    filter.exclusive_start_key = exclusive_start_key.value
      ? JSON.stringify(exclusive_start_key.value)
      : "";
    await fetchData();
    console.log(value, maxpageNum.value);
  }
  //filter on the frontend
  else {
    rows.value = totalrows.value.slice(
      value * filter.limit,
      (value + 1) * filter.limit - 1
    );
  }
};
const handleCurrencyCode = async (value: string) => {
  init();
  if (value === "All") {
    // filter.currency_code = "";
    delete filter.currency_code;
  } else filter.currency_code = value;
  await fetchData();
};
</script>
<style scoped>
.no-padding {
  padding: 0 0 0 0;
}
.container-snap::-webkit-scrollbar {
  display: none;
}
</style>
