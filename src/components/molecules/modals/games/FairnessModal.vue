<template>
  <div class="pl-[27px] pt-[60px] pr-[30px] pb-[27px] font-semibold">
    <div v-if="!betData && !seedData">
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
        <SkeletonLoader
          class="px-[27px] w-full h-[300px] my-3"
        ></SkeletonLoader>
      </div>
    </div>
    <div v-else>
      <GTabs :tabs="tabs" v-model="selectedTab" />
      <div class="mt-[21px]">
        <div v-if="selectedTab === 'seeds'" class="pb-[5px]">
          <div class="flex flex-col gap-[18px]">
            <div class="flex flex-col gap-2.5">
              <span class="text-steel-color md:text-base text-sm font-semibold"
                >Active Client Seed</span
              >
              <CopyInput :model-value="activeClientSeed ?? ''"></CopyInput>
            </div>
            <div class="flex flex-col gap-2.5">
              <span class="text-steel-color md:text-base text-sm"
                >Active Server Seed(Hashed)</span
              >
              <CopyInput
                :model-value="activeHashedServerSeed ?? ''"
              ></CopyInput>
            </div>

            <div class="flex flex-col gap-2.5">
              <span class="text-steel-color md:text-base text-sm"
                >Total Bets made with Pair</span
              >
              <CopyInput :model-value="totalBets ?? ''"></CopyInput>
            </div>
          </div>
          <div class="g-h-divider-in-panel mt-[21px]"></div>
          <div class="flex flex-col gap-[18px] mt-[18px]">
            <div class="flex flex-row items-center justify-center">
              <span class="text-white md:text-base text-sm"
                >Rotate Seed Pair</span
              >
            </div>
            <div class="flex flex-col gap-2.5">
              <span class="text-steel-color md:text-base text-sm"
                >Client Seed</span
              >
              <GInput v-model="new_clientSeed">
                <template #suffix>
                  <GButton
                    style-type="primary"
                    class="change-btn"
                    @click="changeSeeds"
                    >Change</GButton
                  >
                </template>
              </GInput>
            </div>
          </div>
        </div>
        <div v-else>
          <div
            class="
              pt-[21px]
              pb-[29px]
              bg-secondary-gradient
              rounded-lg
              px-4
              pointer-events-none
            "
          >
            <div v-if="game === 'Dice'">
              <DiceFairness
                :client-seed="vclientSeed"
                :server-seed="vserverSeed"
                :nonce-value="vNonce"
                :calc-result="calcResult"
              />
            </div>
            <div v-else-if="game === 'Limbo'">
              <LimboFairness />
            </div>
            <div v-else-if="game === 'Mines'">
              <MinesFairness />
            </div>
          </div>
          <div class="mt-5 flex flex-col gap-5 pl-[2px]">
            <div class="flex flex-col gap-2.5">
              <span class="text-steel-color md:text-base text-sm">Game</span>
              <GSelect
                :options="options"
                dropdownHeight="185px"
                :model-value="game"
                @update:model-value="handleGame"
              ></GSelect>
            </div>
            <div class="flex flex-col gap-2.5">
              <span class="text-steel-color md:text-base text-sm"
                >Client Seed</span
              >
              <GInput
                style-type="dark"
                :model-value="vclientSeed"
                @update:model-value="handleVClientSeed"
                :autolost-focus="1000"
                @blur="handleVerifyGame"
              ></GInput>
            </div>
            <div class="flex flex-col gap-2.5">
              <span class="text-steel-color md:text-base text-sm"
                >Server Seed</span
              >
              <GInput
                style-type="dark"
                :model-value="vserverSeed"
                @update:model-value="handleVServerSeed"
                :autolost-focus="1000"
                @blur="handleVerifyGame"
              ></GInput>
            </div>
            <div class="flex flex-col gap-2.5">
              <span class="text-steel-color md:text-base text-sm">Nonce</span>
              <GInput
                style-type="dark"
                :model-value="vNonce"
                @update:model-value="handleVNonce"
                :autolost-focus="1000"
                @blur="handleVerifyGame"
              ></GInput>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="absolute top-5 left-[30px] font-semibold">
    <div class="flex flex-row items-center gap-1.5">
      <GButton
        v-if="!route.query.noback"
        style-type="transparent"
        class="svg-btn"
        @click="openBetDetails"
      >
        <svg class="w-5 h-5 text-white">
          <use :xlink:href="roundLeftArrowIcon"></use>
        </svg>
      </GButton>
      <FairnessIcon></FairnessIcon>
      <span class="text-white md:text-base text-sm">Fairness</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GTabs, GInput, GSelect, GButton, notify } from "~/components/atoms";
