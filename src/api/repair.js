import request from './request'
import qs from 'qs'

export function getRepairWorkerList(data) {
  return request({
    url: '/repairWorker/getRepairWorkerList',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function addOrEditRepairWorker(data) {
    return request({
      url: '/repairWorker/addOrEditRepairWorker',
      method: 'post',
      data:qs.stringify(data)
    })
}


// 维修订单列表


export function getRepairOrderList(data) {
    return request({
      url: '/repairOrder/getRepairOrderList',
      method: 'post',
      data:qs.stringify(data)
    })
}

export function addOrEditRepairOrder(data) {
    return request({
      url: '/repairOrder/addOrEditRepairOrder',
      method: 'post',
      data:qs.stringify(data)
    })
}

// 获取维修工下拉数据
export function getRepairWorker() {
    return request({
      url: '/repairOrder/getRepairWorker',
      method: 'post'
    })
}


// 维修事由

export function getRepairItemList(data) {
    return request({
      url: '/repairItem/getRepairItemList',
      method: 'post',
      data:qs.stringify(data)
    })
}

export function addOrEditRepairItem(data) {
    return request({
      url: '/repairItem/addOrEditRepairItem',
      method: 'post',
      data:qs.stringify(data)
    })
}

// 评价列表


export function getRepairCommentList(data) {
  return request({
    url: '/repairComment/getRepairCommentList',
    method: 'post',
    data:qs.stringify(data)
  })
}