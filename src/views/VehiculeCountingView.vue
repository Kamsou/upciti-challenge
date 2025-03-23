<script lang="ts" setup>
import type { AverageResponse, TimeValue } from '@/types/api'
import { barChartOptions } from '@/chartConfig'
import AppSpinner from '@/components/generic/AppSpinner.vue'
import VehiculeCoutingKPIs from '@/components/specific/VehiculeCoutingKPIs.vue'
import { getData } from '@/services/default'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { computed, onMounted, ref } from 'vue'
import { Bar } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
)

const isLoading = ref<boolean>(false)
const hasError = ref<boolean>(false)

const hourlyAverages = ref<Record<string, number>>({})

const chartData = computed(() => {
  if (!hourlyAverages.value) {
    return null
  }

  return Object.keys(hourlyAverages.value).map((hour) => {
    const average = hourlyAverages.value[hour]
    const formattedAverage = typeof average === 'number' ? Number.parseFloat(average.toFixed(2)) : 0

    return {
      hour,
      average: formattedAverage,
    }
  })
})

const barChartData = computed(() => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString())

  if (!chartData.value || chartData.value.length === 0) {
    return null
  }

  const averages = hours.map(hour =>
    chartData.value?.find(data => data.hour === hour)?.average || 0,
  )

  if (!averages || averages.length !== 24) {
    return null
  }

  return {
    labels: hours,
    datasets: [
      {
        label: 'Average traffic (cars/hour)',
        backgroundColor: '#8AED4A',
        borderWidth: 1,
        data: averages,
      },
    ],
  }
})

const kpis = ref<{
  highestAverage: TimeValue
  lowestAverage: TimeValue
  overallHourlyAverage: number
  hourlyAveragesByWeekday: Record<string, number>
}>({
  highestAverage: { time: '', value: 0 },
  lowestAverage: { time: '', value: 0 },
  overallHourlyAverage: 0,
  hourlyAveragesByWeekday: {},
})

async function fetchData() {
  try {
    isLoading.value = true
    hasError.value = false

    const data: AverageResponse = await getData()

    hourlyAverages.value = data.hourlyAverages
    kpis.value.highestAverage = data.hourWithHighestAverage
    kpis.value.lowestAverage = data.hourWithLowestAverage
    kpis.value.overallHourlyAverage = data.overallHourlyAverage
    kpis.value.hourlyAveragesByWeekday = data.hourlyAveragesByWeekday
  }
  catch (error) {
    console.error('Error fetching data:', error)
    hasError.value = true
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <section v-if="isLoading" class="text-center text-gray-600 h-[500px] lg:h-4/5 flex items-center justify-center">
    <AppSpinner />
  </section>

  <section v-else-if="hasError" class="text-center text-red-600 p-4 h-[500px] lg:h-4/5 flex flex-col items-center justify-center">
    <p class="text-2xl font-boldonse pb-2">
      Error fetching data
    </p>
    <p class="text-sm">
      Please try again later
    </p>
  </section>

  <section v-else class="p-4 w-full flex flex-col lg:flex-row gap-6">
    <div class="w-full">
      <VehiculeCoutingKPIs :kpis="kpis" />

      <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex flex-col lg:flex-row w-full lg:w-1/2">
          <div class="w-full border rounded-md border-gray-200 bg-white">
            <div class="pb-4 flex-col font-bold mb-6 text-gray-800 flex text-left border-b border-gray-200 p-6">
              <p class="text-sm md:text-base">
                Road Traffic Counting
              </p>

              <p class="text-sm md:text-xs text-gray-400">
                Tracks vehicle flow, aiding in traffic management and urban planning.
              </p>
            </div>

            <div class="h-[400px]">
              <Bar v-if="barChartData" :data="barChartData" :options="barChartOptions" />
              <div v-else data-test="bar-chart-no-data-message" class="flex items-center justify-center h-full text-gray-300">
                No data available
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row w-full lg:w-1/2 relative h-[300px] lg:h-auto">
          <div class="w-full h-full border border-gray-300 rounded-md" />
          <div class="border-gray-300 text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p class="text-2xl font-boldonse">
              Coming soon
            </p>
            <p class="text-sm">
              Stay tuned for more updates
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
