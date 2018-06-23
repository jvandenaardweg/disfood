<template>
  <div>
    <form class="form-inline" @submit.prevent="handleSubmit">
      <input type="text" class="form-control" name="excludeIngredient" v-model="excludeIngredient" placeholder="Bijvoorbeeld: spruiten" />
      <button type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </form>
    <div class="user-ingredients">
      <div class="user-ingredients__body">
        <button type="button" class="badge" @click.prevent="handleRemoveIngredient(ingredient)" v-for="ingredient in excludedIngredients" :key="ingredient">{{ ingredient }} <span>&times;</span></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IngredientsForm',
  beforeMount () {
    const cachedExcludedIngredients = window.localStorage.getItem('excludedIngredients')
    if (cachedExcludedIngredients) {
      this.excludedIngredients = cachedExcludedIngredients.split(',')
    }
    this.$emit('totalIngredients', this.excludedIngredients.length)
  },
  data: () => ({
    excludeIngredient: null,
    excludedIngredients: []
  }),
  methods: {
    handleRemoveIngredient (ingredient) {
      const index = this.excludedIngredients.indexOf(ingredient)
      this.excludedIngredients.splice(index, 1)
      this.saveInLocalStorage()
    },
    handleSubmit (event) {
      if (this.excludedIngredients.includes(this.excludeIngredient)) {
        window.alert('Ingredient bestaat al in je lijst.')
        return
      }

      this.excludedIngredients.push(this.excludeIngredient)
      this.saveInLocalStorage()
      this.excludeIngredient = null
      this.$emit('totalIngredients', this.excludedIngredients.length)
    },
    handleClear () {
      this.excludeIngredient = null
      this.excludedIngredients = []
      window.localStorage.removeItem('excludedIngredients')
      this.recipes = []
    },
    saveInLocalStorage () {
      window.localStorage.setItem('excludedIngredients', this.excludedIngredients)
    }
  }
}
</script>

<style lang="scss">
.form-inline {
  display: flex;

  button {
    float: right;
    background: $color-primary;
    width: 6rem;
    border: 0;
    color: $color-white;
    font-size: 1.6rem;
    font-weight: bold;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;

    svg {
      fill: $color-white;
      position: relative;
      top: 0.2rem;
    }
  }
}
.user-ingredients {
  border-bottom: 1px $gray-90 solid;
  padding-bottom: 2rem;
  border-top: 1px $gray-90 solid;
  padding-top: 2rem;
  margin-top: 2rem;

  .user-ingredients__footer {
    .btn {
      margin-top: 2rem;
      display: block;
      width: 100%;
    }
  }
}

.btn-back {
  border-radius: 0.3rem;
  height: 4.5rem;
  width: 4.5rem;
  line-height: 4.6rem;
  background: $gray-20;
  display: inline-block;
  text-align: center;
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: $color-white;
  font-weight: bold;
  font-size: 4rem;
  text-decoration: none;

  svg {
    fill: $color-white;
    transform: rotate(-180deg);
    height: 1.5rem;
    position: relative;
    top: 0.3rem;
  }
}

.badge {
  background-color: $color-secondary;
  color: $color-black;
  display: inline-block;
  padding: 0.85rem 1.5rem;
  // height: 2rem;
  border: 0;
  border-radius: 0.3rem;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  // margin-bottom: 0.5rem;
  vertical-align: middle;
  line-height: 1.4rem;

  span {
    color: $color-black;
    font-weight: bold;
    font-size: 2rem;
    display: inline-block;
    position: relative;
    top: 0.1rem;
    margin-left: 0.5rem;
    // height: 1.5rem;

  }

}



  .form-control {
    height: 5rem;
    padding: 0 2rem;
    line-height: 5rem;
    border-radius: 0.3rem;
    color: $color-black;
    background-color: $gray-90;
    border: 0;
  }
</style>
