<script setup lang="ts">
import { TEST_OTHER_TRANSACTIONS_DATA } from "~/constants/mock_data";
</script>

<template>
  <table
    class="w-full font-proximanova border-separate border-spacing-0 relative"
  >
    <caption class="hidden">
      Other transactions table
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
        <th class="pt-[15px] pb-[35px] text-left pl-[20px]">Type/Time</th>
        <th class="pt-[15px] pb-[35px]">Amount</th>
        <th class="pt-[15px] pb-[35px]">Balance</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <template v-for="row in TEST_OTHER_TRANSACTIONS_DATA" :key="row.id">
        <tr>
          <td
            class="
              pl-[20px]
              font-proximanova font-medium
              leading-[16px]
              text-[12px] text-slate-color text-left
            "
            :class="
              row.flag
                ? 'border-[2px] border-secondary-color border-r-0 rounded-l-[10px] py-[14px] bg-secondary-gradient'
                : 'py-[19px]'
            "
          >
            <p class="text-sm text-[#fff]">
              {{ row.type === 0 ? "Deposit" : "Withdrawal" }}
            </p>
            {{ row.time }}
          </td>
          <td
            class="
              font-proximanova font-medium
              leading-[16px]
              text-[12px] text-slate-color
            "
            :class="
              row.flag
                ? 'border-[2px] border-secondary-color border-x-0 bg-secondary-gradient'
                : ''
            "
          >
            <p class="inline-block">{{ row.amount }}</p>
            <img
              :src="row.symbol"
              alt="symbol"
              :width="16"
              class="inline-block ml-[8px]"
            />
          </td>
          <td
            class="
              font-proximanova font-medium
              leading-[16px]
              text-[12px] text-slate-color
            "
            :class="
              row.flag &&
              'border-[2px] border-secondary-color border-l-0 rounded-r-[10px] bg-secondary-gradient'
            "
          >
            <p class="inline-block">{{ row.balance }}</p>
            <img
              :src="row.symbol"
              alt="symbol"
              :width="16"
              class="inline-block ml-[8px]"
            />
          </td>
        </tr>
      </template>
    </tbody>
    <div
      class="h-[1px] bg-[#3D4350] w-[648px] absolute top-[45px] left-[-30px]"
    />
  </table>
</template>
