import request from '@/lib/helper/require';
const URL = {
  REGISTER :'/auth/register',
  LOGIN: '/auth/login',
  LOGOUT:'/auth/logout',
  GET_INFO:'/auth'
}
export default {
  register({username,password}:userInput):Promise<RegisterResponse>{
    return request(URL.REGISTER,'POST',{username,password})
  },
  login({username,password}:userInput):Promise<LoginResponse>{
    return request(URL.LOGIN,'POST',{username,password})
  },
  logout():Promise<LogoutResponse>{
    return request(URL.LOGOUT)
  },
  getInfo():Promise<AuthResponse>{
    return request(URL.GET_INFO)
  }
}