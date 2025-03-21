<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { BarChart, PaginationPosition } from 'vue-chrts';
import theme from 'tailwindcss/defaultTheme.js';
import TrafficKPIs from './components/TrafficKPIs.vue';
import type { AverageResponse, TimeValue } from '@/types/api';
import AppSpinner from './components/AppSpinner.vue';

const categories = {
  'Average traffic (cars/hour)': {
    name: 'Average traffic (cars/hour)',
    color: '#8AED4A'
  }
};

const isLoading = ref<boolean>(false);

const chartData = ref<{ hour: string; 'Average traffic (cars/hour)': string }[]>([]);
const xNumTicks = ref<number>(24);

const kpis = ref<{
  highestAverage: TimeValue;
  lowestAverage: TimeValue;
  overallHourlyAverage: number;
}>({
  highestAverage: { time: '', value: 0 },
  lowestAverage: { time: '', value: 0 },
  overallHourlyAverage: 0
});


function xFormatter (i: number) {
  return `${chartData.value[i]?.hour}h`;
}
function yFormatter (i: number) {
  return i;
}


const updateXNumTicks = () => {
  const width = window.innerWidth;
  const breakpointXl = parseFloat(theme.screens.xl) * 16;
  const breakpoint2Xl = parseFloat(theme.screens['2xl']) * 16;

  if (width < breakpointXl) {
    xNumTicks.value = 6;
  } else if (width < breakpoint2Xl) {
    xNumTicks.value = 12;
  } else {
    xNumTicks.value = 24;
  }
};


const fetchData = async () => {
  try {
    isLoading.value = true;
    const response = await fetch('http://localhost:3000/data');
    const data: AverageResponse = await response.json();

    chartData.value = Object.keys(data.hourlyAverages).map((hour) => ({
      hour,
      'Average traffic (cars/hour)': data.hourlyAverages[hour].toFixed(2)
    }));

    kpis.value.highestAverage = data.hourWithHighestAverage;
    kpis.value.lowestAverage = data.hourWithLowestAverage;
    kpis.value.overallHourlyAverage = data.overallHourlyAverage;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
  updateXNumTicks();
  window.addEventListener('resize', updateXNumTicks);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateXNumTicks);
});
</script>

<template>
  <div class="min-h-screen flex flex-col md:flex-row font-manrope">
    <aside class="w-full md:w-[200px] mr-0 md:mr-6 border-r border-gray-200 bg-[#011771] text-white p-6">
      <p class="text-xs">Upciti x Camille Coutens</p>
    </aside>

    <main class="p-4 flex-1">
      <p class="pb-4 pt-2 text-center md:text-left">Welcome Back</p>

      <section v-if="!isLoading">
        <TrafficKPIs :kpis="kpis" />

        <div class="w-full flex flex-col md:flex-row gap-6 mt-6">
          <div class="w-full md:w-1/2">
            <div class="py-6 font-bold mb-6 text-gray-800 flex items-end gap-4 text-center md:text-left">
              <p class="text-sm md:text-base">Road Traffic Counting</p>
            </div>

            <div class="max-w-4xl mx-auto">
              <BarChart v-if="chartData.length" :data="chartData" :height="400" :categories="categories"
                :y-axis="['Average traffic (cars/hour)']" :xNumTicks="xNumTicks" :radius="4" :x-formatter="xFormatter"
                :y-formatter="yFormatter" :pagination-position="PaginationPosition.Bottom" />
            </div>
          </div>

          <div class="w-full md:w-1/2 p-6 relative h-96 md:h-auto">
            <div class="bg-[#011771] w-full h-full" />
            <p class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              ...
            </p>
          </div>
        </div>
      </section>

      <div v-else class="text-center text-gray-600 h-4/5 flex items-center justify-center">
        <AppSpinner />
      </div>
    </main>
  </div>
</template>
