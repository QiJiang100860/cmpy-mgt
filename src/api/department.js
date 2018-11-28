import request from './request'
import qs from 'qs'

//科室管理

//获取科室列表
export function getSectionList(data) {
  return request({
    url: '/section/getSectionList',
    method: 'post',
    data:qs.stringify(data)
  })
}
//增加编辑科室
export function addOrEditSection(data) {
  return request({
    url: '/section/addOrEditSection',
    method: 'post',
    data:qs.stringify(data)
  })
}

//删除
export function deleteSection(data) {
  return request({
    url: '/section/deleteSection',
    method: 'post',
    data:qs.stringify(data)
  })
}


// 部门管理

//获取部门列表
export function getDeptList(data) {
  return request({
    url: '/dept/getDeptList',
    method: 'post',
    data:qs.stringify(data)
  })
}


//增加编辑部门
export function addOrEditDept(data) {
  return request({
    url: '/dept/addOrEditDept',
    method: 'post',
    data:qs.stringify(data)
  })
}


// 获取员工列表
export function getMemberList(data) {
  return request({
    url: '/member/getMemberList',
    method: 'post',
    data:qs.stringify(data)
  })
}

//增加编辑员工
export function addOrEditMember(data) {
  return request({
    url: '/member/addOrEditMember',
    method: 'post',
    data:qs.stringify(data)
  })
}


// 获取可选科室
export function getSections() {
  return request({
    url: '/section/getSections',
    method: 'post',
  })
}


//职务管理

//获取职务列表
export function getPositionList(data){
  return request({
    url:'position/getPositionList',
    method:'post',
    data:qs.stringify(data)
  })
}
//增加编辑职务
export function addOrEditPosition(data){
  return request({
    url:'/position/addOrEditPosition',
    method:'post',
    data:qs.stringify(data)
  })
}
//删除职务
export function delPosition(data) {
  return request({
    url: '/position/delPosition',
    method: 'post',
    data:qs.stringify(data)
  })
}
