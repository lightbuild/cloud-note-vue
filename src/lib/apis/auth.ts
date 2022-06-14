import request from '@/lib/helper/require';
const URL = {
  REGISTER :'/auth/register',
  LOGIN: '/auth/login',
  LOGOUT:'/auth/logout',
  GET_INFO:'/auth'
}
export default {
  register({username,password}:userInput){
    return request<RegisterResponse>(URL.REGISTER,'POST',{username,password})
  },
  login({username,password}:userInput){
    return request<LoginResponse>(URL.LOGIN,'POST',{username,password})
  },
  logout(){
    return request<LogoutResponse>(URL.LOGOUT)
  },
  getInfo(){
    return request<AuthResponse>(URL.GET_INFO)
  }
}