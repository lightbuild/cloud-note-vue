import axios, {AxiosRequestConfig} from 'axios';
import baseURLConfig from '@/lib/helper/config-baseURL'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true

export default function request(url:string,type='GET',data={}){
  return new Promise((resolve, reject)=>{
      const option:AxiosRequestConfig = {
        url,
        method:type,
        data,
        validateStatus(status : number){
          return(status>=200 && status < 300) ||status ===400
        }
      }
      if(type.toLowerCase() === 'get'){
        option.params = data
      }else{
        option.data= data
      }
      axios(option).then(res =>{
        if (res.status ===200) {
          resolve(res.data)
        }else{
          reject(res.data)
        }
      }).catch(err => {
        reject({msg:'网络异常'})
      })
  })
}


