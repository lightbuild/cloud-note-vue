import axios, {AxiosRequestConfig,AxiosResponse} from 'axios';
import baseURLConfig from '@/lib/helper/config-baseURL'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true

export default function request<ResponseType>(url:string,type='GET',data={}){
  return new Promise<ResponseType>((resolve, reject)=>{
      const config:AxiosRequestConfig = {
        url,
        method:type,
        data,
        validateStatus(status : number){
          return(status>=200 && status < 300) ||status ===400
        }
      }
      if(type.toLowerCase() === 'get'){
        config.params = data
      }else{
        config.data= data
      }
    axios.request(config).then(res =>{
        if(res.status === 200){
          resolve(res.data)
        }else{
          reject(res.data)
        }
      }).catch(err=>{
      console.log(err);
      reject({msg:'网络异常'})
    })
  })
}


/*
使用async关键字的用法，感觉可以水一篇文章了
async function test<T>(url: string, type = 'GET', data = {}) {
  const config: AxiosRequestConfig = {
    url,
    method: type,
    data,
    validateStatus(status: number) {
      return (status >= 200 && status < 300) || status === 400;
    }
  };
  if (type.toLowerCase() === 'get') {
    config.params = data;
  } else {
    config.data = data;
  }
  return axios.request<T>(config).then(res => {
    if (res.status === 200) {
      return res.data;
    } else {
      return res.data;
    }
  });
}

function testApi({username, password}: any) {
  return test<RegisterData>('/test', 'POST', {username, password});
}
*/

