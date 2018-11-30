import request from './request'
import qs from 'qs'

export function getCompanyPicList(data) {
  return request({
    url: '/companyPic/getCompanyPicList',
    method: 'post',
    data:qs.stringify(data)
  })
}


export function addOrEditCompanyPic(data) {
    return request({
      url: '/companyPic/addOrEditCompanyPic',
      method: 'post',
      data:qs.stringify(data)
    })
  }