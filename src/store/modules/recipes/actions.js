const recipesUrl = (process.env.NODE_ENV === 'production') ? '/api/recipes' : 'http://localhost:3000/api/recipes'

export default {
  async getAll ({ dispatch, commit, getters, rootGetters }, options) {
    try {
      commit('startLoading')
      const excludedRecipeIds = getters['allRecipes'].map(recipe => recipe.id)
      const recipeTime = options.recipeTime || null
      const recipes = await fetch(`${recipesUrl}?excludedIngredients=${options.ingredients}&excludedRecipeIds=${excludedRecipeIds}&recipeTime=${recipeTime}&random=true`).then(result => result.json())
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
  },

  async getMore ({ dispatch, commit, getters, rootGetters }, options) {
    try {
      commit('startLoading')
      const excludedRecipeIds = getters['allRecipes'].map(recipe => recipe.id)
      const recipeTime = options.recipeTime || null
      const recipes = await fetch(`${recipesUrl}?excludedIngredients=${options.ingredients}&excludedRecipeIds=${excludedRecipeIds}&recipeTime=${recipeTime}&random=true`).then(result => result.json())
      if (recipes) {
        commit('addMore', recipes)
      }
      return recipes
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the recipes. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  },

  async getOne ({ dispatch, commit, getters, rootGetters }, recipeId) {
    try {
      commit('startLoading')
      const recipe = await fetch(`${recipesUrl}/${recipeId}`).then(result => result.json())
      if (recipe) {
        commit('addOne', recipe)
      }
      return recipe
    } catch (error) {
      const errorMessage = (error.response) ? error.response.data.message : 'We could not get the recipe. Please try again later.'
      commit('setError', errorMessage)
      return error
    } finally {
      commit('stopLoading')
    }
  }
}
