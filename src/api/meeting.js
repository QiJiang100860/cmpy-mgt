import request from './request'
import qs from 'qs'


// 会议室列表
export function getMeetingRoomList(data) {
  return request({
    url: '/meetingRoom/getMeetingRoomList',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function addOrEditMeetingRoom(data) {
    return request({
      url: '/meetingRoom/addOrEditMeetingRoom',
      method: 'post',
      data:qs.stringify(data)
    })
  }



// 会议室订单列表

export function getMeetingRoomOrderList(data) {
  return request({
    url: '/meetingRoomOrder/getMeetingRoomOrderList',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function addOrEditMeetingRoomOrder(data) {
  return request({
    url: '/meetingRoomOrder/addOrEditMeetingRoomOrder',
    method: 'post',
    data:qs.stringify(data)
  })
}


//会议室申请事由

export function getMeetingRoomReasonList(data) {
  return request({
    url: '/meetingRoomReason/getMeetingRoomReasonList',
    method: 'post',
    data:qs.stringify(data)
  })
}

export function addOrEditMeetingRoomReason(data) {
  return request({
    url: '/meetingRoomReason/addOrEditMeetingRoomReason',
    method: 'post',
    data:qs.stringify(data)
  })
}

// 获取可用会议室
export function getMeetingRooms() {
  return request({
    url: '/meetingRoom/getMeetingRooms',
    method: 'post'
  })
}


// 会议室评价
export function getMeetingRoomCommentList(data) {
  return request({
    url: 'meetingRoomComment/getMeetingRoomCommentList',
    method: 'post',
    data:qs.stringify(data)
  })
}




// 获取会服信息
export function getMeetingService(data) {
  return request({
    url: 'meetingRoomOrder/getMeetingService',
    method: 'post',
    data:qs.stringify(data)
  })
}


