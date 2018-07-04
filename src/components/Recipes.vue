<template>
  <div class="recipes">
    <header>
      <h1>Hoeveel tijd heb jij vandaag?</h1>
      <input-recipe-time @change="handleRecipeTimeChange"></input-recipe-time>
    </header>

    <recipes-carousel :title="order" :recipes="recipes" v-for="(order, index) in recipesOrder" :key="index"></recipes-carousel>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Btn from '@/components/Btn'
import RecipesCarousel from '@/components/RecipesCarousel'
import InputRecipeTime from '@/components/InputRecipeTime'

export default {
  name: 'Recipes',
  components: {
    Btn,
    RecipesCarousel,
    InputRecipeTime
  },
  data: () => ({
    isLoading: null
  }),
  mounted () {
    this.getNewData()
  },
  activated () {
    console.log('check if user has new filters')
  },
  computed: {
    ...mapGetters({
      recipes: 'recipes/allRecipes',
      excludedIngredients: 'filters/excludedIngredients',
      recipeTime: 'filters/recipeTime'
    }),
    suggestRecipeDayCategory () {
      const hours = new Date().getHours()

      // 09:00 - 12:59
      if (hours >= 9 && hours <= 12) {
        return 'Lunch'
      } else {
        return 'Avondeten'
      }
    },
    recipesOrder () {
      if (this.suggestRecipeDayCategory === 'Avondeten') {
        return ['Avondeten', 'Lunch']
      } else {
        return ['Lunch', 'Avondeten']
      }
    }
  },
  methods: {
    handleRecipeTimeChange (recipeTime) {
      this.getNewData()
    },
    handleClickSupriseMe (event) {
      window.alert('Should show recipes one by one, Tinder style.')
    },
    async getMoreData () {
      try {
        await this.$store.dispatch('recipes/getMore', {
          ingredients: this.excludedIngredients,
          recipeTime: this.recipeTime
        })
      } catch (err) {
        console.log('ERROR getting more recipes', err)
      } finally {
        this.isLoading = false
      }
    },
    async getNewData () {
      this.isLoading = true

      try {
        await this.$store.dispatch('recipes/getAll', {
          ingredients: this.excludedIngredients,
          recipeTime: this.recipeTime
        })
      } catch (err) {
        console.log('ERROR getting all recipes', err)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">

.recipes {

  > header {
    padding: 1.5rem;
    text-align: center;
    border-bottom: 1px $gray-90 solid;
    background-color: $color-primary;
    color: $color-white;

    .form-control {
      background-color: rgba($color-white, 0.2);

      &:after {
        border-top-color: $color-white;
      }
    }

    select {
      color: $color-white;
      font-size: 1.6rem;
    }

    h1 {
      font-size: 2.2rem;
    }

    .btn {
      margin-top: 1rem;
    }

    small {
      text-align: left;
      color: $gray-50;
      display: block;
      margin-top: 1rem;
    }
  }
}

.recipes-filter__ingredients {
  padding-left: 1.5rem;
  margin-right: -1.5rem;
  margin-left: -1.5rem;
  text-align: left;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 1rem;
}
</style>
