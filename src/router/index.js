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
  {
    path: '', //首页不加
    component: Layout,
    redirect: 'welcome',
    children: [{
      path: 'welcome',
      component: _import('welcome/index'),
      name: 'welcome',
      meta: { title: '欢迎页', icon: 'shezhihuanyingye', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [



  // 公共配置
  {
    path: '/pubInfo',
    alwaysShow: true,
    component: Layout,
    redirect: '/pubInfo/video',
    meta: {
      title: '公共配置',
      icon: 'gonggongpeizhi'
    },
    children: [
      { path: 'videoOrImg', component: _import('pubInfo/videoOrImg'), name: 'home_videoOrImg', meta: { title: '启动页视频' } },
      { path: 'subCpy', component: _import('pubInfo/subCpy'), name: 'home_subCpy', meta: { title: '子公司列表' } },
    ]
  },

  // 首页管理
  {
    path: '/home',
    alwaysShow: true,
    component: Layout,
    redirect: '/home/banner',
    meta: {
      title: '首页管理',
      icon: 'shouyepeizhi'
    },
    children: [
      { path: 'banner', component: _import('home/banner'), name: 'home_banner', meta: { title: 'banner管理' } },
      { path: 'cpyService', component: _import('home/cpyService'), name: 'home_cpyService', meta: { title: '企业服务' } },
      { path: 'brief', component: _import('home/brief'), name: 'home_brief', meta: { title: '集团简介' } },
      { path: 'superiority', component: _import('home/superiority'), name: 'home_superiority', meta: { title: '服务优势' } },
      { path: 'case', component: _import('home/case'), name: 'home_case', meta: { title: '服务案例' } },
    ]
  },


  // 企业服务
  {
    path: '/service',
    alwaysShow: true,
    component: Layout,
    redirect: '/service/list',
    meta: {
      title: '企业服务',
      icon: 'qiyefuwu'
    },
    children: [
      { path: 'sMainPic', component: _import('service/sMainPic'), name: 'service_sMainPic', meta: { title: '企业服务形象图' } },
      {
        path: 'list', component: _import('service/list'), name: 'service_list', meta: { title: '企业服务列表' }
      },




    ]
  },
  // 商务合作
  {
    path: '/commerce',
    alwaysShow: true,
    component: Layout,
    redirect: '/commerce/list',
    meta: {
      title: '商务合作',
      icon: 'shangwuhezuo1'
    },
    children: [
      { path: 'list', component: _import('commerce/list'), name: 'commerce_list', meta: { title: '商务合作' } },
    ]
  },
  // 企业文化
  {
    path: '/cpyCulture',
    alwaysShow: true,
    component: Layout,
    redirect: '/cpyCulture/imges',
    meta: {
      title: '企业文化',
      icon: 'qiyewenhua'
    },
    children: [
      { path: 'cpyConcept', component: _import('cpyCulture/cpyConcept'), name: 'cpyCulture_cpyConcept', meta: { title: '企业理念' } },
      { path: 'develop', component: _import('cpyCulture/develop'), name: 'cpyCulture_develop', meta: { title: '企业发展历程' } },
      { path: 'teamList', component: _import('cpyCulture/teamList'), name: 'cpyCulture_teamList', meta: { title: '团队风采' } }
    ]
  },



  // 加入我们
  {
    path: '/joinUs',
    alwaysShow: true,
    component: Layout,
    redirect: '/joinUs/imges',
    meta: {
      title: '加入我们',
      icon: 'jiaruwomen'
    },
    children: [
      { path: 'imges', component: _import('joinUs/imges'), name: 'joinUs_imges', meta: { title: '加入我们配置图' } },
      { path: 'jobList', component: _import('joinUs/jobList'), name: 'joinUs_jobList', meta: { title: '岗位列表' } },
    ]
  },



  // 系统管理
  {
    path: '/system',
    alwaysShow: true,
    component: Layout,
    redirect: '/system/permission',
    meta: {
      title: '系统管理',
      icon: 'xitongguanli'
    },
    children: [
      { path: 'permission', component: _import('system/permission'), name: 'system_permission', meta: { title: '系统权限' } },
      { path: 'roles', component: _import('system/roles'), name: 'system_roles', meta: { title: '系统角色' } },
      { path: 'user', component: _import('system/user'), name: 'system_user', meta: { title: '系统用户' } },
      { path: 'param', component: _import('system/param'), name: 'system_param', meta: { title: '系统参数' } },
      { path: 'dataDictCat', component: _import('system/dataDictCat'), name: 'system_dataDictCat', meta: { title: '数据字典分类' } },
      { path: 'dataDictItem', component: _import('system/dataDictItem'), name: 'system_dataDictItem', meta: { title: '数据字典项' } }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
