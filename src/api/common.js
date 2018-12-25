import request from './request'
import qs from 'qs'
// 获取单位组织架构数据
export function getDepsInfo() {
  return request({
    url: '/common/getDepsInfo',
    method: 'post'
  })
}



/** 
 * 通用接口
 * 
 * advertType
 * 1、banner 
 * 2、企业服务 
 * 3、集团简介
 * 4、服务优势
 * 5、服务案例
 * 6、团队风采
 * 7、子公司配置
 * 
 * 8、企业理念
 * 9、发展历程
 * 
 * 
 * */ 

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
