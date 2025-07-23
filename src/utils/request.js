import axios from 'axios'

const service = axios.create({
  baseURL: 'http://127.0.0.1:8000', // api 的 base_url
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  } // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    console.log('发送请求:', config)
    return config
  },
  error => {
    console.error('请求错误:', error)
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
