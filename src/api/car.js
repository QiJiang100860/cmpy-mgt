import request from './request'
import qs from 'qs'

//品牌列表
export function getCarBrandList(data) {
    return request({
        url: '/carBrand/getCarBrandList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function addOrEditCarBrand(data) {
    return request({
        url: '/carBrand/addOrEditCarBrand',
        method: 'post',
        data: qs.stringify(data)
    })
}

// 车系列表

export function getCarSeriesList(data) {
    return request({
        url: '/carSeries/getCarSeriesList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function addOrEditCarSeries(data) {
    return request({
        url: '/carSeries/addOrEditCarSeries',
        method: 'post',
        data: qs.stringify(data)
    })
}

// 车辆年代

export function getCarPreiodList(data) {
    return request({
        url: '/carPeriod/getCarPreiodList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function addOrEditCarPreiod(data) {
    return request({
        url: '/carPeriod/addOrEditCarPreiod',
        method: 'post',
        data: qs.stringify(data)
    })
}



// 车辆列表

export function getCarList(data) {
    return request({
        url: '/car/getCarList',
        method: 'post',
        data: qs.stringify(data)
    })
}


export function addOrEditCar(data) {
    return request({
        url: '/car/addOrEditCar',
        method: 'post',
        data: qs.stringify(data)
    })
}

// 车辆删除

export function delCarByCarId(data) {
    return request({
        url: '/car/delCarByCarId',
        method: 'post',
        data: qs.stringify(data)
    })
}


// 用车订单


export function getUseCarOrderList(data) {
    return request({
        url: '/useCarOrder/getUseCarOrderList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function addOrEditUseCarOrder(data) {
    return request({
        url: '/useCarOrder/addOrEditUseCarOrder',
        method: 'post',
        data: qs.stringify(data)
    })
}

// 用车事由

export function getUseCarReasonList(data) {
    return request({
        url: '/useCarReason/getUseCarReasonList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function addOrEditUseCarReason(data) {
    return request({
        url: '/useCarReason/addOrEditUseCarReason',
        method: 'post',
        data: qs.stringify(data)
    })
}



// 三级联动获取车辆接口

// 获取品牌列表
export function getCarBrands() {
    return request({
        url: '/carBrand/getCarBrands',
        method: 'post'
    })
}

// 获取车系列表
export function getCarSeries(data) {
    // param  carBrandId
    return request({
        url: '/carSeries/getCarSeries',
        method: 'post',
        data: qs.stringify(data)
    })
}



export function getCars() {
    // 可用车辆列表
    return request({
        url: '/car/getCars',
        method: 'post'
    })
}


