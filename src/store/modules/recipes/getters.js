export default {
  hasRecipes: state => {
    return state.recipes.length > 0
  },
  allRecipes: state => {
    return state.recipes
  },
  getRecipeById: state => (id) => {
    return state.recipes.find(recipe => recipe.id === id)
  },
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  }
}
