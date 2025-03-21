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
  return dayjs(time, 'HH:mm').format('h:mm A');
};
</script>

<template>
  <div class="border-t border-b border-gray-200 mt-6 py-4 flex flex-wrap gap-6 w-full">
    <div class="mb-4 border-r border-gray-200 pr-4 w-full md:w-1/3 lg:w-1/4">
      <h2 class="font-semibold mb-2 text-gray-800 text-xs md:text-sm">Peak Traffic Hour</h2>
      <span class="text-2xl">{{ formatTime(kpis.highestAverage.time) }}</span>
      <p class="text-xs md:text-sm text-gray-600">
        ({{ kpis.highestAverage.value.toFixed(2) }} vehicles)
      </p>
    </div>

    <div class="mb-4 border-r border-gray-200 pr-4 w-full md:w-1/3 lg:w-1/4">
      <h2 class="font-semibold mb-2 text-gray-800 text-xs md:text-sm">Lowest Traffic Hour</h2>
      <span class="text-2xl">{{ formatTime(kpis.lowestAverage.time) }}</span>
      <p class="text-xs md:text-sm text-gray-600">
        ({{ kpis.lowestAverage.value.toFixed(2) }} vehicles)
      </p>
    </div>

    <div class="mb-4 w-full md:w-1/3 lg:w-1/4">
      <h2 class="font-semibold mb-2 text-gray-800 text-xs md:text-sm">Overall Hourly Average</h2>
      <span class="text-2xl">{{ kpis.overallHourlyAverage.toFixed(2) }}</span>
      <p class="text-xs md:text-sm text-gray-600">vehicles</p>
    </div>
  </div>
</template>
