import request from './request'
import qs from 'qs'

export function getStartupPageConfigList(data) {
    return request({
        url: '/startupPageConfig/getStartupPageConfigList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function addOrEditStartupPageConfig(data) {
    return request({
        url: '/startupPageConfig/addOrEditStartupPageConfig',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getCustomerFeedbackList(data) {
    return request({
        url: '/customerFeedback/getCustomerFeedbackList',
        method: 'post',
        data: qs.stringify(data)
    })
}
//投诉建议
export function getComplaintList(data) {
    return request({
        url: '/complaint/getComplaintList',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function addOrEditComplaint(data) {
    return request({
        url: '/complaint/addOrEditComplaint',
        method: 'post',
        data: qs.stringify(data)
    })
}



//规章制度
export function getRuleList(data) {
    return request({
        url: 'rule/getRuleList',
        method: 'post',
        data: qs.stringify(data)
    })
}
export function addOrEditRule(data) {
    return request({
        url: 'rule/addOrEditRule',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function delRule(data) {
    return request({
        url: 'rule/delRule',
        method: 'post',
        data: qs.stringify(data)
    })
}



