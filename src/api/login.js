import request from './request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function loginOut() {
  return request({
    url: '/loginOut',
    method: 'post'
  })
}
