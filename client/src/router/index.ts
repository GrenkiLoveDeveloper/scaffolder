import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'primary',
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const notAuthPages = ['/login'];

//   const authStore = useAuthStore();

//   if (!authStore.isAuthenticated && !notAuthPages.includes(to.path)) {
//     next('/login');
//     return;
//   } else if (authStore.isAuthenticated && notAuthPages.includes(to.path)) {
//     next('/');
//     return;
//   }
//   next();
// });

export default router;
