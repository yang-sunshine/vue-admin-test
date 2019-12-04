import { login, getInfo } from '@/api/user'
import { getCertificate, getPerson, getCompanyCode, setCompanyCode, setPerson, setCertificate, removeCompanyCode, removeCertificate, removePerson } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  certificate: getCertificate(),
  name: '',
  id: getPerson(),
  avatar: '',
  companyCode: getCompanyCode()
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
  },
  SET_COMPANYCODE: (state, companyCode) => {
    state.companyCode = companyCode
  }
}

const actions = {
  // user login
  login({ commit }, loginInfo) {
    const { username, password, ip, companyCode } = loginInfo

    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, ip: ip, companyCode: companyCode }).then(response => {
        const { data } = response
        commit('SET_ID', data.personId)
        commit('SET_CERTIFICATE', data.certificate)
        commit('SET_COMPANYCODE', companyCode)
        setCompanyCode(companyCode)
        setPerson(data.personId)
        setCertificate(data.certificate)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const id = state.id
      const companyCode = state.companyCode
      getInfo({ id: id, companyCode: companyCode }).then(response => {
        const { data } = response
        const { real_name, head_pic_path, id } = data
        commit('SET_NAME', real_name)
        commit('SET_AVATAR', head_pic_path)
        commit('SET_ID', id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    commit('SET_CERTIFICATE', '')
    commit('SET_COMPANYCODE', '')
    removeCompanyCode()
    removePerson()
    removeCertificate()
    resetRouter()
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

