import Vue from 'vue'
import 'babel-polyfill'//兼容ie
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import App from './App'
import router from './router'
import store from './store'
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data


// 注册全局表头搜索函数、注册全局表格数据重置函数(添加删除标识)
import * as seach from './utils/modelFuntion/seach'
import {addDelState} from './utils/modelFuntion/addDelState'
Vue.prototype.$addDelState = addDelState
Vue.prototype.$seach = seach


Vue.use(Element)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
