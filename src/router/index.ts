import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/Login.vue';
import NotebookList from '@/views/NotebookList.vue';
import NoteDetail from '@/views/NoteDetail.vue';
import TrashDetail from '@/views/TrashDetail.vue';
import NotFound from '@/views/NotFound.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'login'
  },
  {
    path:'*',
    name:"NotFound",
    component:NotFound
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  {
    path:'/notebooks',
    name:'notebooks',
    component:NotebookList
  },
  {
    path:'/note/:noteId',
    name:'note',
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
