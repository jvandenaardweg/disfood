import Vue from 'vue'
import initialState from '@/store/modules/recipes/initialState'

export default {
  setExcludedIngredient (state, items) {
    Vue.set(state, 'excludedIngredients', items)
  },
  resetExcludedIngredients (state) {
    Vue.set(state, 'excludedIngredients', [])
  },
  resetState (state) {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}
