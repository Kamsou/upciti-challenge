<script lang="ts" setup>
import { defineProps } from 'vue';
import dayjs from 'dayjs';
import type { TimeValue } from '@/types/api';


defineProps<{
  kpis: {
    highestAverage: TimeValue;
    lowestAverage: TimeValue;
    overallHourlyAverage: number;
  };
}>();

function formatTime (time: string)  {
  return dayjs(time, 'HH').format('h A');
};
</script>

<template>
  <div class="pb-4 flex flex-wrap gap-6 w-full">
    <div class="mb-4 border rounded-md p-6 border-gray-200 w-full md:w-1/3 lg:w-1/4 bg-white flex items-center gap-6">
      <img src="@/assets/highest.svg" alt="vehicles" class="w-16 h-16" />
      <div>
      <p class="font-semibold mb-2 text-gray-800 text-xs md:text-sm">Peak Traffic Hour</p>
      <p class="text-2xl font-boldonse py-2">{{ formatTime(kpis.highestAverage.time) }}</p>
      <p class="text-xs md:text-sm text-gray-400">
        {{ kpis.highestAverage.value.toFixed(2) }} vehicles
      </p>
      </div>
    </div>

    <div class="mb-4 border rounded-md p-6 border-gray-200 w-full md:w-1/3 lg:w-1/4 bg-white flex items-end gap-6">
      <img src="@/assets/lowest.svg" alt="vehicles" class="w-16 h-16" />
      <div>
      <p class="font-semibold mb-2 text-gray-800 text-xs md:text-sm">Lowest Traffic Hour</p>
      <p class="text-2xl font-boldonse py-2">{{ formatTime(kpis.lowestAverage.time) }}</p>
      <p class="text-xs md:text-sm text-gray-400">
        {{ kpis.lowestAverage.value.toFixed(2) }} vehicles
      </p>
      </div>
    </div>

    <div class="mb-4 w-full md:w-1/3 lg:w-1/4 border rounded-md p-6 border-gray-200 bg-white flex items-center gap-6">
      <img src="@/assets/cars.svg" alt="vehicles" class="w-16 h-16" />
      <div>
        <p class="font-semibold mb-2 text-gray-800 text-xs md:text-sm">Overall Hourly Average</p>
        <p class="text-2xl font-boldonse py-2">{{ kpis.overallHourlyAverage.toFixed(2) }}</p>
        <p class="text-xs md:text-sm text-gray-400">vehicles</p>
      </div>
    </div>
  </div>
</template>
