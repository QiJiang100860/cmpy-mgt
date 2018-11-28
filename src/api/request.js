import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getUserInfro } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout
  headers: {'Content-Type':'application/x-www-form-urlencoded'}
})
console.log('请求地址：'+process.env.BASE_API);
// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  const userInfro = getUserInfro()
  let param = config.data;
  if (userInfro) {
    // 添加公共参数
    const userId = JSON.parse(userInfro).userId
    if(param){
      if(param.indexOf('userId')<0){
        config.data = param+"&userId="+userId;
      }
    }else{
      config.data = "&userId="+userId;
    }
    
    // JSON.parse(getUserInfro()).data.userId
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  //暂时这先全部返回，等登录的接口完善以后，再去修改完  response.data
  response => response,
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    Message({
      message: '网络异常，请联系管理员',
      type: 'error',
      duration: 2000
    })
    return Promise.reject(error)
  })

export default service
