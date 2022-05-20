import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/components/Login.vue';
import NotebookList from '@/components/NotebookList.vue';
import NoteDetail from '@/components/NoteDetail.vue';
import TrashDetail from '@/components/TrashDetail.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  {
    path:'/notebooks',
    component:NotebookList
  },
  {
    path:'/note/:noteId',
    component:NoteDetail
  },
  {
    path:'/trash/:noteId',
    component:TrashDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
