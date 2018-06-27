import Vue from 'vue'
import initialState from '@/store/modules/recipes/initialState'

export default {
  addAll (state, items) {
    Vue.set(state, 'recipes', items)
  },
  addMore (state, items) {
    state.recipes.push(...items)
  },
  addOne (state, recipe) {
    state.recipes.push(recipe)
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
