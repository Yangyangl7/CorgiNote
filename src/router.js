import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/views/Signup'
import Login from '@/views/Login'
import CoursePage from '@/views/CoursePage'
import NotePage from '@/views/NotePage'

Vue.use(Router)

export default new Router({
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

    },
    {
      path: '/course/:courseName',
      name: 'NotePage',
      component: NotePage,
      meta: {
        requireAuth: true
      }
    }
  ]
})
