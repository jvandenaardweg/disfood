import Vue from 'vue'
import initialState from '@/store/modules/recipes/initialState'

export default {
  setExcludedIngredient (state, items) {
    Vue.set(state, 'excludedIngredients', items)
  },
  resetExcludedIngredients (state) {
    Vue.set(state, 'excludedIngredients', [])
  },
  startLoading (state) {
    Vue.set(state, 'isLoading', true)
  },
  stopLoading (state) {
    Vue.set(state, 'isLoading', false)
  },
  setError (state, error) {
    Vue.set(state, 'error', error)
  },
  removeError (state) {
    Vue.set(state, 'error', null)
  },
  resetState (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}
