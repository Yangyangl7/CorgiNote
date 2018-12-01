import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/views/Signup'
import Login from '@/views/Login'
import CoursePage from '@/views/CoursePage'
import { auth } from '@/firebase/init'

Vue.config.devtools = true;

Vue.use(Router)

const router = new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/course',
      name: 'CoursePage',
      component: CoursePage,
      meta: {
        requireAuth: true
      }

    }
  ]
})

// router.beforeEach((to, from, next => {
//   let currentUser = auth.currentUser;
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   if (!currentUser && requiresAuth) next('/login');
//   else next();

// }))

