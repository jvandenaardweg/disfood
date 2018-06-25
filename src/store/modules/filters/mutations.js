import Vue from 'vue'
import initialState from '@/store/modules/recipes/initialState'

export default {
  setExcludedIngredient (state, items) {
    Vue.set(state, 'excludedIngredients', items)
  },
  setRecipeTime (state, time) {
    Vue.set(state, 'recipeTime', time)
    localStorage.setItem('recipeTime', time)
  },
  resetExcludedIngredients (state) {
    Vue.set(state, 'excludedIngredients', [])
  },
  resetRecipeTime (state) {
    Vue.set(state, 'recipeTime', null)
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
