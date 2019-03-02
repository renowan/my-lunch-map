import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

const state = () => ({
  isLogin: false,
  isLoading: false,
  user: null
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
