<script setup lang="ts">
import { TEST_TRANSACTIONS_DATA } from "~/constants/mock_data";
const emit =
  defineEmits<{
    (e: "button-click"): void;
  }>();
const onDetailsButtonClick = () => {
  emit("button-click");
};
</script>

<template>
  <table
    class="w-full font-proximanova border-separate border-spacing-0 relative"
  >
    <caption class="hidden">
      Transactions table
    </caption>

    <thead>
      <tr
        class="
          text-sm
          font-proximanova font-medium
          leading-[16px]
          text-[#fff]
          uppercase
        "
      >
        <th class="pt-[15px] pb-[35px] text-left pl-[20px]">Time</th>
        <th class="pt-[15px] pb-[35px]">Amount</th>
        <th class="pt-[15px] pb-[35px]">State</th>
        <th class="pt-[15px] pb-[35px]">Transaction</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="row in TEST_TRANSACTIONS_DATA" :key="row.id">
        <tr>
          <td
            class="
              font-proximanova font-medium
              leading-[16px]
              text-[12px] text-slate-color text-left
              pl-[20px]
            "
            :class="
              row.flag
                ? 'border-[2px] border-secondary-color border-r-0 rounded-l-[10px] py-[22px] bg-secondary-gradient'
                : 'py-[27px]'
            "
          >
            {{ row.time }}
          </td>
          <td
            class="
              font-proximanova font-medium
              leading-[16px]
              text-[12px] text-slate-color
              flex flex-row
              justify-center
              items-center
              gap-2
            "
            :class="
              row.flag
                ? 'border-[2px] border-secondary-color border-x-0 py-[22px] bg-secondary-gradient'
                : 'py-[27px]'
            "
          >
            {{ row.amount }}
            <img :src="row.symbol" alt="symbol" :width="16" />
          </td>
          <td
            class="
              py-[22px]
              font-proximanova font-medium
              leading-[16px]
              text-[12px] text-slate-color text-center
            "
            :class="
              row.flag &&
              'border-[2px] border-secondary-color border-x-0 bg-secondary-gradient'
            "
          >
            {{ row.state }}
          </td>
          <td
            class="text-center"
            :class="
              row.flag &&
              'border-[2px] border-secondary-color border-l-0 rounded-r-[10px] bg-secondary-gradient'
            "
          >
            <button
              class="
                bg-clip-text bg-primary-gradient
                font-proximanova font-medium
                text-[12px]
                leading-[16px]
                inline-block
                scale-100
                focus:scale-95
              "
              :style="{ color: 'transparent' }"
              @click="onDetailsButtonClick"
            >
              View details
            </button>
          </td>
        </tr>
      </template>
    </tbody>
    <div
      class="h-[1px] bg-[#3D4350] w-[648px] absolute top-[45px] left-[-30px]"
    />
  </table>
</template>
