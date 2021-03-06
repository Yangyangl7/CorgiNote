import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/views/Signup'
import Login from '@/views/Login'
import CoursePage from '@/views/CoursePage'
import ErrorPage from '@/views/ErrorPage'
import NewCoursePage from '@/views/NewCourse'
import UploadPage from '@/views/UploadPage'
import Note from '@/components/Note'
import Search from '@/views/SearchUser'
import SharedNoteList from '@/views/SharedNotesPage'
import CommentNote from '@/views/CommentNotePage'

import {
  auth
} from '@/firebase/init'

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
      path: '/course/:courseId',
      name: 'UploadPage',
      component: UploadPage,
      props:true,
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
      path: "/note/:noteId",
      name: 'Note',
      component: Note,
      props:true,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/search/:userId",
      name: 'Search',
      component: Search,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/search/:userId/:courseName/:courseId",
      name: 'SharedNoteList',
      component: SharedNoteList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/search/:userId/:courseName/:courseId/:noteId",
      name: 'CommentNote',
      component: CommentNote,
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
