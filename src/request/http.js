import axios from 'axios'
import { HOST, URL, baseInfo, Tips } from '../utils/common'

axios.defaults.baseURL = `${HOST}/${URL}`

// 请求超时时间
axios.defaults.timeout = '16000'
// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// 响应的拦截
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  error => {
    switch (error.response.status) {
      case 401:
        Tips('error', '错误401')
        break;
      case 403:
        Tips('error', '错误403')
        break;
      case 404:
        Tips('error', '错误404')
        break;
      case 500:
        Tips('error', '服务器错误500！')
        break;
      default:
        Tips('error', error.response.data.error)
    }
    // 用户可能需要接口返回的错误信息
    return Promise.resolve(error.response.data);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return axios.get(url, { params: params })
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  return axios.post(url, { baseInfo, bizInfo: params })
}

/** 
 * postFile上传文件方法，支持多文件和额外参数
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数，格式：{ key: value, ..., files: [] }] 
 */
export function postFile(url, params) {
  const formData = new FormData()
  Object.keys(params).forEach(v => {
    if(v !== 'files'){
      formData.append(v, params[v])
    }
  })
  params.files.forEach(file => {
    formData.append('file', file)
  })
  return axios.post(url, formData)
}