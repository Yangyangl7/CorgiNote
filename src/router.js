import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/views/Signup'
import Login from '@/views/Login'
import CoursePage from '@/views/CoursePage'
import ErrorPage from '@/views/ErrorPage'
import NewCoursePage from '@/views/NewCourse'
import NotePage from '@/views/NotePage'
import UploadPage from '@/views/UploadPage'

import { auth } from '@/firebase/init'

Vue.config.devtools = true;

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
    },
    {
      path: '/404',
      name: 'ErrorPage',
      component: ErrorPage
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: "/new",
      name: 'NewCourse',
      component: NewCoursePage,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/note/:course",
      name: 'UploadPage',
      component: UploadPage,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  //check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requireAuth)) {
    //check auth state of user
    let user = auth.currentUser
    if (user) {
      // user signed in, proceed to route
      next()
    } else {
      // no user signed in, redirect to login
      next({
        name: 'Signup'
      })
    }
  } else {
    next()
  }
})

export default router
