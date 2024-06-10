import { createRouter, createWebHistory } from 'vue-router';
import HomePageView from '../modules/pages/HomePageView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageView,
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../modules/pages/GamePageView.vue'),
    },
  ],
});

export default router;
