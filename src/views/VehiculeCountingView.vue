<script lang="ts" setup>
import type { AverageResponse, TimeValue } from '@/types/api'
import { barChartOptions } from '@/chartConfig'
import AppSpinner from '@/components/generic/AppSpinner.vue'
import VehiculeCoutingKPIs from '@/components/specific/VehiculeCoutingKPIs.vue'
import { getData } from '@/services/default'
import { computed, onMounted, ref } from 'vue'
import { Bar } from 'vue-chartjs'

const isLoading = ref<boolean>(false)
const hasError = ref<boolean>(false)

const hourlyAverages = ref<Record<string, number>>({})

const barChartData = computed(() => {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString())

  if (!hourlyAverages.value || Object.keys(hourlyAverages.value).length === 0) {
    return null
  }

  const averages = hours.map((hour) => {
    const average = hourlyAverages.value[hour]
    return typeof average === 'number' ? Number.parseFloat(average.toFixed(2)) : 0
  })

  return {
    labels: hours,
    datasets: [
      {
        label: 'Average traffic (vehicles/hour)',
        backgroundColor: '#8AED4A',
        data: averages,
      },
    ],
  }
})

const kpis = ref<{
  highestAverage: TimeValue
  lowestAverage: TimeValue
  overallHourlyAverage: number
}>({
  highestAverage: { time: '', value: 0 },
  lowestAverage: { time: '', value: 0 },
  overallHourlyAverage: 0,
})

async function fetchData() {
  try {
    isLoading.value = true
    hasError.value = false

    const response: AverageResponse = await getData()

    hourlyAverages.value = response.hourlyAverages
    kpis.value.highestAverage = response.hourWithHighestAverage
    kpis.value.lowestAverage = response.hourWithLowestAverage
    kpis.value.overallHourlyAverage = response.overallHourlyAverage
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
              <p class="text-sm md:text-base flex items-center gap-2">
                Road Traffic Counting
                <img src="@/assets/cars.svg" alt="cars" class="h-6 w-6">
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
