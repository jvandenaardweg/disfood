<template>
  <div>
    <input type="text" name="excludeIngredient" v-model="excludeIngredient" placeholder="Exclude ingredient" />
    <button type="button" @click.prevent="handleClear" class="btn">Clear</button>
    <button type="button" @click.prevent="handleGet" class="btn">Get</button>

    <hr />
    <button type="button" @click.prevent="handleRemoveIngredient(ingredient)" v-for="ingredient in excludedIngredients" :key="ingredient" class="btn">{{ ingredient }}</button>
    <hr />
    <p v-if="isLoading">Loading...</p>
    <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
      <img :src="recipe.imageLarge" />
      <h1>{{ recipe.title }}</h1>
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

.btn {
  font-size: 16px;
  padding: 5px 10px;
  font-weight: bold;
  display: inline-block;
}
</style>
