<template>
  <div class="min-h-screen flex flex-col md:flex-row font-manrope bg-gray-100">
    <aside class="w-full md:w-[200px] mr-0 md:mr-6 border-r border-gray-200 bg-white p-6">
      <p class="text-xs font-boldonse leading-5">Upciti x Camille Coutens</p>
    </aside>

    <main class="flex-1">
      <header class="bg-white border-b border-gray-200 p-4">
        <p class="text-center md:text-left">General</p>
      </header>

      <section v-if="!isLoading" class="p-4">
        <TrafficKPIs :kpis="kpis" />

        <div class="w-full flex flex-col md:flex-row gap-6 mt-6 ">
          <div class="w-full md:w-1/2 border rounded-md border-gray-200 bg-white">
            <div class="pb-4 flex-col font-bold mb-6 text-gray-800 flex text-center md:text-left border-b border-gray-200 p-6">
              <p class="text-sm md:text-base">Road Traffic Counting</p>
              <p class="text-sm md:text-xs text-gray-400">Tracks vehicle flow, aiding in traffic management and urban planning.</p>
            </div>

            <div class="max-w-4xl mx-auto h-[400px]">
              <Bar :data="chartDataForChart" :options="chartOptions" />
            </div>
          </div>

          <div class="w-full md:w-1/2 relative h-96 md:h-auto bg-white border rounded-md border-gray-200">
            <div class="p-6 w-full h-full" />
            <p class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
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

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import TrafficKPIs from './components/TrafficKPIs.vue';
import type { AverageResponse, TimeValue } from '@/types/api';
import AppSpinner from './components/AppSpinner.vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, type TooltipItem } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const isLoading = ref<boolean>(false);
const chartData = ref<{ hour: string; average: number }[]>([]);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 20
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Hours',
        font: {
          size: 12,
        }
      },
      grid: {
        display: false
      },
      ticks: {
      callback: function(value: string | number) {
        const hour = parseInt(value.toString(), 10);
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour} ${period}`;
      },
      font: {
        size: 10
      }
    }
    },
    y: {
      title: {
        display: true,
        text: 'Average Number of Cars',
        font: {
          size: 10,
        }
      },
      ticks: {
        font: {
          size: 14
        }
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
      align: 'end' as const,
      labels: {
        font: {
          size: 12
        },
        usePointStyle: true,
        pointStyle: 'rect',
      },
    },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#333',
      bodyColor: '#666',
      borderColor: '#ddd',
      borderWidth: 1,
      cornerRadius: 6,
      padding: {
        top: 15,
        left: 15,
        right: 15,
        bottom: 15
      },
       boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      callbacks: {
        label: function(tooltipItem: TooltipItem<'bar'>) {
          return `\u00A0 ${(tooltipItem.raw as number).toFixed(2)} cars/hour`;
        },
        title: function(tooltipItems: TooltipItem<'bar'>[]) {
          const hour = parseInt(tooltipItems[0].label, 10);
          const period = hour >= 12 ? 'PM' : 'AM';
          const formattedHour = hour % 12 || 12;
          return `${formattedHour} ${period}`;
        },
      },
    }
  },
  
  animation: {
    duration: 1500,
    easing: 'easeOutQuart' as const,
    delay: 0
  }
};

const chartDataForChart = computed(() => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString());
  const averages = hours.map(hour => chartData.value.find(data => data.hour === hour)?.average || 0);

  return {
    labels: hours,
    datasets: [
      {
        label: 'Average traffic (cars/hour)',
        backgroundColor: '#8AED4A',

        borderWidth: 1,
        data: averages
      }
    ]
  };
});

const kpis = ref<{
  highestAverage: TimeValue;
  lowestAverage: TimeValue;
  overallHourlyAverage: number;
}>({
  highestAverage: { time: '', value: 0 },
  lowestAverage: { time: '', value: 0 },
  overallHourlyAverage: 0
});

async function fetchData() {
  try {
    isLoading.value = true;
    const response = await fetch('http://localhost:3000/data');
    const data: AverageResponse = await response.json();

    chartData.value = Object.keys(data.hourlyAverages).map((hour) => ({
      hour,
      average: parseFloat(data.hourlyAverages[hour].toFixed(2))
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
});
</script>
