const ingredientsUrl = (process.env.NODE_ENV === 'production') ? '/api/ingredients' : 'http://localhost:3000/api/ingredients'

export default {
  async getIngredientCategories ({ dispatch, commit, getters, rootGetters }, options) {
    try {
      commit('startLoading')
      const ingredientCategories = await fetch(`${ingredientsUrl}/categories`).then(result => result.json())
      if (ingredientCategories) {
        commit('addIngredientCategories', ingredientCategories)
      }
      return ingredientCategories
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the ingredient categories. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  },
  async getIngredients ({ dispatch, commit, getters, rootGetters }, options) {
    try {
      commit('startLoading')
      const ingredients = await fetch(`${ingredientsUrl}`).then(result => result.json())
      if (ingredients) {
        commit('addIngredients', ingredients)
      }
      return ingredients
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the ingredients. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  },
  async searchIngredients ({ dispatch, commit, getters, rootGetters }, searchQuery) {
    try {
      commit('startLoading')
      const ingredients = await fetch(`${ingredientsUrl}?search=${searchQuery}`).then(result => result.json())
      return ingredients
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the ingredients. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  }
}
