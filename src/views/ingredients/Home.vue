<template>
  <div>
    <header class="page__header">
      <h1>Ingrediënten</h1>
    </header>

    <header-search @input="handleSearchInput"></header-search>

    <section class="section" v-show="!searchQuery">
      <category-blocks
        :categories="ingredientCategories"
        :ingredients="ingredients"
        :selected-category-items="excludedIngredients"
        base-url="ingredients">
      </category-blocks>
    </section>

    <section class="section" v-show="!searchQuery">
      <btn className="btn-primary btn-block" label="Reset ingredienten" @click.native="handleReset" :disabled="!excludedIngredients.length"></btn>
    </section>

    <!-- <section class="section">
      <ingredients-form></ingredients-form>
    </section> -->

    <!-- <footer class="page__footer">
      <h2>Mis je iets?</h2>
      <p>Laat het ons weten! Met jouw hulp kunnen wij de app beter maken voor jou én anderen.</p>
      <btn label="Geef feedback" className="btn-outline-white"></btn>
    </footer> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IngredientsForm from '@/components/IngredientsForm'
import HeaderSearch from '@/components/HeaderSearch'
import CategoryBlocks from '@/components/CategoryBlocks'
import Btn from '@/components/Btn'

export default {
  name: 'PageIngredientsHome',
  components: {
    IngredientsForm,
    HeaderSearch,
    CategoryBlocks,
    Btn
  },
  data: () => ({
    searchQuery: null
  }),
  computed: {
    ...mapGetters({
      excludedIngredients: 'filters/excludedIngredients',
      ingredients: 'ingredients/ingredients',
      ingredientCategories: 'ingredients/ingredientCategories'
    })
  },
  methods: {
    handleReset () {
      this.$store.commit('filters/resetExcludedIngredients')
    },
    handleSearchInput (value) {
      this.searchQuery = value
    }
  }
}
</script>

<style lang="scss">
.page-ingredients {

}
</style>
