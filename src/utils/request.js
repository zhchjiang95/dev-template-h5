import { HTTP } from './common'

// 获取用户信息
export const getUserInfo = (callback) => {
  HTTP.post("/getUserInfo", { user: 'fiume', pwd: '.cn' }, callback);
}