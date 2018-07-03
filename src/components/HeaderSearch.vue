<template>
  <div class="header-search">
    <input type="search" class="form-control" placeholder="Wat wil jij niet eten? (typ voor suggesties)" v-model="searchQuery" @input="handleInput" />
    <list-group-checkboxes
      v-if="searchQuery && suggestions"
      :items="suggestions"
      :selected-items="excludedIngredients"
      @change="handleChange">
    </list-group-checkboxes>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListGroupCheckboxes from '@/components/ListGroupCheckboxes'

export default {
  name: 'HeaderSearch',
  components: {
    ListGroupCheckboxes
  },
  data: () => ({
    searchQuery: null,
    suggestions: []
  }),
  computed: {
    ...mapGetters({
      excludedIngredients: 'filters/excludedIngredients'
    })
  },
  methods: {
    handleChange (value) {
      if (this.excludedIngredients.includes(value)) {
        this.$store.commit('filters/removeExcludedIngredient', value)
      } else {
        this.$store.commit('filters/setExcludedIngredient', value)
      }
    },
    async handleInput (event) {
      const value = event.target.value
      this.$emit('input', value)

      if (this.searchQuery && this.searchQuery.length > 3) {
        const ingredientSuggestions = await this.$store.dispatch('filters/getIngredients', {
          search: this.searchQuery
        })
        if (ingredientSuggestions && ingredientSuggestions.length) {
          this.suggestions = ingredientSuggestions.sort((a, b) => a.length - b.length)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.header-search {
  padding-top: 1.5rem;
}
</style>
