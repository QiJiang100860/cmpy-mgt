import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getUserInfro } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getUserInfro()) { // determine if there has token
    /* 如果有用户信息*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 判断是不是已经有了
      if(store.getters.addRouters.length === 0){
        const permissionTree = JSON.parse(getUserInfro()).permissionTree;
        store.dispatch('GenerateRoutes', { permissionTree }).then(() => {
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('Verification failed, please login again')
            next({ path: '/login' })
          })
        })
      }else{
        next()
      }  
    }
  } else {
    if(to.path!=="/login"){
      next({ path: '/login' }) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }else{
      next()
      NProgress.done() 
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
