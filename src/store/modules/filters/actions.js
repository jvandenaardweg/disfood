const ingredientsUrl = (process.env.NODE_ENV === 'production') ? '/api/ingredients' : 'http://localhost:3000/api/ingredients'

export default {
  async getIngredients ({ dispatch, commit, getters, rootGetters }, options) {
    try {
      commit('startLoading')
      const excludedIngredients = options.excludedIngredients
      const search = options.search
      const ingredients = await fetch(`${ingredientsUrl}?search=${search}&excludedIngredients=${excludedIngredients}`).then(result => result.json())
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
