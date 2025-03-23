<script setup lang="ts">
import SidebarNavigation from '@/components/specific/SidebarNavigation.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row font-manrope bg-gray-100">
    <SidebarNavigation />

    <main class="w-full">
      <header
        class="bg-white border-b border-t border-gray-200 p-4 flex justify-between items-center"
      >
        <p class="text-base">
          {{ $route.name }}
        </p>

        <div
          class="flex justify-center items-center w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-md"
        >
          <img
            src="@/assets/aya-nakamura.jpg"
            alt="User Avatar"
            class="w-full h-full object-cover"
          >
        </div>
      </header>

      <RouterView class="w-full" />
    </main>
  </div>
</template>
