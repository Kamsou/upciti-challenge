import type { RouteRecordRaw } from 'vue-router'
import PedestrianCountingView from '@/views/PedestrianCountingView.vue'
import VehiculeCountingView from '@/views/VehiculeCountingView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/vehicule-counting' },
  { path: '/vehicule-counting', component: VehiculeCountingView },
  { path: '/pedestrian-counting', component: PedestrianCountingView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
