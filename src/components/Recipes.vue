<template>
  <div class="recipes">
    <header>
      <h1>Hoeveel tijd heb jij vandaag?</h1>
      <input-recipe-time @recipeTime="handleRecipeTimeChange"></input-recipe-time>
      <!-- <button type="button" class="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
</svg>
</button> -->
      <!-- <small>Exclusief deze ingredienten:</small>
      <div class="recipes-filter__ingredients">
        <btn className="btn-secondary btn-small" :label="ingredient" v-for="(ingredient, index) in excludedIngredients" :key="index" icon="&times;"></btn>
      </div> -->
      <!-- <loader v-if="isLoading && !recipes.length"></loader> -->
      <!-- <btn className="btn-primary btn-block" label="Verras mij met suggesties" @click.native="handleRecipeTimeChange"></btn> -->
    </header>

    <recipes-carousel :title="order" :recipes="recipes" v-for="(order, index) in recipesOrder" :key="index"></recipes-carousel>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
// import Loader from '@/components/Loader'
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
    isLoading: null,
    recipesUrl: (process.env.NODE_ENV === 'production') ? '/api/recipes' : 'http://localhost:3000/api/recipes',
    showSettings: false,
    visibleIndex: 0,
    excludeIngredient: null,
    showIngredients: null
  }),
  mounted () {
    console.log('mmm')
    this.getNewData()
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
          ingredients: this.ingredientsList,
          recipeTime: this.recipeTime
        })
      } catch (err) {
        console.log(err)
      } finally {
        this.isLoading = false
      }
    },
    async getNewData () {
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

.recipes {
  // padding: 2rem;

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
        // border-left-color: $color-white;
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
// $max-width: 500px;

// .table {
//   width: 100%;

//   tr {
//     &:last-child {
//       td {
//         border-bottom: 1px $gray-90 solid;
//       }
//     }
//     td {
//       border-top: 1px $gray-90 solid;
//       padding: 0.5rem 0;
//     }
//   }
// }

// .recipe-ingredients-filters {
//   .btn {
//     margin-bottom: 0.5rem;
//     margin-right: 0.5rem;
//   }
// }

// input[type="text"] {
//   width: 100%;
//   height: 50px;
//   font-size: 1.6rem;
//   padding: 0 20px;
// }

// .recipe {
//   position: relative;
//   display: none;
//   padding-bottom: 10rem;

//   &.is-visible {
//     display: block;
//   }

//   img {
//     width: 100%;
//     object-fit: cover;
//     height: 100%;
//     margin: 0;
//   }
// }

// .recipe__image {
//   background-color: #E3E3E3;
//   width: 100%;
//   padding-top: 73.05%;
//   position: relative;

//   &:before {
//     content: "Loading...";
//     font-weight: bold;
//     font-size: 1.8rem;
//     height: 30px;
//     width: 100px;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     margin: auto;
//     color: #9B9B9B;
//   }

//   a {
//     position: absolute;
//     bottom: 1.5rem;
//     right: 1.5rem;
//     width: 3.5rem;
//     display: block;
//     z-index: 2;
//     background: none;
//   }

//   .source-logo {
//     width: 3.5rem;
//   }

//   img {
//     position: absolute;
//     top: 0;
//     left: 0;
//     z-index: 1;
//   }
// }

// .recipe__rating {
//   // position: absolute;
//   // bottom: 20px;
//   width: 100%;
//   color: #161616;
//   // z-index: 10;
//   text-align: center;
//   font-weight: bold;
//   margin-bottom: 10px;
// }

// .is-hidden {
//   display: none;
// }

// .btn {
//   font-size: 1.6rem;
//   padding: 0.5rem 1rem;
//   font-weight: bold;
//   display: inline-block;
//   text-align: center;
//   cursor: pointer;
//   text-decoration: none;

//   &.btn-primary {
//     background-color: #0077FF;
//     color: #ffffff;
//     font-size: 1.6rem;
//     height: 5rem;
//     line-height: 5rem;
//     padding: 0 2rem;
//     border: 0;
//     border-radius: 0.3rem;
//   }

//   &.btn-block {
//     display: block;
//     width: 100%;
//   }
// }

// .recipe__body {
//   padding: 1.5rem;

//   h1 {
//     margin: 0;
//     display: flex;
//     position: relative;
//     padding-right: 2.6rem;
//     line-height: 1.4;

//     button {
//       margin-left: auto;
//       background: none;
//       border: 0;
//       padding-right: 0;
//       top: 0.75rem;
//       position: absolute;
//       right: 0;

//       &.is-favorite {
//         svg {
//           fill: $color-red;
//         }
//       }

//       svg {
//         fill: $gray-80;
//       }
//     }
//   }
// }
// .recipe-summary {
//   margin-top: 20px;
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
//   border-top: 1px #D8D8D8 solid;
//   border-bottom: 1px #D8D8D8 solid;
//   padding-top: 10px;
//   padding-bottom: 10px;
//   // margin-bottom: 200px;

//   span, strong {
//     display: block;
//   }

//   span {
//     font-size: 1.4rem;
//     color: #9B9B9B
//   }

//   strong {
//     font-size: 1.8rem;
//     font-weight: bold;
//     color: #4A4A4A;
//   }
// }

// .recipe-footer {
//   position: fixed;
//   bottom: 0;
//   padding: 1.5rem;
//   width: 100%;
//   left: 0;
//   right: 0;
//   max-width: $max-width;
//   margin: 0 auto;
//   display: flex;
//   background-color: $color-white;
//   box-shadow: 0 0px 10px rgba(0,0,0, 0.2);
//   // flex: 0 auto;

//   .btn {
//     flex: 0 0 50px;
//     height: 50px;
//     width: 100%;

//     &:nth-child(2) {
//       flex: 1;
//     }

//     &:first-child {
//       width: 50px;
//       padding: 0;
//       margin-right: 10px;
//       // text-indent: -13337px;
//       border-radius: 100%;
//       background: #E3E3E3;
//     }
//     &:last-child {
//       width: 50px;
//       padding: 0;
//       margin-left: 10px;
//       // text-indent: -13337px;
//       border-radius: 100%;
//       background: white;
//       background: #E3E3E3;
//     }
//   }

// }

// .ingredients {
//   display: none;

//   &.is-fixed {
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     background-color: $color-white;
//     z-index: 20;
//     width: 100%;
//     padding: 1.5rem;
//     display: block;
//   }

//   h2 {
//     margin-bottom: 0;
//     font-family: 'Merriweather', Palatino, Georgia, serif;
//     font-size: 2.4rem;
//     text-align: center;
//   }

//   h3 {
//     color: $gray-50;
//     font-size: 1.6rem;
//     font-weight: normal;
//     margin-top: 0;
//     text-align: center;
//   }
// }

</style>
