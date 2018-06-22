<template>
  <div>
    <button type="button" class="btn btn-settings" @click.prevent="showSettings = !showSettings">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
        <path fill="#FFF" fill-rule="evenodd" d="M18.9 12a8.6 8.6 0 0 0 0-2l2.3-2c.2-.2.3-.5.1-.7l-2.2-3.8c-.1-.2-.4-.3-.6-.2l-2.8 1a8 8 0 0 0-1.8-1l-.5-3c0-.2-.2-.4-.5-.4H8.5c-.3 0-.5.2-.5.5l-.5 2.9-1.8 1-2.8-1a.5.5 0 0 0-.6.2L0 7.4c-.2.2-.1.5.1.7L2.5 10a8.7 8.7 0 0 0 0 2.2L.2 13.9c-.2.2-.3.5-.1.7l2.2 3.8c.1.2.4.3.6.2l2.8-1a8 8 0 0 0 1.8 1l.5 3c0 .2.2.4.5.4h4.4c.3 0 .5-.2.5-.5l.5-2.9 1.8-1 2.8 1c.2.1.5 0 .6-.2l2.2-3.8c.2-.2.1-.5-.1-.7L18.9 12zm-8.2 3a3.9 3.9 0 1 1 0-7.8 3.9 3.9 0 0 1 0 7.8z"/>
      </svg>
    </button>

    <div v-if="showSettings">
      <input type="text" name="excludeIngredient" v-model="excludeIngredient" placeholder="Exclude ingredient" />
      <button type="button" @click.prevent="handleClear" class="btn btn-primary">Clear</button>
      <button type="button" @click.prevent="handleGet" class="btn btn-primary">Save</button>

      <hr />
      <button type="button" @click.prevent="handleRemoveIngredient(ingredient)" v-for="ingredient in excludedIngredients" :key="ingredient" class="btn">{{ ingredient }}</button>
      <hr />
    </div>

    <!-- <p v-if="isLoading">Loading...</p> -->

    <div class="recipe" v-for="(recipe, index) in recipes" :key="index" :class="{'is-visible': visibleIndex === index}">
      <div class="recipe__image">

        <img :src="recipe.imageLarge" :alt="recipe.title" />
      </div>
      <div class="recipe__body">
        <div class="recipe__rating">{{ recipe.averageRate }}</div>
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

        <a :href="recipe.url">Bekijk op AH.nl</a>
      </div>

      <div class="recipe-footer">
        <button type="button" class="btn btn-primary btn-block" @click.prevent="handlePrevious(index, recipes.length)">Vorige</button>
        <button type="button" class="btn btn-primary btn-block">Bekijk recept</button>
        <button type="button" class="btn btn-primary btn-block" @click.prevent="handleNext(index, recipes.length)">Volgende</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Recipes',
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
    handleRemoveIngredient (ingredient) {
      if (this.excludedIngredients.length < 2) {
        window.alert('Cannot remove')
        return
      }
      const index = this.excludedIngredients.indexOf(ingredient)
      this.excludedIngredients.splice(index, 1)
      this.excludeIngredient.replace(/`${ingredient}`/i, '')
      this.saveInLocalStorage()
      this.getData()
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
      const ingredients = (this.excludedIngredients) ? this.excludedIngredients.join(',') : null

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
      const ingredients = (this.excludedIngredients) ? this.excludedIngredients.join(',') : null
      try {
        // TODO: send already included recipe Id's, so we won't get them again in the random array
        const recipes = await fetch(`${this.recipesUrl}?excludedIngredients=${ingredients}&random=true`).then(result => result.json())
        this.recipes.push(...recipes) // TODO: if we keep using random, there could be double recipes in here
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    saveInLocalStorage () {
      window.localStorage.setItem('excludedIngredients', this.excludedIngredients)
    }
  },
  watch: {
    excludeIngredient (newValue, oldValue) {
      this.excludedIngredients = newValue.split(',')
      this.saveInLocalStorage()
    }
  }
}
</script>

<style lang="scss">
$max-width: 500px;

input[type="text"] {
  width: 100%;
  height: 50px;
  font-size: 16px;
  padding: 0 20px;
}

.recipe {
  position: relative;
  display: none;

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
    font-size: 18px;
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
  font-size: 16px;
  padding: 5px 10px;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  cursor: pointer;

  &.btn-primary {
    background-color: #0077FF;
    color: #ffffff;
    font-size: 16px;
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
    font-size: 14px;
    color: #9B9B9B
  }

  strong {
    font-size: 18px;
    font-weight: bold;
    color: #4A4A4A;
  }
}

.recipe-footer {
  margin-top: 20px;
  position: fixed;
  bottom: 20px;
  padding: 0 20px;
  width: 100%;
  left: 0;
  right: 0;
  max-width: $max-width;
  margin: 0 auto;
  display: flex;
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
      text-indent: -13337px;
      border-radius: 100%;
      background: #E3E3E3;
    }
    &:last-child {
      width: 50px;
      padding: 0;
      margin-left: 10px;
      text-indent: -13337px;
      border-radius: 100%;
      background: white;
      background: #E3E3E3;
    }
  }

}

.btn-settings {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  background: rgba(#4A4A4A, 0.8);
  color: #fff;
  border: 0;
  vertical-align: middle;
  line-height: 50px;
  z-index: 10;

  svg {
    height: 22px;
  }

}
</style>
