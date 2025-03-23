<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <aside class="bg-white p-6 border-r border-gray-200 w-full lg:min-w-[200px] lg:w-[200px]">
    <p class="text-xs font-boldonse leading-5">
      Upciti x Camille Coutens
    </p>
    <p class="text-gray-400 text-xs pt-3">
      Dashboard example
    </p>

    <nav aria-label="Main Navigation">
      <ul class="pt-6 flex flex-col gap-2">
        <li class="cursor-pointer">
          <router-link
            to="/vehicule-counting"
            class="block p-2.5 text-sm"
            :class="{ 'bg-[#CFFFB3] text-[#5DC41E] rounded-lg': route.path === '/vehicule-counting' }"
            aria-label="Vehicule Counting"
          >
            Vehicule Counting
          </router-link>
        </li>

        <li class="cursor-pointer">
          <router-link
            to="/pedestrian-counting"
            class="block p-2.5 text-sm"
            :class="{ 'bg-[#CFFFB3] text-[#5DC41E] rounded-lg': route.path === '/pedestrian-counting' }"
            aria-label="Pedestrian Counting"
          >
            Pedestrian Counting
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
