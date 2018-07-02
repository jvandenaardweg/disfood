<template>
  <div>
    <header class="page__header">
      <btn-back :link="backLink" color="#0077FF"></btn-back>
      <h1>[category]</h1>
      <btn :label="selectAllLabel" className="btn-link" @click.native="handleToggleSelectAll"></btn>
    </header>
    <list-group-checkboxes
      :items="ingredients[categoryId]"
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
      ingredients: 'filters/ingredients',
      excludedIngredients: 'filters/excludedIngredients'
    }),
    backLink () {
      return '/ingredients'
    },
    categoryId () {
      return this.$route.params.categoryId
    },
    hasSelectedAllItems () {
      const ingredients = this.ingredients[this.categoryId]
      if (ingredients) {
        // Determine if the user has selected all the items in this category
        const totalSelectedItems = ingredients.reduce((prev, ingredient) => {
          if (this.excludedIngredients.includes(ingredient)) {
            prev = prev + 1
          }
          return prev
        }, 0)

        if (totalSelectedItems === ingredients.length) {
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
        // Remove the ingredients from the users list
        // Determine the ingredients to remove in this category
        const newExcludedIngredientsArray = this.excludedIngredients.filter(ingredient => {
          return this.ingredients[this.categoryId].includes(ingredient)
        })

        newExcludedIngredientsArray.forEach(ingredient => {
          this.$store.commit('filters/removeExcludedIngredient', ingredient)
        })

        // TODO: when the user selects all in a category, also use the category name in the excluded ingredients?
        // For example: when the user selects all "fish" we also should include the tag "fish"
        // Same goes for "meat" and others...
        // We probably should do that in the backend: when the ingredients match all in a certain category, also include that category name
      } else {
        // check all
        this.ingredients[this.categoryId].forEach(ingredient => {
          this.$store.commit('filters/setExcludedIngredient', ingredient)
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
