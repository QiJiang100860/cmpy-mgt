import request from './request'
import qs from 'qs'

export function getJionUsList(data) {
    return request({
        url: '/joinUs/getJionUsList',
        method: 'post',
        data: qs.stringify(data)
    })
}



export function addOrEditJoinUs(data) {
    return request({
        url: '/joinUs/addOrEditJoinUs',
        method: 'post',
        data: qs.stringify(data)
    })
}