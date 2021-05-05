import { reactive, effect } from '@vue/reactivity'
import { Toast } from 'vant'

export const HOST = 'https://baidu.com'
export const URL = process.env.VUE_APP_ENV === 'prod' ? '/' : '/test'


// 判断设备
export function judgeOS() {
  const u = navigator.userAgent;
  return {
    Android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
    iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  }
}

/** 
 * 读值和设值 sessionStorage
 * 传入 key, 读值；传入 key、defaultValue，设值
 */
export const useSessionStorage = (key, defaultValue = []) => {
  let data = reactive({})
  Object.assign(data, sessionStorage[key] && JSON.parse(sessionStorage[key]) || defaultValue)
  effect(() => sessionStorage[key] = JSON.stringify(data));
  return data
}

/** 
 * 提示函数 
 * 禁止点击蒙层
 */
export const Tips = (type, msg, duration = 2000) => {
  const icon = { success: 'success', error: 'cross', warning: 'fail' }
  if (type === 'loading') {
    // Toast.clear() 异步关闭
    return Toast.loading({
      duration: 0,
      forbidClick: true,
      message: msg,
    });
  } else {
    Toast({
      message: msg,
      icon: icon[type],
      duration: duration,
      forbidClick: true
    });
  }
}
