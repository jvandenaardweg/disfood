<template>
  <div>

    <loader v-if="isLoading && !recipes.length"></loader>

    <div class="recipe" v-for="(recipe, index) in recipes" :key="index" :class="{'is-visible': visibleIndex === index}">
      <div class="recipe__image">
        <img :src="recipe.imageMedium" :alt="recipe.title" />
      </div>
      <div class="recipe__body">
        <!-- <div class="recipe__rating">{{ recipe.averageRate }}</div> -->
        <h1>{{ recipe.title }}
          <button type="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
        </h1>

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

        <section class="section ingredients" :class="{'is-fixed': showIngredients === recipe.id }">
          <h2>Ingredienten</h2>
          <h3>Met deze lijst kan je boodschappen doen bij jouw lokale Albert Heijn.</h3>
          <table class="table">
            <tr v-for="(ingredient, index) in recipe.ingredientsText" :key="index">
              <!-- <td><button type="button">{{ ingredient }}</button></td> -->
              <td>{{ ingredient }}</td>
            </tr>
          </table>

          <btn v-if="showIngredients === recipe.id" className="btn-primary btn-block" @click.native="handleHideIngredients(recipe.id)" label="Terug naar recept"></btn>
        </section>

        <h2>Voeg toe aan niet eten lijst</h2>
        <div class="recipe-ingredients-filters">
          <btn
            className="btn-small"
            :class="{'btn-primary': !excludedIngredients.includes(ingredient), 'btn-secondary': excludedIngredients.includes(ingredient) }"
            :label="ingredient"
            :icon="icon(ingredient)"
            @click.native="handleAddFilterIngredient(ingredient)"
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index">
          </btn>
        </div>

        <br/><br/><br/>

        <a :href="recipe.url" class="btn btn-primary btn-block">Bekijk op AH.nl</a>
      </div>

      <div class="recipe-footer">
        <button type="button" class="btn btn-primary btn-block" @click.prevent="handlePrevious(index, recipes.length)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button type="button" class="btn btn-primary btn-block" @click.prevent="handleShowIngredients(recipe.id)">Ingredienten</button>
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
import { mapGetters } from 'vuex'
import Loader from '@/components/Loader'
import Btn from '@/components/Btn'

export default {
  name: 'Recipes',
  components: {
    Loader,
    Btn
  },
  data: () => ({
    isLoading: null,
    recipesUrl: (process.env.NODE_ENV === 'production') ? '/api/recipes' : 'http://localhost:3000/api/recipes',
    showSettings: false,
    visibleIndex: 0,
    excludeIngredient: null,
    showIngredients: null
  }),
  mounted () {
    this.getData()
  },
  computed: {
    ...mapGetters({
      recipes: 'recipes/allRecipes',
      excludedIngredients: 'filters/excludedIngredients',
      recipeTime: 'filters/recipeTime'
    }),
    ingredientsList () {
      return (this.excludedIngredients.length) ? this.excludedIngredients.join(',') : null
    }
  },
  methods: {
    handleHideIngredients (recipeId) {
      this.showIngredients = null
    },
    handleShowIngredients (recipeId) {
      this.showIngredients = recipeId
    },
    icon (ingredient) {
      if (!this.excludedIngredients.includes(ingredient)) {
        return '+'
      } else {
        return '&times;'
      }
    },
    handleAddFilterIngredient (ingredient) {
      if (this.excludedIngredients.includes(ingredient)) {
        this.$store.commit('filters/removeExcludedIngredient', ingredient)
      } else {
        this.$store.commit('filters/setExcludedIngredient', ingredient)
      }
    },
    handleNext (index, total) {
      // Get every tenth
      if (index % 10 === 0) {
        this.getData()
      }

      if ((index + 1) < total) {
        this.visibleIndex = (index + 1)
      }
    },
    handlePrevious (index, total) {
      const prevIndex = (index === 0) ? index : (index - 1)
      this.visibleIndex = prevIndex
    },
    async getData () {
      this.isLoading = true

      try {
        await this.$store.dispatch('recipes/getAll', {
          ingredients: this.ingredientsList,
          recipeTime: this.recipeTime
        })
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

.table {
  width: 100%;

  tr {
    &:last-child {
      td {
        border-bottom: 1px $gray-90 solid;
      }
    }
    td {
      border-top: 1px $gray-90 solid;
      padding: 0.5rem 0;
    }
  }
}

.recipe-ingredients-filters {
  .btn {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
  }
}

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
  padding: 0.5rem 1rem;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  text-decoration: none;

  &.btn-primary {
    background-color: #0077FF;
    color: #ffffff;
    font-size: 1.6rem;
    height: 5rem;
    line-height: 5rem;
    padding: 0 2rem;
    border: 0;
    border-radius: 0.3rem;
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
    display: flex;
    position: relative;
    padding-right: 2.6rem;
    line-height: 1.4;

    button {
      margin-left: auto;
      background: none;
      border: 0;
      padding-right: 0;
      top: 0.75rem;
      position: absolute;
      right: 0;

      &.is-favorite {
        svg {
          fill: $color-red;
        }
      }

      svg {
        fill: $gray-80;
      }
    }
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

.ingredients {
  display: none;

  &.is-fixed {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $color-white;
    z-index: 20;
    width: 100%;
    padding: 2rem;
    display: block;
  }

  h2 {
    margin-bottom: 0;
    font-family: 'Merriweather', Palatino, Georgia, serif;
    font-size: 2.4rem;
    text-align: center;
  }

  h3 {
    color: $gray-50;
    font-size: 1.6rem;
    font-weight: normal;
    margin-top: 0;
    text-align: center;
  }
}

</style>
