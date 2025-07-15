import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8000', // api的base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 在这里可以添加一些公共的请求头，例如token
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response拦截器
service.interceptors.response.use(
  response => {
    // 如果后端返回的数据有特定的状态码表示错误，可以在这里统一处理
    const res = response.data;
    if (res.code !== 20000 && res.code !== 200) { // 假设20000或200表示成功
      console.error('请求错误:', res.message || 'Error');
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    console.error('请求错误:', error.message);
    return Promise.reject(error);
  }
);

export default service;
