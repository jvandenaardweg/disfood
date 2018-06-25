<template>
  <div class="ingredients-form">
    <form class="form-inline" @submit.prevent="handleSubmit">
      <input type="text" class="form-control" ref="excludeIngredientInput" name="excludeIngredient" v-model="excludeIngredient" placeholder="Bijvoorbeeld: spruiten" required />
      <button class="btn" type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
    </form>
    <div class="ingredient-suggestions">
      <btn className="btn-primary btn-small" v-if="!excludedIngredients.includes(suggestion)" v-for="suggestion in suggestions" :label="suggestion" :key="suggestion" icon="+" @click.native="handleAddIngredient(suggestion)"></btn>
    </div>
    <div class="user-ingredients" v-if="excludedIngredients.length">
      <div class="user-ingredients__body">
        <btn className="btn-secondary btn-small" :label="ingredient" icon="&times;" @click.native="handleRemoveIngredient(ingredient)" v-for="ingredient in excludedIngredients" :key="ingredient"></btn>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from '@/components/Btn'

export default {
  name: 'IngredientsForm',
  components: {
    Btn
  },
  beforeMount () {
    const cachedExcludedIngredients = window.localStorage.getItem('excludedIngredients')
    if (cachedExcludedIngredients) {
      this.excludedIngredients = cachedExcludedIngredients.split(',')
    }
  },
  data: () => ({
    excludeIngredient: null,
    excludedIngredients: [],
    suggestions: ['spruitjes', 'witlof', 'andijvie', 'spinazie']
  }),
  methods: {
    handleAddIngredient (ingredient) {
      this.excludedIngredients.push(ingredient)
    },
    handleRemoveIngredient (ingredient) {
      const index = this.excludedIngredients.indexOf(ingredient)
      this.excludedIngredients.splice(index, 1)
    },
    handleSubmit (event) {
      if (this.excludedIngredients.includes(this.excludeIngredient)) {
        window.alert('Ingredient bestaat al in je lijst.')
        return
      }

      if (this.excludeIngredient === 'vis') {
        window.alert('Wees iets specifieker. Bijvoorbeeld: zalm, tonijn, kabeljouw of haring.')
        return
      } else if (this.excludeIngredient === 'vlees') {
        window.alert('Wees iets specifieker. Bijvoorbeeld: gehakt, kip of hamburger.')
        return
      }

      this.excludedIngredients.push(this.excludeIngredient)
      this.excludeIngredient = null
      this.$refs.excludeIngredientInput.focus()
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
  },
  watch: {
    excludeIngredient (newValue, oldValue) {
      if (newValue) {
        this.excludeIngredient = newValue.toLowerCase()
      }
    },
    excludedIngredients (newValue, oldValue) {
      if (newValue) {
        this.saveInLocalStorage()
      }

      this.$emit('totalIngredients', newValue.length)
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
    display: block;

    svg {
      fill: $color-white;
      position: relative;
      top: 0.2rem;
    }
  }
}

.ingredient-suggestions {
  margin-top: 1rem;
  border-bottom: 1px $gray-90 solid;
  padding-bottom: 1rem;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-right: -2rem;
  margin-left: -2rem;
  padding-left: 2rem;
  -webkit-overflow-scrolling: touch;

  .btn {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

.user-ingredients {
  border-bottom: 1px $gray-90 solid;
  padding-bottom: 2rem;
  // border-top: 1px $gray-90 solid;
  // padding-top: 2rem;
  margin-top: 2rem;

  .user-ingredients__footer {
    .btn {
      margin-top: 2rem;
      display: block;
      width: 100%;
    }
  }
}

.form-control {
  height: 5rem;
  padding: 0 2rem;
  line-height: 5rem;
  color: $color-black;
  background-color: $gray-90;
  border: 0;
  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
}
</style>
