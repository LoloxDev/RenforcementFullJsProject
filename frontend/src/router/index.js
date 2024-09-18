import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import UserLogin from '@/components/UserLogin.vue';
import UserSignup from '@/components/UserSignup.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/signup',
    name: 'UserSignup',
    component: UserSignup,
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
