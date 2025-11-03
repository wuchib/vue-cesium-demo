import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'CesiumDemo',
    component: () => import('../pages/cesium-demo/index.vue'),
    meta: {
      title: 'Cesium Demo',
    },
  },
];

export default routes;
