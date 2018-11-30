import request from './request'
import qs from 'qs'

export function getCompanyList(data) {
    return request({
        url: '/company/getCompanyList',
        method: 'post',
        data: qs.stringify(data)
    })
}



export function addOrEditCompany(data) {
    return request({
        url: '/company/addOrEditCompany',
        method: 'post',
        data: qs.stringify(data)
    })
}


export function delCompany(data) {
    return request({
        url: '/company/delCompany',
        method: 'post',
        data: qs.stringify(data)
    })
}

