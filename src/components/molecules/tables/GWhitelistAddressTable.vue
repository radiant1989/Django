<script setup lang="ts">
import { TEST_TABLE_DATA } from "~/constants/mock_data";

const onDeleteBtnClick = () => {
  (document.activeElement as HTMLElement)?.blur();
};
</script>
<template>
  <table
    class="
      w-full
      mt-[15px]
      relative
      font-proximanova
      border-separate border-spacing-0
    "
  >
    <caption class="hidden">
      Whitelist address table
    </caption>
    <thead>
      <tr
        class="
          text-sm
          font-proximanova font-medium
          leading-[16px]
          text-[#fff] text-left
        "
      >
        <th class="pt-[15px] pb-[35px] pl-[20px]">COIN</th>
        <th class="pt-[15px] pb-[35px] text-center">NAME</th>
        <th class="pt-[15px] pb-[35px] text-center">ADDRESS</th>
        <th class="pt-[15px] pb-[35px] text-center">ACTION</th>
      </tr>
    </thead>
    <tbody class="text-left">
      <template v-for="row in TEST_TABLE_DATA" :key="row.id">
        <tr :class="row.flag ? ' bg-secondary-gradient' : ' bg-opacity-0'">
          <td
            class="
              font-proximanova font-medium
              leading-[16px]
              text-sm text-[#fff]
              pl-[20px]
              w-[25%]
            "
            :class="
              row.flag
                ? 'border-[2px] border-secondary-color border-r-0 rounded-l-[10px]'
                : 'py-[27px]'
            "
          >
            {{ row.coin }}
          </td>
          <td
            class="
              py-[22px]
              font-proximanova font-medium
              leading-[16px]
              text-sm text-[#fff] text-center
            "
            :class="
              row.flag && 'border-[2px] border-secondary-color border-x-0'
            "
          >
            {{ row.name }}
          </td>
          <td
            class="
              py-[22px]
              font-proximanova font-medium
              leading-[16px]
              text-sm text-[#fff] text-center
            "
            :class="
              row.flag && 'border-[2px] border-secondary-color border-x-0'
            "
          >
            {{ row.address.slice(0, 6) }}...{{
              row.address.slice(row.address.length - 4, row.address.length)
            }}
          </td>
          <td
            class="text-center"
            :class="
              row.flag &&
              'border-[2px] border-secondary-color border-l-0 rounded-r-[10px]'
            "
          >
            <button
              class="
                bg-clip-text bg-danger-gradient
                font-proximanova font-medium
                text-sm
                leading-[17px]
                inline-block
                scale-100
                focus:scale-95
              "
              :style="{ color: 'transparent' }"
              @click="onDeleteBtnClick"
            >
              DELETE
            </button>
          </td>
        </tr>
      </template>
    </tbody>
    <div
      class="h-[1px] bg-[#3D4350] w-[525px] absolute top-[45px] left-[-30px]"
    />
  </table>
</template>
