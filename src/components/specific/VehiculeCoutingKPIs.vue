<script lang="ts" setup>
import type { TimeValue } from '@/types/api'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { computed } from 'vue'

const props = defineProps<{
  kpis: {
    highestAverage: TimeValue
    lowestAverage: TimeValue
    overallHourlyAverage: number
  }
}>()

dayjs.extend(utc)

function formatTime(time: string): string | null {
  return dayjs.utc(time).isValid() ? dayjs.utc(time).format('h A') : null
}

function formatDate(time: string) {
  return dayjs.utc(time).format('D MMM YYYY')
}

const formattedKpis = computed(() => ({
  highestAverage: {
    ...props.kpis.highestAverage,
    formattedTime: formatTime(props.kpis.highestAverage.time),
    formattedDate: formatDate(props.kpis.highestAverage.time),
  },
  lowestAverage: {
    ...props.kpis.lowestAverage,
    formattedTime: formatTime(props.kpis.lowestAverage.time),
    formattedDate: formatDate(props.kpis.lowestAverage.time),
  },
  overallHourlyAverage: props.kpis.overallHourlyAverage.toFixed(2),
}))
</script>

<template>
  <div class="pb-4 flex flex-col lg:flex-row gap-6 w-full">
    <div class="flex flex-col md:flex-row w-full gap-6 lg:flex-nowrap">
      <div
        class="mb-4 border rounded-md p-6 border-gray-200 bg-white flex justify-evenly items-center gap-6 w-full lg:w-1/3"
      >
        <div class="flex items-center gap-2 w-[80px] md:w-[50px]">
          <p class="font-semibold mb-2 text-gray-800 text-lg leading-6 font-boldonse">
            Peak Traffic Hour
          </p>
        </div>

        <div v-if="formattedKpis.highestAverage.time">
          <p class="text-2xl font-boldonse font-bold py-2.5">
            {{ formattedKpis.highestAverage.formattedTime }}
          </p>
          <div class="flex flex-col items-start">
            <p class="text-xs text-gray-400">
              {{ formattedKpis.highestAverage.value.toFixed(2) }} vehicles
            </p>
            <p class="text-xs text-gray-400">
              recorded on {{ formattedKpis.highestAverage.formattedDate }}
            </p>
          </div>
        </div>

        <div v-else class="flex flex-col items-center py-4">
          <img src="@/assets/highest.svg" alt="highest" class="w-12 h-12">
          <p class="text-sm text-gray-800 pt-2">
            No data available
          </p>
        </div>
      </div>

      <div class="mb-4 border rounded-md p-6 border-gray-200 bg-white flex justify-evenly items-center gap-6 w-full lg:w-1/3">
        <div class="flex items-center gap-2 w-[80px] md:w-[70px]">
          <p class="font-semibold mb-2 text-gray-800 text-lg leading-6 font-boldonse">
            Lowest Traffic Hour
          </p>
        </div>

        <div v-if="formattedKpis.lowestAverage.time">
          <p class="text-2xl font-boldonse font-bold py-2">
            {{ formattedKpis.lowestAverage.formattedTime }}
          </p>
          <div class="flex flex-col items-start">
            <p class="text-xs text-gray-400">
              {{ formattedKpis.lowestAverage.value.toFixed(2) }} vehicles
            </p>
            <p class="text-xs text-gray-400">
              recorded on {{ formattedKpis.lowestAverage.formattedDate }}
            </p>
          </div>
        </div>

        <div v-else class="flex flex-col items-center py-4">
          <img src="@/assets/lowest.svg" alt="lowest" class="w-12 h-12">
          <p class="text-sm text-gray-800">
            No data available
          </p>
        </div>
      </div>

      <div class="border rounded-md p-6 border-gray-200 bg-white flex justify-evenly items-center gap-6 w-full lg:w-1/3">
        <div class="flex items-center gap-2 w-[85px] md:w-[70px]">
          <p class="font-semibold mb-2 text-gray-800 text-lg leading-6 font-boldonse">
            Overall Hourly Average
          </p>
        </div>

        <div class="w-[130px] md:w-[90px] flex flex-col justify-center">
          <p class="text-2xl font-bold font-boldonse">
            {{ formattedKpis.overallHourlyAverage }}
          </p>
          <p class="text-xs text-gray-400 pt-2">
            average number
          </p>
          <p class="text-xs text-gray-400">
            of vehicless
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
