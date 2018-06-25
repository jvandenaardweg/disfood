import actions from '@/store/modules/recipes/actions'
import getters from '@/store/modules/recipes/getters'
import mutations from '@/store/modules/recipes/mutations'
import state from '@/store/modules/recipes/state'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
