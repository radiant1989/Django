<script setup lang="ts">
const options = ref({
  chart: {
    type: "area",
    sparkline: {
      enabled: true,
    },
  },
  subtitle: {
    text: "Wagered",
    offsetX: 0,
    style: {
      fontSize: "14px",
    },
  },
  stroke: {
    curve: "straight",
  },
  fill: {
    opacity: 0.3,
  },
  yaxis: {
    min: 0,
  },
  colors: ["#ffffff"],
  title: {
    text: "$424,652",
    offsetX: 0,
    style: {
      fontSize: "24px",
      color: "#ffffff",
      fontWeight: "600",
    },
  },
});
const options2 = ref({
  chart: {
    type: "area",
    sparkline: {
      enabled: true,
    },
  },
  subtitle: {
    text: "Profit",
    offsetX: 0,
    style: {
      fontSize: "14px",
      color: "#ffffff",
    },
  },
  stroke: {
    curve: "straight",
  },
  fill: {
    opacity: 0.3,
  },
  yaxis: {
    min: 0,
  },
  colors: ["#DCE6EC"],
  title: {
    text: "$13,652",
    offsetX: 0,
    style: {
      fontSize: "24px",
      color: "#ffffff",
      fontWeight: "600",
    },
  },
});
const options3 = ref({
  chart: {
    type: "area",
    sparkline: {
      enabled: true,
    },
  },
  subtitle: {
    text: "Bonuses",
    offsetX: 0,
    style: {
      fontSize: "14px",
    },
  },
  stroke: {
    curve: "straight",
  },
  fill: {
    opacity: 0.3,
  },
  yaxis: {
    min: 0,
  },
  colors: ["#DCE6EC"],
  title: {
    text: "$24,652",
    offsetX: 0,
    style: {
      fontSize: "24px",
      color: "#ffffff",
      fontWeight: "600",
    },
  },
});
const series = ref([
  {
    name: "$",
    data: [],
  },
]);
const seriesSpark2 = ref([
  {
    name: "$",
    data: [],
  },
]);
const seriesSpark3 = ref([
  {
    name: "$",
    data: [],
  },
]);
const updateChart = () => {
  //generate array of random numbers of length 10
  const data = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 100)
  );
  options.value = {
    ...options.value,
    xaxis: {
      categories: Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - i
      ), // array of last 10 years
    },
  };
  options2.value = {
    ...options2.value,
    xaxis: {
      categories: Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - i
      ), // array of last 10 years
    },
  };
  options3.value = {
    ...options3.value,
    xaxis: {
      categories: Array.from(
        { length: 10 },
        (_, i) => new Date().getFullYear() - i
      ), // array of last 10 years
    },
  };
  series.value = [
    {
      name: "$",
      data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
    },
  ];
  seriesSpark2.value = [
    {
      name: "$",
      data: [44, 14, 54, 47, 42, 12, 4, 55, 2, 19, 14],
    },
  ];
  seriesSpark3.value = [
    {
      name: "$",
      data: [14, 22, 6, 22, 61, 25, 22, 55, 65, 52, 32],
    },
  ];
};
onMounted(() => {
  //generate array of random numbers of length 10
  updateChart();
});
</script>
<template>
  <div class="mt-8">
    <div class="mt-8">
      <div>
        <span
          class="font-medium text-base text-white"
          style="padding-left: 20px"
          >Charts Example</span
        >
      </div>
    </div>
  </div>
  <div class="mt-4">
    <div class="flex flex-wrap -mx-6" style="max-width: 1200px; margin: 0 auto">
      <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
        <div
          class="flex items-center px-5 py-6 shadow-sm rounded-md"
          style="background-color: #212530"
        >
          <div style="margin: 0 auto">
            <ClientOnly>
              <apexchart
                height="200"
                type="area"
                :options="options"
                :series="series"
              ></apexchart>
            </ClientOnly>
          </div>
        </div>
      </div>

      <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
        <div
          class="flex items-center px-5 py-6 shadow-sm rounded-md"
          style="background-color: #212530"
        >
          <div style="margin: 0 auto">
            <ClientOnly>
              <apexchart
                height="200"
                type="area"
                :options="options2"
                :series="seriesSpark2"
              ></apexchart>
            </ClientOnly>
          </div>
        </div>
      </div>

      <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
        <div
          class="flex items-center px-5 py-6 shadow-sm rounded-md"
          style="background-color: #212530"
        >
          <div style="margin: 0 auto">
            <ClientOnly>
              <apexchart
                height="200"
                type="area"
                :options="options3"
                :series="seriesSpark3"
              ></apexchart>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-8"></div>
</template>
<style>
h1,
h2,
h3,
h4,
h5,
h6,
strong {
  font-weight: 600;
}
</style>
