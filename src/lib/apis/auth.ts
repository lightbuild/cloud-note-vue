import request from '@/lib/helper/require';

const URL = {
  REGISTER :'/auth/register',
  LOGIN: '/auth/login',
  LOGOUT:'/auth/logout',
  GET_INFO:'/auth'
}
export default {
  register({username,password}:any){
    return request<RegisterData>(URL.REGISTER,'POST',{username,password})
  },
  login({username,password}:any){
    return request<AuthLoginData>(URL.LOGIN,'POST',{username,password})
  },
  logout(){
    return request<AuthLogoutData>(URL.LOGOUT)
  },
  getInfo(){
    return request<AuthData>(URL.GET_INFO).then().catch(err=>{
      console.log(err)
    })
  }
}