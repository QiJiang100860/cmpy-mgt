import request from './request'
import qs from 'qs'
// 获取单位组织架构数据
export function getDepsInfo() {
  return request({
    url: '/common/getDepsInfo',
    method: 'post'
  })
}

// 获取访问事由列表
export function getVisitReasons() {
  return request({
    url: '/common/getVisitReasons',
    method: 'post'
  })
}


// 根据科室id查询，人员信息
export function getMemberListBySection(data) {
  return request({
      url: '/member/getMemberListBySection',
      method: 'post',
      data: qs.stringify(data)
  })
}