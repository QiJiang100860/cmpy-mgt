import { loginOut, login } from '@/api/login'
import * as cookie from '@/utils/auth'

const user = {
  state: {
    userInfro: null,
    hasUserInfro:false
  },

  mutations: {
    SET_USER_INFRO: (state, userInfro) => {
      state.userInfro = userInfro
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const loginName = userInfo.username.trim()
      const loginPassword = userInfo.password
      return new Promise((resolve, reject) => {
        login({ loginName, loginPassword }).then(res => {
          if (res.data.code === "1") {
            commit('SET_USER_INFRO', res.data.data)
            cookie.setUserInfro(res.data.data)
            cookie.setHasInfro(true)
            resolve()
          } else {
            reject(res.data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        loginOut().then(() => {
          commit('SET_USER_INFRO', null)
          cookie.removeUserInfro()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER_INFRO', null)
        cookie.removeUserInfro()
        resolve()
      })
    }
  }
}

export default user
