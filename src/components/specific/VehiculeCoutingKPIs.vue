<script lang="ts" setup>
import type { TimeValue } from '@/types/api'
import dayjs from 'dayjs'
import { defineProps } from 'vue'

defineProps<{
  kpis: {
    highestAverage: TimeValue
    lowestAverage: TimeValue
    overallHourlyAverage: number
  }
}>()

function formatTime(time: string) {
  return dayjs(time, 'HH').format('h A')
}
</script>

<template>
  <div class="pb-4 flex flex-col lg:flex-row gap-6 w-full">
    <div class="flex w-full gap-6 flex-nowrap">
      <div
        class="mb-4 border rounded-md p-6 border-gray-200 bg-white flex justify-center items-center gap-6 w-1/3"
      >
        <div>
          <div class="flex items-center gap-2">
            <img src="@/assets/highest.svg" alt="highest" class="w-4 h-4">

            <p class="font-semibold mb-2 text-gray-800 text-xs lg:text-sm">
              Peak Traffic Hour
            </p>
          </div>

          <p class="text-2xl font-boldonse py-2">
            {{ formatTime(kpis.highestAverage.time) }}
          </p>

          <p class="text-xs md:text-sm text-gray-400">
            {{ kpis.highestAverage.value.toFixed(2) }} vehicles
          </p>
        </div>
      </div>

      <div
        class="mb-4 border rounded-md p-6 border-gray-200 bg-white flex justify-center items-center gap-6 w-1/3"
      >
        <div>
          <div class="flex gap-2">
            <img src="@/assets/lowest.svg" alt="lowest" class="w-6 h-6">

            <p class="font-semibold mb-2 text-gray-800 text-xs lg:text-sm">
              Lowest Traffic Hour
            </p>
          </div>

          <p class="text-2xl font-boldonse py-2">
            {{ formatTime(kpis.lowestAverage.time) }}
          </p>

          <p class="text-xs md:text-sm text-gray-400">
            {{ kpis.lowestAverage.value.toFixed(2) }} vehicles
          </p>
        </div>
      </div>

      <div class="border rounded-md p-6 border-gray-200 bg-white flex justify-center items-center gap-6 w-1/3">
        <div>
          <div class="flex items-center gap-2">
            <img src="@/assets/cars.svg" alt="cars" class="w-6 h-6">
            <p class="font-semibold mb-2 text-gray-800 text-xs lg:text-sm">
              Overall Hourly Average
            </p>
          </div>

          <p class="text-2xl font-boldonse py-2">
            {{ kpis.overallHourlyAverage.toFixed(2) }}
          </p>
          <p class="text-xs md:text-sm text-gray-400">
            vehicles
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
