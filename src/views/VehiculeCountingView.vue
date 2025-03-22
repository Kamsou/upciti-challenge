<script lang="ts" setup>
import type { AverageResponse, TimeValue } from '@/types/api'
import { chartOptions } from '@/chartConfig'
import { colors } from '@/colors'
import AppSpinner from '@/components/generic/AppSpinner.vue'
import VehiculeCoutingKPIs from '@/components/specific/VehiculeCoutingKPIs.vue'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  LineElement, // Importez LineElement pour les graphiques en ligne
  PointElement, // Importez PointElement
} from 'chart.js'
import { computed, onMounted, ref } from 'vue'
import { Bar, Line } from 'vue-chartjs'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement, // Enregistrez LineElement
  PointElement, // Enregistrez PointElement
)

const isLoading = ref<boolean>(false)
const chartData = ref<{ hour: string, average: number }[]>([])

const chartDataForChart = computed(() => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString())
  const averages = hours.map(
    hour => chartData.value.find(data => data.hour === hour)?.average || 0,
  )

  return {
    labels: hours,
    datasets: [
      {
        label: 'Average traffic (cars/hour)',
        backgroundColor: colors.primary.DEFAULT,

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

const chartDataForWeekday = computed(() => {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const averages = weekdays.map(day => kpis.value.hourlyAveragesByWeekday[day] || 0)

  return {
    labels: weekdays,
    datasets: [
      {
        label: 'Average Traffic by Weekday',
        backgroundColor: colors.primary.light,
        borderWidth: 1,
        data: averages,
      },
    ],
  }
})

async function fetchData() {
  try {
    isLoading.value = true
    const response = await fetch('http://localhost:3000/data')
    const data: AverageResponse = await response.json()

    chartData.value = Object.keys(data.hourlyAverages).map(hour => ({
      hour,
      average: Number.parseFloat(data.hourlyAverages[hour].toFixed(2)),
    }))

    kpis.value.highestAverage = data.hourWithHighestAverage
    kpis.value.lowestAverage = data.hourWithLowestAverage
    kpis.value.overallHourlyAverage = data.overallHourlyAverage
    kpis.value.hourlyAveragesByWeekday = data.hourlyAveragesByWeekday
  }
  catch (error) {
    console.error('Error fetching data:', error)
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
  <main>
    <header
      class="bg-white border-b border-t border-gray-200 p-4 flex justify-between items-center"
    >
      <p class="text-base">
        General
      </p>
      <p class="text-sm">
        Hello
      </p>
    </header>

    <section v-if="!isLoading" class="p-4 w-full flex flex-col lg:flex-row gap-6">
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
                <Bar :data="chartDataForChart" :options="chartOptions" />
              </div>
            </div>
          </div>

          <div class="flex flex-col lg:flex-row w-full lg:w-1/2 relative h-[300px] lg:h-auto">
            <div class="w-full h-full border border-green-800 rounded-md" />
            <div class="text-green-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
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

    <div
      v-else
      class="text-center text-gray-600 h-4/5 flex items-center justify-center"
    >
      <AppSpinner />
    </div>
  </main>
</template>
