const recipesUrl = (process.env.NODE_ENV === 'production') ? '/api/recipes' : 'http://localhost:3000/api/recipes'

export default {
  async getAll ({ dispatch, commit, getters, rootGetters }, options) {
    try {
      commit('startLoading')
      const excludedRecipeIds = getters['allRecipes'].map(recipe => recipe.id)
      const recipes = await fetch(`${recipesUrl}?excludedIngredients=${options.ingredients}&excludedRecipeIds=${excludedRecipeIds}&random=true`).then(result => result.json())
      if (recipes) {
        commit('addAll', recipes)
      }
      return recipes
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the recipes. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  }
}
