import request from '@/lib/helper/require';
import Vue from 'vue'
import Component from 'vue-class-component'

const URL = {
  REGISTER :'/auth/register',
  LOGIN: '/auth/login',
  LOGOUT:'/auth/logout',
  GET_INFO:'/auth'
}
@Component
export default class auth extends Vue  {
  register({username,password}:any){
    return request(URL.REGISTER,'POST',{username,password})
  }
  login({username,password}:any){
    return request(URL.LOGIN,'POST',{username,password})
  }
  logout(){
    return request(URL.LOGOUT)
  }
  getInfo(){
    return request(URL.GET_INFO)
  }
}