<template>
  <div class="header-search">
    <form class="header-search__form">
      <input type="search" class="form-control" placeholder="Wat wil jij niet eten? (typ voor suggesties)" v-model="searchQuery" @input="handleInput" />
      <button type="button" class="header-search__clear" @click.prevent="handleClear()" v-if="searchQuery">&times;</button>
    </form>

    <list-group-checkboxes
      v-if="searchQuery && suggestions"
      :isLoading="isLoading"
      :items="suggestions"
      :selected-items="excludedIngredients"
      @change="handleChange">
    </list-group-checkboxes>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapGetters } from 'vuex'
import ListGroupCheckboxes from '@/components/ListGroupCheckboxes'

export default {
  name: 'HeaderSearch',
  components: {
    ListGroupCheckboxes
  },
  data: () => ({
    searchQuery: null,
    suggestions: [],
    isLoading: null
  }),
  computed: {
    ...mapGetters({
      excludedIngredients: 'filters/excludedIngredients'
    })
  },
  methods: {
    handleClear (event) {
      this.reset()
    },
    reset () {
      this.searchQuery = null
      this.suggestions = []
      this.isLoading = null
      this.$emit('input', this.searchQuery)
    },
    handleChange (value) {
      if (this.excludedIngredients.includes(value)) {
        this.$store.commit('filters/removeExcludedIngredient', value)
      } else {
        this.$store.commit('filters/setExcludedIngredient', value)
      }
    },
    handleInput: debounce(async function (event) {
      const value = event.target.value

      this.isLoading = true
      this.$emit('input', value)

      if (!this.searchQuery) {
        this.reset()
      }

      if (this.searchQuery && this.searchQuery.length > 1) {

        try {
          const ingredientSuggestions = await this.$store.dispatch('ingredients/searchIngredients', this.searchQuery)

          if (ingredientSuggestions && ingredientSuggestions.length) {
            this.suggestions = ingredientSuggestions.sort((a, b) => a.length - b.length)
          } else {
            // empty
            this.suggestions = ingredientSuggestions
          }
        } catch (err) {
          console.log('ERROR getting ingredients by search')
        } finally {
          this.isLoading = false
        }
      }
    }, 500)
  }
}
</script>

<style lang="scss">
.header-search {
  padding-top: 1.5rem;
  position: relative;
}

.header-search__clear {
  width: 50px;
  height: 50px;
  background: $color-primary;
  color: $color-white;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  border: 0;
  font-size: 3rem;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}

.header-search__form {
  position: relative;
}
</style>
