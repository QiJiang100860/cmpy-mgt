import request from './request'
import qs from 'qs'

export function getAdvertList(data) {
  return request({
    url: '/advert/getAdvertList',
    method: 'post',
    data:qs.stringify(data)
  })
}


export function addOrEditAdvert(data) {
    return request({
      url: '/advert/addOrEditAdvert',
      method: 'post',
      data:qs.stringify(data)
    })
  }
