import actions from '@/store/modules/filters/actions'
import getters from '@/store/modules/filters/getters'
import mutations from '@/store/modules/filters/mutations'
import state from '@/store/modules/filters/state'

const cachedExcludedIngredients = window.localStorage.getItem('excludedIngredients')
if (cachedExcludedIngredients) {
  state.excludedIngredients = cachedExcludedIngredients.split(',')
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
