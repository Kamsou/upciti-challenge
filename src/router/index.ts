import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import VehicleCounting from '@/views/VehiculeCountingView.vue';
// import SmartParking from '../views/SmartParkingView.vue';
// import PedestrianCounting from '../views/PedestrianCountingView.vue';
// import ObstructionDetection from '../views/ObstructionDetectionView.vue';
// import NoisePollution from '../views/NoisePollutionView.vue';
// import Reports from '../views/ReportsView.vue';
// import Alerts from '../views/AlertsView.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/vehicle-counting' },
  { path: '/vehicle-counting', component: VehicleCounting },
  // { path: '/smart-parking', component: SmartParkingView },
  // { path: '/pedestrian-counting', component: PedestrianCountingView },
  // { path: '/obstruction-detection', component: ObstructionDetectionView },
  // { path: '/noise-pollution', component: NoisePollutionView },
  // { path: '/reports', component: ReportsView },
  // { path: '/alerts', component: AlertsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
