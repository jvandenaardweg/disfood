<template>
  <div>
    <recipe v-if="recipe" :recipe="recipe"></recipe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Recipe from '@/components/Recipe'

export default {
  name: 'recipes-id',
  components: {
    Recipe
  },
  data: () => ({
    isLoading: null
  }),
  async beforeMount () {
    if (!this.recipe) {
      try {
        this.isLoading = true
        console.log('get from API')
        await this.$store.dispatch('recipes/getOne', this.recipeId)
      } catch (err) {
        console.log('ERROR getting the recipe from the API')
      } finally {
        this.isLoading = false
      }
    } else {
      console.log('use from store')
    }
  },
  computed: {
    ...mapGetters({
      getRecipeById: 'recipes/getRecipeById'
    }),
    recipeId () {
      return parseFloat(this.$route.params.recipeId)
    },
    recipe () {
      return this.getRecipeById(this.recipeId)
    }
  }
}
</script>

<style lang="scss">

</style>
