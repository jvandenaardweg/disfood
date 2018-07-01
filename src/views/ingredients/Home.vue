<template>
  <div>
    <header class="page__header">
      <h1>Ingrediënten</h1>
    </header>

    <section class="section">
      <header class="section__header text-center">
        <h2>Wat wil jij <span>niet</span> eten?</h2>
      </header>
      <ul class="block-list">
        <li v-for="category in ingredientCategories" :key="category.slug">
          <router-link :to="`/ingredients/${category.id}`">
            <span class="badge" :class="{'badge-primary': totalSelectedIngredients(category.id)}">{{ badgeLabel(category.id) }}</span>
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg> -->
            <div class="visual">
              <ingredient-category-icon :category="category.slug"></ingredient-category-icon>
            </div>
            <span>{{ category.name }}</span>
          </router-link>
        </li>
      </ul>
    </section>

    <section class="section">
      <ingredients-form></ingredients-form>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import IngredientCategoryIcon from '@/components/IngredientCategoryIcon'
import IngredientsForm from '@/components/IngredientsForm'

export default {
  name: 'PageIngredientsHome',
  components: {
    IngredientCategoryIcon,
    IngredientsForm
  },
  computed: {
    ...mapGetters({
      excludedIngredients: 'filters/excludedIngredients',
      ingredients: 'filters/ingredients'
    }),
    ingredientCategories () {
      return [
        {
          id: 1,
          name: 'Groenten',
          slug: 'vegetables'
        },
        {
          id: 2,
          name: 'Vlees',
          slug: 'meat'
        },
        {
          id: 3,
          name: 'Vis',
          slug: 'fish'
        },
        {
          id: 4,
          name: 'Fruit',
          slug: 'fruit'
        },
        {
          id: 5,
          name: 'Kruiden',
          slug: 'herbs'
        },
        {
          id: 6,
          name: 'Zuivel',
          slug: 'dairy'
        },
        {
          id: 7,
          name: 'Pasta',
          slug: 'pasta'
        },
        {
          id: 8,
          name: 'Noten',
          slug: 'nuts'
        },
        {
          id: 9,
          name: 'Zaden & pitten',
          slug: 'seeds-pits'
        },
        {
          id: 10,
          name: 'Rijst',
          slug: 'rice'
        },
        {
          id: 11,
          name: 'Sauzen',
          slug: 'sauces'
        }
      ]
    }
  },
  methods: {
    totalIngredients (categoryId) {
      const category = this.ingredients[categoryId]
      if (category) {
        return this.ingredients[categoryId].length
      } else {
        return 0
      }
    },
    badgeLabel (categoryId) {
      return `${this.totalSelectedIngredients(categoryId)}/${this.totalIngredients(categoryId)}`
    },
    totalSelectedIngredients (categoryId) {
      if (this.ingredients[categoryId]) {
        return this.ingredients[categoryId].reduce((prev, next) => {
          if (this.excludedIngredients.includes(next)) {
            prev = prev + 1
          }
          return prev
        }, 0)
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="scss">
.page-ingredients {

}

.block-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0 0;

  li {
    width: 33.333%;
    height: 120px;
    border: 1px $gray-90 solid;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin-right: -1px;
    margin-bottom: -1px;
    position: relative;

    &.is-active {
      border-color: $color-primary;

      a {
        > svg {
          display: inline-block;
          fill: $color-primary;
        }
      }

      span {
        color: $color-primary;
      }
    }

    span {
      display: block;
      font-size: 1.4rem;
    }

    a {
      display: block;
      text-decoration: none;
      color: $color-black;

      > svg {
        width: 2rem;
        position: absolute;
        top: 5px;
        right: 5px;
        display: none;
      }
    }

    .badge {
      position: absolute;
      right: 0.75rem;
      top: 0.75rem;

      border-radius: 5px;
      background-color: $gray-90;
      color: $color-black;
      font-size: 1.2rem;
      padding: 0.1rem 0.5rem;

      &.badge-primary {
        background-color: $color-primary;
        color: $color-white;
      }
    }

    .visual {
      margin-top: 3rem;
      height: 5rem;
      width: 5rem;
      display: inline-block;

      svg {
        width: 100%;
      }
    }
  }
}
</style>
