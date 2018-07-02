<template>
  <div>
    <header class="page__header">
      <btn-back :link="backLink" color="#0077FF"></btn-back>
      <h1>[category]</h1>
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

export default {
  name: 'PageIngredientsCategoryId',
  components: {
    BtnBack,
    ListGroupCheckboxes
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
    }
  },
  methods: {
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
