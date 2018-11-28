import request from './request'
import qs from 'qs'

// 菜品列表
export function getRestaurantDishesList(data) {
    return request({
        url: '/restaurantDishes/getRestaurantDishesList',
        method: 'post',
        data: qs.stringify(data)
    })
}

//添加菜品
export function addOrEditRestaurantDishes(data) {
    return request({
        url: '/restaurantDishes/addOrEditRestaurantDishes',
        method: 'post',
        data: qs.stringify(data)
    })
}


export function delRestaurantDishes(data) {
    return request({
        url: '/restaurantDishes/delRestaurantDishes',
        method: 'post',
        data: qs.stringify(data)
    })
}



// 菜单

export function getDailyMenuList(data) {
    return request({
        url: '/dailyMenu/getDailyMenuList',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function addOrEditDailyMenu(data) {
    return request({
        url: '/dailyMenu/addOrEditDailyMenu',
        method: 'post',
        data: qs.stringify(data)
    })
}

// 或许可选菜品
export function getRestaurantDishes() {
    return request({
        url: '/restaurantDishes/getRestaurantDishes',
        method: 'post' 
    })
}