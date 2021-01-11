import { setToken } from '@/utils/auth.js'
import router from '@/router'
const state = {
  roles: []
}
const mutations = {
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
const actions = {
  // 获取信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (1 < 2) {
        const data = ['admin1']
        commit('SET_ROLES', data)
        resolve(data)
      } else {
        reject()
      }
    })
  },
  //登陆
  login({ commit, state }) {
    setToken('zdw')
    router.push('/')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
