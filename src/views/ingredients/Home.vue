<template>
  <div>
    <header class="page__header">
      <h1>Ingrediënten</h1>
    </header>

    <header-search @input="handleSearchInput"></header-search>

    <!-- <btn label="Bekijk" className="btn-primary"></btn> -->


    <section class="section" v-if="!searchQuery">
      <category-blocks
        :categories="ingredientCategories"
        :category-items="ingredients"
        :selected-category-items="excludedIngredients"
        base-url="ingredients">
      </category-blocks>
    </section>

    <!-- <section class="section">
      <ingredients-form></ingredients-form>
    </section> -->
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
      ingredients: 'filters/ingredients'
    }),
    ingredientCategories () {
      return [
        {
          id: 1,
          name: 'Groenten',
          slug: 'vegetables'
        },
        {
          id: 2,
          name: 'Vlees',
          slug: 'meat'
        },
        {
          id: 3,
          name: 'Vis',
          slug: 'fish'
        },
        {
          id: 4,
          name: 'Fruit',
          slug: 'fruit'
        },
        {
          id: 5,
          name: 'Kruiden',
          slug: 'herbs'
        },
        {
          id: 6,
          name: 'Zuivel',
          slug: 'dairy'
        },
        {
          id: 7,
          name: 'Pasta',
          slug: 'pasta'
        },
        {
          id: 8,
          name: 'Noten & zaden',
          slug: 'nuts'
        },
        // {
        //   id: 9,
        //   name: 'Zaden & pitten',
        //   slug: 'seeds-pits'
        // },
        {
          id: 10,
          name: 'Rijst',
          slug: 'rice'
        },
        {
          id: 11,
          name: 'Sauzen',
          slug: 'sauces'
        },
        {
          id: 12,
          name: 'Eieren',
          slug: 'eggs'
        },
        {
          id: 13,
          name: 'Brood & Granen',
          slug: 'grains'
        },
        {
          id: 14,
          name: 'Aardappelen',
          slug: 'potato'
        },
        {
          id: 15,
          name: 'Oliën',
          slug: 'oils'
        }
      ]
    }
  },
  methods: {
    handleSearchInput (value) {
      this.searchQuery = value
      console.log('change search', value)
    }
  }
}
</script>

<style lang="scss">
.page-ingredients {

}
</style>
