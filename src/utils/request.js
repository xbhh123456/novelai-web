import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:8000', // api 的 base_url
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  } // request timeout
})

// 请求拦截器
service.intertceptors.response.use(
  config => {
    console.log('请求成功',config)
    return config
  },
  error => {
    console.log('请求失败',error)
    return Promise.reject(error)
  }
 )

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error =>{
    console.error('响应失败',error)
    return Promise.reject(error)
  }
)

export default service
