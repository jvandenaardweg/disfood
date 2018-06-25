export default {
  hasRecipes: state => {
    return state.recipes.length > 0
  },
  allRecipes: state => {
    return state.recipes
  },
  isLoading: state => {
    return state.isLoading
  },
  error: state => {
    return state.error
  }
}
