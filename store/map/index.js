import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

const state = () => ({
  list: [],
  offset: 0,
  count: 20
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
