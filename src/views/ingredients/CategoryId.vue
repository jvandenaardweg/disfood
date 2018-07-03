<template>
  <div>
    <header class="page__header">
      <btn-back :link="backLink" color="#0077FF"></btn-back>
      <h1>{{ categoryName }}</h1>
      <btn :label="selectAllLabel" className="btn-link" @click.native="handleToggleSelectAll"></btn>
    </header>
    <!-- {{ categoryIngredients }} -->
    <list-group-checkboxes
      v-if="categoryIngredients"
      :items="categoryIngredients"
      :selected-items="excludedIngredients"
      @change="handleChange">
    </list-group-checkboxes>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BtnBack from '@/components/BtnBack'
import ListGroupCheckboxes from '@/components/ListGroupCheckboxes'
import Btn from '@/components/Btn'

export default {
  name: 'PageIngredientsCategoryId',
  components: {
    BtnBack,
    ListGroupCheckboxes,
    Btn
  },
  computed: {
    ...mapGetters({
      ingredientCategories: 'ingredients/ingredientCategories',
      ingredients: 'ingredients/ingredients',
      excludedIngredients: 'filters/excludedIngredients'
    }),
    categoryIngredients () {
      if (this.ingredients.length) {
        return this.ingredients.filter(ingredient => ingredient.ingredientsCategoryId === this.categoryId)
      }
    },
    backLink () {
      return '/ingredients'
    },
    categoryId () {
      return parseInt(this.$route.params.categoryId)
    },
    categoryName () {
      if (this.ingredientCategories.length && this.categoryId) {
        const category = this.ingredientCategories.find(category => category.id === this.categoryId)
        return category.name
      } else {
        return null
      }
    },
    hasSelectedAllItems () {
      if (this.categoryIngredients && this.categoryIngredients.length) {
        // Determine if the user has selected all the items in this category
        const totalSelectedItems = this.categoryIngredients.reduce((prev, ingredient) => {
          if (this.excludedIngredients.includes(ingredient.name)) {
            prev = prev + 1
          }
          return prev
        }, 0)

        if (totalSelectedItems === this.categoryIngredients.length) {
          return true
        }
      }
    },
    selectAllLabel () {
      if (this.hasSelectedAllItems) {
        return 'Deselecteer alles'
      } else {
        return 'Selecteer alles'
      }
    }
  },
  methods: {
    handleToggleSelectAll () {
      if (this.hasSelectedAllItems) {
        // Uncheck all
        this.categoryIngredients.forEach(ingredient => {
          this.$store.commit('filters/removeExcludedIngredient', ingredient.name)
        })

        // TODO: when the user selects all in a category, also use the category name in the excluded ingredients?
        // For example: when the user selects all "fish" we also should include the tag "fish"
        // Same goes for "meat" and others...
        // We probably should do that in the backend: when the ingredients match all in a certain category, also include that category name
      } else {
        // Check all
        this.categoryIngredients.forEach(ingredient => {
          this.$store.commit('filters/setExcludedIngredient', ingredient.name)
        })
      }
    },
    handleChange (value) {
      console.log('change', value)
      if (this.excludedIngredients.includes(value)) {
        this.$store.commit('filters/removeExcludedIngredient', value)
      } else {
        this.$store.commit('filters/setExcludedIngredient', value)
      }
    }
  }
}
</script>
