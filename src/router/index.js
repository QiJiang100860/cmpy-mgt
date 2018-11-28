import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

  // 系统管理
  {
    path: '/system',
    alwaysShow:true,
    component: Layout,
    redirect: '/system/permission',
    meta: {
      title: '系统管理',
      icon: 'navicon-xtgl'
    },
    children: [
      { path: 'permission', component: _import('system/permission'), name: 'system_permission', meta: { title: '系统权限' }},
      { path: 'roles', component: _import('system/roles'), name: 'system_roles', meta: { title: '系统角色' }},
      { path: 'user', component: _import('system/user'), name: 'system_user', meta: { title: '系统用户' }},
      { path: 'param', component: _import('system/param'), name: 'system_param', meta: { title: '系统参数' }},
      { path: 'dataDicFl', component: _import('system/dataDicFl'), name: 'system_dataDicFl', meta: { title: '数据字典分类' }},
      { path: 'dataDicX', component: _import('system/dataDicX'), name: 'system_dataDicX', meta: { title: '数据字典项' }}
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
