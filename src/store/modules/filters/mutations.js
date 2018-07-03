import Vue from 'vue'
import initialState from '@/store/modules/filters/initialState'

export default {
  setExcludedIngredient (state, item) {
    if (!state.excludedIngredients.includes(item)) {
      state.excludedIngredients.push(item)
    }
    localStorage.setItem('excludedIngredients', state.excludedIngredients.join(','))
  },
  removeExcludedIngredient (state, item) {
    if (state.excludedIngredients.includes(item)) {
      const index = state.excludedIngredients.indexOf(item)
      state.excludedIngredients.splice(index, 1)
      localStorage.setItem('excludedIngredients', state.excludedIngredients.join(','))
    }
  },
  addIngredientCategories (state, items) {
    Vue.set(state, 'ingredientCategories', items)
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
