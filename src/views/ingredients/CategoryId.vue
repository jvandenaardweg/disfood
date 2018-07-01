<template>
  <div>
    <header class="page__header">
      <btn-back :link="backLink" color="#0077FF"></btn-back>
      <h1>[category]</h1>
    </header>
    <ul class="list-group">
      <li v-for="ingredient in ingredients[categoryId]" :key="ingredient">
        <label class="checkbox-inline">{{ ingredient }}
          <input type="checkbox" name="ingredient" :checked="excludedIngredients.includes(ingredient)" :value="ingredient" @change="handleChange" />
          <span class="checkbox-custom">
            <svg class="icon-checked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg class="icon-unchecked" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BtnBack from '@/components/BtnBack'

export default {
  name: 'PageIngredientsCategoryId',
  components: {
    BtnBack
  },
  computed: {
    ...mapGetters({
      ingredients: 'filters/ingredients',
      excludedIngredients: 'filters/excludedIngredients'
    }),
    // fruits () {
    //   return ['aardbei', 'banaan', 'appel', 'sinaasappel']
    // },
    backLink () {
      return '/ingredients'
    },
    categoryId () {
      return this.$route.params.categoryId
    }
  },
  methods: {
    handleChange (event) {
      const value = event.target.value

      if (this.excludedIngredients.includes(value)) {
        this.$store.commit('filters/removeExcludedIngredient', value)
      } else {
        this.$store.commit('filters/setExcludedIngredient', value)
      }
    }
  }
}
</script>

<style lang="scss">
.list-group {
  list-style: none;
  padding: 0;
  margin: 0 -1.5rem 0 -1.5rem;

  li {
    padding: 1.5rem;
    border-bottom: 1px $gray-90 solid;

    // &:first-child {
    //   border-top: 1px $gray-90 solid;
    // }
  }
}

.checkbox-inline {
  display: flex;
  margin-top: -1.5rem;
  margin-bottom: -1.5rem;
  padding: 1.5rem 0;

  input {
    display: none;
  }

  input:checked + .checkbox-custom {
    // background: green;

    .icon-checked {
      display: inline-block;
      fill: $color-primary;
    }

    .icon-unchecked {
      display: none;
    }
  }

  .checkbox-custom {
    margin-left: auto;
    width: 24px;
    height: 24px;
    // border: 1px $gray-90 solid;
    // background-color: $gray-90;

    .icon-checked {
      display: none;
    }

    .icon-unchecked {
      display: inline-block;
      fill: $color-primary;
    }
  }
}
</style>
