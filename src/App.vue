<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row font-manrope bg-gray-100">
    <aside class="bg-white p-6 border-r border-gray-200 w-full lg:min-w-[200px] lg:w-[200px]">
      <p class="text-xs font-boldonse leading-5">
        Upciti x Camille Coutens
      </p>
      <p class="text-gray-400 text-xs pt-3">
        Dashboard example
      </p>

      <nav>
        <ul class="pt-6 flex flex-col gap-2">
          <li class="cursor-pointer">
            <router-link
              to="/vehicule-counting"
              class="block p-2.5 text-sm"
              :class="{ 'bg-[#CFFFB3] text-[#5DC41E] rounded-lg': route.path === '/vehicule-counting' }"
            >
              Vehicule Counting
            </router-link>
          </li>

          <li class="cursor-pointer">
            <router-link
              to="/pedestrian-counting"
              class="block p-2.5 text-sm"
              :class="{ 'bg-[#CFFFB3] text-[#5DC41E] rounded-lg': route.path === '/pedestrian-counting' }"
            >
              Pedestrian Counting
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <router-view class="w-full" />
  </div>
</template>