import CopyInput from "~/components/molecules/inputs/CopyInput.vue";
import DiceFairness from "./dice/FairnessModal.vue";
import LimboFairness from "./limbo/FairnessModal.vue";
import MinesFairness from "./mines/FairnessModal.vue";
import SkeletonLoader from "@/components/molecules/SkeletonLoader.vue";
import {
  FairnessIcon,
  roundLeftArrowIcon,
  seedErrorIcon,
  vv2Icon,
} from "~/icons";
import {
  BET_RESPONSE,
  SEED_RESPONSE,
  CREATE_NEW_PAIR,
  BET,
  GET_CURRENT_PAIR,
  SEED_PAIR_RESPONSE,
} from "~/graphql/bet";
const route = useRoute();
const vclientSeed = ref<string>(route.query.client_seed ?? "");
const vserverSeed = ref<string>(route.query.server_seed ?? "");
const vNonce = ref<number>(route.query.nonce ?? 0);
const tabs = [
  {
    label: "Seeds",
    value: "seeds",
  },
  {
    label: "Verify",
    value: "verify",
  },
];
const selectedTab = ref<string>(route.query.tab ?? "seeds");
const options = [
  { label: "Dice", value: "dice" },
  { label: "Keno", value: "keno" },
  { label: "Mines", value: "mines" },
  { label: "Dice", value: "Dice" },
  { label: "Crash", value: "crash" },
];
const game = ref<string>("Dice");
const handleGame = (value: string | number) => {
  game.value = value.toString();
};
const new_clientSeed = ref<string>("");
const newpairMutate = useMutation(CREATE_NEW_PAIR).mutate;
const newSeeds = ref<SEED_RESPONSE>();
const activeClientSeed = ref<string>("");
const activeHashedServerSeed = ref<string>("");
const totalBets = ref<number>(0);
const changeSeeds = async () => {
  let errorTitle: string = "Error";
  try {
    if (new_clientSeed.value.trim().length === 0) {
      errorTitle = "Empty Client Seed Input";
      throw new Error(
        "You've clicked 'Change' but left the Client Seed input box empty. Please enter a value to proceed."
      );
    }
    const res = await newpairMutate({
      newClientSeed: new_clientSeed.value,
      gameId: 1868,
    });
    if (!res?.data?.createNewPair)
      throw new Error("new Pair generation failed");
    newSeeds.value = res?.data?.createNewPair;
    notify.success(
      {
        title: "Client Seed Changed",
        text: "Your client seed has been successfully changed.",
        icon: {
          class: "w-10 h-[38px]",
          href: vv2Icon,
        },
      },
      4000
    );
  } catch (error: any) {
    console.log(error);
    notify.error(
      {
        title: errorTitle,
        text: error?.message?.toString() || "Something went wrong",
        icon: {
          class: "w-10 h-[38px]",
          href: seedErrorIcon,
        },
      },
      4000
    );
  }
  if (newSeeds.value) {
    activeClientSeed.value = newSeeds?.value?.clientSeed?.client_seed;
    activeHashedServerSeed.value =
      newSeeds?.value?.serverSeed?.server_seed_hashed;
    totalBets.value = Number(newSeeds?.value?.clientSeed.nonce);
  }
};
const handleVClientSeed = (value: string | number) => {
  vclientSeed.value = value.toString();
};
const handleVServerSeed = (value: string | number) => {
  vserverSeed.value = value.toString();
};
const handleVNonce = (value: string | number) => {
  vNonce.value = Number(value);
};
const betData = ref<BET_RESPONSE | undefined>(undefined);
const seedData = ref<SEED_PAIR_RESPONSE | undefined>(undefined);
const calcResult = ref<boolean>(false);
const handleVerifyGame = () => {
  calcResult.value = !calcResult.value;
};
watch(
  () => route.query.betID,
  async () => {
    handleVerifyGame();
    try {
      if (route.query.betID) {
        const variables = { transaction_id: route.query.betID };
        const { data } = await useAsyncQuery<{ bet: BET_RESPONSE }>(
          BET,
          variables
        );
        if (data?.value?.bet) {
          betData.value = data?.value?.bet;
          activeClientSeed.value = betData.value?.client_seed;
          activeHashedServerSeed.value = betData.value?.server_seed_hashed;
          totalBets.value = betData.value?.nonce;
        } else throw new Error("sth is wrong");
      } else {
        const { data } = await useAsyncQuery<{
          getCurrentPair: SEED_PAIR_RESPONSE;
        }>(GET_CURRENT_PAIR, { game_id: 1868 });
        if (data?.value?.getCurrentPair) {
          seedData.value = data?.value?.getCurrentPair;
          activeClientSeed.value = seedData.value?.clientSeed?.client_seed;
          activeHashedServerSeed.value =
            seedData.value?.serverSeed?.server_seed_hashed;
          totalBets.value = seedData.value?.clientSeed?.nonce;
        } else throw new Error("sth is wrong");
      }
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
  },
  { immediate: true }
);

const router = useRouter();
const openBetDetails = () => {
  if (!route.query.betID) return;
  router.push({
    path: router.currentRoute.value.path,
    query: {
      betID: betData.value?.transaction_id,
      modal: "bet",
    },
  });
};
</script>
<style scoped>
.svg-btn {
  width: 20px;
  height: 20px;
}

@media (min-width: 768px) {
  .change-btn {
    height: 45px;
    border-radius: 0px 10px 10px 0px;
    padding: 0px 25px 0px 25px;
  }
}
@media (max-width: 768px) {
  .change-btn {
    height: 40px;
    border-radius: 0px 10px 10px 0px;
    padding: 0px 15px 0px 15px;
  }
}
</style>
