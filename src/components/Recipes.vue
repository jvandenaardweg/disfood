<template>
  <div>

    <loader v-if="isLoading && !recipes.length"></loader>

    <div class="recipe" v-for="(recipe, index) in recipes" :key="index" :class="{'is-visible': visibleIndex === index}">
      <div class="recipe__image">
        <img :src="recipe.imageMedium" :alt="recipe.title" />
      </div>
      <div class="recipe__body">
        <!-- <div class="recipe__rating">{{ recipe.averageRate }}</div> -->
        <h1>{{ recipe.title }}</h1>

        <div class="recipe-summary">
          <div>
            <span>KCAL</span>
            <strong>{{ recipe.kcal }}</strong>
          </div>
          <div>
            <span>TIJD</span>
            <strong>{{ recipe.recipeTime }} min.</strong>
          </div>
          <div>
            <span>PERSONEN</span>
            <strong>{{ recipe.servingsNumber }} {{ recipe.servingType }}</strong>
          </div>
        </div>

        <p v-html="recipe.preparationSummary.join('<br /><br />')"></p>

        <p v-html="recipe.ingredients.join('<br />')"></p>

        <div>
          <button type="button" v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</button>
        </div>

        <a :href="recipe.url">Bekijk op AH.nl</a>
      </div>

      <div class="recipe-footer">
        <button type="button" class="btn btn-primary btn-block" @click.prevent="handlePrevious(index, recipes.length)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button type="button" class="btn btn-primary btn-block">Ingredienten</button>
        <button type="button" class="btn btn-primary btn-block" @click.prevent="handleNext(index, recipes.length)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import Loader from '@/components/Loader'

export default {
  name: 'Recipes',
  components: {
    Loader
  },
  data: () => ({
    recipesUrl: (process.env.NODE_ENV === 'production') ? '/api/recipes' : 'http://localhost:3000/api/recipes',
    showSettings: false,
    recipes: [],
    visibleIndex: 0,
    excludeIngredient: null,
    excludedIngredients: []
  }),
  beforeMount () {
    const cachedExcludedIngredients = window.localStorage.getItem('excludedIngredients')
    console.log(cachedExcludedIngredients)
    if (cachedExcludedIngredients) {
      this.excludeIngredient = cachedExcludedIngredients
      this.excludedIngredients = cachedExcludedIngredients.split(',')
    }

    this.getData()
  },
  methods: {
    handleNext (index, total) {
      // Get every tenth
      if (index % 10 === 0) {
        this.getMoreData()
      }

      if ((index + 1) < total) {
        this.visibleIndex = (index + 1)
      }
    },
    handlePrevious (index, total) {
      const prevIndex = (index === 0) ? index : (index - 1)
      this.visibleIndex = prevIndex
    },
    handleGet () {
      this.getData()
    },
    handleClear () {
      this.excludeIngredient = null
      this.excludedIngredients = []
      window.localStorage.removeItem('excludedIngredients')
      this.recipes = []
    },
    async getData () {
      this.recipes = []
      this.isLoading = true
      const ingredients = (this.excludedIngredients.length) ? this.excludedIngredients.join(',') : null

      try {
        // TODO: send already included recipe Id's, so we won't get them again in the random array
        this.recipes = await fetch(`${this.recipesUrl}?excludedIngredients=${ingredients}&random=true`).then(result => result.json())
        // this.recipes.push(...recipes) // TODO: if we keep using random, there could be double recipes in here
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    async getMoreData () {
      this.isLoading = true
      const ingredients = (this.excludedIngredients.length) ? this.excludedIngredients.join(',') : null
      try {
        // TODO: send already included recipe Id's, so we won't get them again in the random array
        const recipes = await fetch(`${this.recipesUrl}?excludedIngredients=${ingredients}&random=true`).then(result => result.json())
        this.recipes.push(...recipes) // TODO: if we keep using random, there could be double recipes in here
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
$max-width: 500px;

input[type="text"] {
  width: 100%;
  height: 50px;
  font-size: 1.6rem;
  padding: 0 20px;
}

.recipe {
  position: relative;
  display: none;
  padding-bottom: 10rem;

  &.is-visible {
    display: block;
  }

  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
    margin: 0;
  }
}

.recipe__image {
  background-color: #E3E3E3;
  width: 100%;
  padding-top: 73.05%;
  position: relative;

  &:before {
    content: "Loading...";
    font-weight: bold;
    font-size: 1.8rem;
    height: 30px;
    width: 100px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    color: #9B9B9B;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
  }
}

.recipe__rating {
  // position: absolute;
  // bottom: 20px;
  width: 100%;
  color: #161616;
  // z-index: 10;
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.is-hidden {
  display: none;
}

.btn {
  font-size: 1.6rem;
  padding: 5px 10px;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  cursor: pointer;

  &.btn-primary {
    background-color: #0077FF;
    color: #ffffff;
    font-size: 1.6rem;
    height: 50px;
    padding: 0 20px;
    border: 0;
    border-radius: 3px;
  }

  &.btn-block {
    display: block;
    width: 100%;
  }
}

.recipe__body {
  padding: 20px;

  h1 {
    margin: 0;
  }
}
.recipe-summary {
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-top: 1px #D8D8D8 solid;
  border-bottom: 1px #D8D8D8 solid;
  padding-top: 10px;
  padding-bottom: 10px;
  // margin-bottom: 200px;

  span, strong {
    display: block;
  }

  span {
    font-size: 1.4rem;
    color: #9B9B9B
  }

  strong {
    font-size: 1.8rem;
    font-weight: bold;
    color: #4A4A4A;
  }
}

.recipe-footer {
  position: fixed;
  bottom: 0;
  padding: 2rem;
  width: 100%;
  left: 0;
  right: 0;
  max-width: $max-width;
  margin: 0 auto;
  display: flex;
  background-color: $color-white;
  box-shadow: 0 0px 10px rgba(0,0,0, 0.2);
  // flex: 0 auto;

  .btn {
    flex: 0 0 50px;
    height: 50px;
    width: 100%;

    &:nth-child(2) {
      flex: 1;
    }

    &:first-child {
      width: 50px;
      padding: 0;
      margin-right: 10px;
      // text-indent: -13337px;
      border-radius: 100%;
      background: #E3E3E3;
    }
    &:last-child {
      width: 50px;
      padding: 0;
      margin-left: 10px;
      // text-indent: -13337px;
      border-radius: 100%;
      background: white;
      background: #E3E3E3;
    }
  }

}

</style>
