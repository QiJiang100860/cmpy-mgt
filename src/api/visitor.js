import request from './request'
import qs from 'qs'


// 根据科室id查询，人员信息
export function getMemberListBySection(data) {
    return request({
        url: '/member/getMemberListBySection',
        method: 'post',
        data: qs.stringify(data)
    })
}


// 添加访客信息

export function addOrEditVisitor(data) {
    return request({
        url: '/visitor/addOrEditVisitor',
        method: 'post',
        data: qs.stringify(data)
    })
}



// 获取访客信息列表

export function getVisitorList(data) {
    return request({
        url: '/visitor/getVisitorList',
        method: 'post',
        data: qs.stringify(data)
    })
}


// 获取访客详情
export function getVisitor(data) {
    return request({
        url: '/visitor/getVisitor',
        method: 'post',
        data: qs.stringify(data)
    })
}

// 获取访客事由列表


// 获取访客事由
export function getVisitReasonList(data) {
    return request({
        url: '/visitReason/getVisitReasonList',
        method: 'post',
        data: qs.stringify(data)
    })
}


// 编辑访客事由
export function addOrEditVisitReason(data) {
    return request({
        url: '/visitReason/addOrEditVisitReason',
        method: 'post',
        data: qs.stringify(data)
    })
}


// 删除事由

export function deleteVisitReason(data) {
    return request({
        url: '/visitReason/deleteVisitReason',
        method: 'post',
        data: qs.stringify(data)
    })
}