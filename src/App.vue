<script setup lang="ts">
import SidebarNavigation from '@/components/specific/SidebarNavigation.vue'
import AppHeader from './components/generic/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row font-manrope bg-gray-100">
    <SidebarNavigation />

    <main class="w-full">
      <AppHeader>
        <template #left>
          <p class="text-base">
            {{ $route.name }}
          </p>
        </template>
      </AppHeader>

      <RouterView class="w-full" />
    </main>
  </div>
</template>
