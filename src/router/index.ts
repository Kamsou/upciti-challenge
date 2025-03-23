import type { RouteRecordRaw } from 'vue-router'
import PedestrianCountingView from '@/views/PedestrianCountingView.vue'
import VehiculeCountingView from '@/views/VehiculeCountingView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'Vehicule Counting' } },
  { path: '/vehicule-counting', component: VehiculeCountingView, name: 'Vehicule Counting' },
  { path: '/pedestrian-counting', component: PedestrianCountingView, name: 'Pedestrian Counting' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
