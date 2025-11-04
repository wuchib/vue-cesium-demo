import type { RouteRecordRaw } from 'vue-router';
import { generateRoutes } from './auto'


export const childrenRoutes: RouteRecordRaw[] = generateRoutes()

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect:'/libs-demo',
    component: () => import('../layout/layout.vue'),
    children: childrenRoutes,
  },
];

export default routes;
