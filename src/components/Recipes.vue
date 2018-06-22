<template>
  <div>
    <input type="text" name="excludeIngredient" v-model="excludeIngredient" placeholder="Exclude ingredient" />
    <button type="button" @click.prevent="handleClear" class="btn">Clear</button>
    <button type="button" @click.prevent="handleGet" class="btn">Get</button>

    <hr />
    <button type="button" @click.prevent="handleRemoveIngredient(ingredient)" v-for="ingredient in excludedIngredients" :key="ingredient" class="btn">{{ ingredient }}</button>
    <hr />
    <!-- <p v-if="isLoading">Loading...</p> -->

    <div class="recipe" v-for="(recipe, index) in recipes" :key="recipe.id" :class="{'is-hidden': index > 0}">
      <div class="recipe__image">
        <img :src="recipe.imageLarge" :alt="recipe.title" />
      </div>
      <div class="recipe__body">
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
      </div>

      <div class="recipe-footer">
        <button type="button" class="btn btn-primary btn-block">Bekijk recept</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Recipes',
  data: () => ({
    recipes: [],
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
      this.isLoading = true
      try {
        this.recipes = await fetch(`http://localhost:3000/api/recipes?excludedIngredients=${this.excludedIngredients.join(',')}&random=true`).then(result => result.json())
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
input[type="text"] {
  width: 100%;
  height: 50px;
  font-size: 16px;
  padding: 0 20px;
}

.recipe {
  position: relative;


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
  margin-bottom: 200px;

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
}
</style>
