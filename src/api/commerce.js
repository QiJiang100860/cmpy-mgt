import request from './request'
import qs from 'qs'

export function getCommerceList(data) {
    return request({
        url: '/commerce/getCommerceList',
        method: 'post',
        data: qs.stringify(data)
    })
}


export function addOrEditCommerce(data) {
    return request({
        url: '/commerce/addOrEditCommerce',
        method: 'post',
        data: qs.stringify(data)
    })
}
