/**
 *
 * @export
 * @param {*} key
 * @封装常用方法
 * 
 */

import md5 from 'js-md5' 

console.log(md5('fiume.cn'))

// 格式化url查询参数，返回对象
export function formatQueryParam(key) {
  const paramArr = location.href.split('?')[1] ? location.href.split('?')[1].split('#/')[0].split('&').map(a => ({ [a.split('=')[0]]: a.split('=')[1] })) : []
  return key ? paramArr.find(a => a[`${key}`] !== undefined) ? paramArr.find(a => a[`${key}`] !== undefined) : {} : paramArr
}

// 移动端滑动，cls：容器类名，callback：参数为开始结束X，Y轴的值
export function slidingDirection(cls, callback){
  let startX = 0, startY = 0, el = document.querySelector(`${cls}`)
  el.addEventListener('touchstart', function(e){
      startX = e.changedTouches[0].clientX
      startY = e.changedTouches[0].clientY
  }, false)
  el.addEventListener('touchend', function(e){
      callback({startX, startY, enX: e.changedTouches[0].clientX, enY: e.changedTouches[0].clientY})
  }, false)
}

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
