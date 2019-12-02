import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, setCertificate, getCertificate, removeCertificate } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  id: '',
  avatar: '',
  certificate: getCertificate()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_CERTIFICATE: (state, certificate) => {
    state.certificate = certificate
  }
}

const actions = {
  // user login
  login({ commit }, loginInfo) {
    const { username, password, ip, companyCode } = loginInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, ip: ip, companyCode: companyCode }).then(response => {
        console.log(response)
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_ID', data.personId)
        commit('SET_CERTIFICATE', data.certificate)
        commit('SET_NAME', username)
        commit('SET_AVATAR', data.headPicPath)
        setToken(data.token)
        setCertificate(data.certificate)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    commit('SET_CERTIFICATE', '')
    removeCertificate()
    resetRouter()
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout1({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // remove certificate
  resetCertificate({ commit }) {
    return new Promise(resolve => {
      commit('SET_CERTIFICATE', '')
      removeCertificate()
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

