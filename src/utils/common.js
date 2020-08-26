/**
 * @https://github.com/zhchjiang95/dev-template-h5
 * @param {*} key
 * @封装常用方法
 */

import md5 from 'js-md5'
import { slideDirection } from '../utils/JTools'

console.log(md5('fiume.cn'))
slideDirection('body', (res) => {console.log(res)})

// HTTP请求
export const HTTP = {
  get: async (url, callback) => {
    await fetch(url).then(res => res.json()).then(response => callback(response))
  },
  
  post: async (url, data, callback) => {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), // param can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => callback(error))
    .then(response => callback(response))
  },

  postFiles: async (url, data = {}, callback) => {
    let formData = new FormData()
    Object.keys(data).map(v => {
      // 多文件上传 append 到一个 key 中
      formData.append(v, data[v])
    })

    await fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .catch(error => callback(error))
    .then(response => callback(response))
  }
};
