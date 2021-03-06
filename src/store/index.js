import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate' // Persist state for our PWA (so on reloads we persist state)

import RecipesStore from '@/store/modules/recipes'
import FiltersStore from '@/store/modules/filters'
import IngredientsStore from '@/store/modules/ingredients'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    recipes: RecipesStore,
    filters: FiltersStore,
    ingredients: IngredientsStore
  }
  // plugins: [createPersistedState({
  //   paths: [
  //     'balances.balances',
  //     'symbols.symbols',
  //     'prices.prices',
  //     'keys.keys'
  //   ]
  // })]
})
