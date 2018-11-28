import request from './request'
import qs from 'qs'

export function getMessagePushList(data) {
  return request({
    url: '/messagePush/getMessagePushList',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function addOrEditMessagePush(data) {
  return request({
    url: '/messagePush/addOrEditMessagePush',
    method: 'post',
    data: qs.stringify(data)
  })
}


export function delMessagePush(data) {
  return request({
    url: '/messagePush/delMessagePush',
    method: 'post',
    data: qs.stringify(data)
  })
}


export function getMessagePushRecordList(data) {
  return request({
    url: '/messagePushRecord/getMessagePushRecordList',
    method: 'post',
    data: qs.stringify(data)
  })
}