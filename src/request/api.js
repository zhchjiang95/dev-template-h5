import { post } from './http'

// get data
export const getUserInfo = p => post('/api/getUserInfo', p)


