import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import UserLogin from '@/components/UserLogin.vue';
import UserSignup from '@/components/UserSignup.vue';
import BackOffice from '@/components/BackOffice.vue';
import jwtDecode from 'jwt-decode';


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
  },
  {
    path: '/bo',
    name: 'BackOffice',
    component: BackOffice,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      console.log('ok on rentre')
      if (token) {
        console.log('token trouvé')
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        if (role === 'admin' || role === 'super') {
          console.log('token admin ou super trouvé')
          next();
        } else {
          console.log('token de looser')
          next('/');
        }
      } else {
        next('/login');
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
