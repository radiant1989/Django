<script setup lang="ts">
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import {
  createDaysForCurrentMonth,
  createDaysForPreviousMonth,
  createDaysForNextMonth,
} from "~/libraries/calendar/index";
import CalendarPopover from "../popovers/CalendarPopover.vue";

interface Day {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
}
const props = defineProps({
  selectedDate: String,
});
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = [
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
];
const year = ref<string>("");
const month = ref<string>("");
const date = ref<string>("");
const currentMonthDays = ref<Array<Day>>([]);
const previousMonthDays = ref<Array<Day>>([]);
const nextMonthDays = ref<Array<Day>>([]);

const emit =
  defineEmits<{
    (e: "selected:date", date: string): void;
  }>();
const setMonthDays = (selectedYear: string, selectedMonth: string) => {
  currentMonthDays.value = createDaysForCurrentMonth(
    selectedYear,
    selectedMonth
  );
  previousMonthDays.value = createDaysForPreviousMonth(
    selectedYear,
    selectedMonth
  );
  nextMonthDays.value = createDaysForNextMonth(selectedYear, selectedMonth);
};
onMounted(() => {
  if (props.selectedDate !== "" && props.selectedDate !== undefined) {
    year.value = props.selectedDate?.split("-")[0];
    month.value = props.selectedDate?.split("-")[1];
    date.value = props.selectedDate?.split("-")[2];
  } else {
    year.value = dayjs().format("YYYY");
    month.value = dayjs().format("M");
    date.value = dayjs().format("D");
  }
  setMonthDays(year.value, month.value);
});

const onSelectYear = (index: number) => {
  year.value = years[index];
  setMonthDays(year.value, month.value);
  date.value = "";
};
const onSelectMonth = (index: number) => {
  month.value = String(index + 1);
  date.value = "";
  setMonthDays(year.value, month.value);
};
const onSelectDate = (day: Day) => {
  date.value = String(day.dayOfMonth);
  emit("selected:date", day.date);
};
const onSelectPreviousMonth = () => {
  if (Number(month.value) === 1) {
    month.value = "12";
    year.value = String(Number(year.value) - 1);
  } else {
    month.value = String(Number(month.value) - 1);
  }
  date.value = "";
  setMonthDays(year.value, month.value);
};
const onSelectNextMonth = () => {
  if (Number(month.value) === 12) {
    month.value = "1";
    year.value = String(Number(year.value) + 1);
  } else {
    month.value = String(Number(month.value) + 1);
  }
  date.value = "";
  setMonthDays(year.value, month.value);
};
</script>
<template>
  <div
    class="
      border-secondary-color border-[2px]
      rounded-lg
      bg-secondary-gradient
      w-[200px]
      z-100
    "
  >
    <div class="grid grid-cols-2 pt-[15px] pl-[20px] pb-[10px] gap-3">
      <div>
        <CalendarPopover :list="months" />
      </div>
      <div class="h-[20px]">
        <CalendarPopover :list="years" />
      </div>
    </div>
    <div class="pb-[15px] text-center">
      <div
        class="
          grid grid-cols-7
          pb-[5px]
          text-[10px] text-slate-color
          border-b-[1px] border-b-[#3d4350]
        "
      >
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>Wd</div>
        <div>Th</div>
        <div>Fr</div>
        <div>St</div>
      </div>

      <div class="grid grid-cols-7 pt-[5px] gap-x-[8px] px-[4px]">
        <div
          class="
            rounded-[5px]
            hover:bg-secondary-hover-gradient
            text-slate-color text-[10px]
            leading-[16px]
            flex
            items-center
            justify-center
            cursor-pointer
            py-[2px]
          "
          v-for="day in previousMonthDays"
          :key="day.date"
          @click="onSelectPreviousMonth"
        >
          {{ day.dayOfMonth }}
        </div>
        <div
          class="
            box-border
            rounded-[5px]
            py-[2px]
            text-center text-[10px] text-white
            cursor-pointer
            border-[1.7px]
          "
          v-for="day in currentMonthDays"
          :class="
            Number(day.dayOfMonth) === Number(date)
              ? 'bg-primary-gradient shadow-primary-outline backdrop-blur-[2.3px] border-primary-color border-[1.7px]'
              : ' hover:bg-secondary-hover-gradient  border-transparent hover:border-secondary-hover-color '
          "
          style="transform: matrix(1, 0, 0, -1, 0, 0)"
          :key="day.date"
          @click="onSelectDate(day)"
        >
          <div style="transform: matrix(1, 0, 0, -1, 0, 0)">
            {{ day.dayOfMonth }}
          </div>
        </div>
        <div
          class="
            rounded-[5px]
            hover:bg-secondary-hover-gradient
            text-slate-color text-[10px]
            leading-[16px]
            flex
            items-center
            justify-center
            cursor-pointer
          "
          v-for="day in nextMonthDays"
          :key="day.date"
          @click="onSelectNextMonth"
        >
          {{ day.dayOfMonth }}
        </div>
      </div>
    </div>
  </div>
</template>
