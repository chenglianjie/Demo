import Axios from "axios";
import { Modal } from 'antd';
import host from "./host";
// 是否在开发环境中  默认在开发环境中  
let isDev = true;
// 如果在生产环境中 isDev为false   development 开发环境   production 生产环境
if(process.env.NODE_ENV === 'production'){
  isDev=false;
}
// 引入外部的配置文件 根据环境，请求名字不同，配置不同的baseurl
host.map((item)=>{
  return { name: item.name, origin: isDev ? item.dev : item.prod };
}).forEach((item)=>{
 Axios.defaults[item.name] = item.origin
})
Axios.defaults.withCredentials = true;  // 默认为false  表示跨域请求时是否需要使用凭证
const axios = Axios.create({});
// 请求拦截器
axios.interceptors.request.use((request) => {
  try {
    const kiwiCert = localStorage.getItem('kiwi');
    const jsonList = JSON.parse(kiwiCert);
    request.headers.Authorization = `Bearer ${jsonList.token}`;
    // const kiwiCert = localStorage.getItem('kiwi');
    // const token = JSON.parse(kiwiCert);
    // request.headers.Authorization = `Bearer ${token}`;
  } catch (err) {
    console.error('axios请求拦截出错',err);
  }
  return request;
}, error => Promise.reject(error));
// 响应拦截器
axios.interceptors.response.use((response = {}) => { return response;},
  (error) => {
    const { response = {} } = error;
    if (response.status === 401) {
      Modal.warning({
        title: '身份校验已过期',
        content: '请重新登录',
        onOk() {
          localStorage.removeItem("kiwiCert");
          window.location.href = '/login';
        },
      });
    }
    return Promise.reject(error);
});

export default axios;