import axios, {AxiosRequestConfig} from 'axios';
import baseURLConfig from '@/lib/helper/config-baseURL';
import {Message} from 'element-ui';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = baseURLConfig.baseURL;
axios.defaults.withCredentials = true;

export default function request<ResponseType>(url: string, type = 'GET', data = {}): Promise<ResponseType> {
  return new Promise((resolve, reject) => {
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
    axios(config).then(res => {
      if (res.status === 200) {
        resolve(res.data);
      } else {
        Message.error(res.data.msg);
        reject(res.data);//一种原因是状态码不对
      }
    }).catch(err => {
      Message.error('网络异常');
      reject({msg: '网络异常'});//一种原因是网不好导致axios返回失败
    });
  });
}


