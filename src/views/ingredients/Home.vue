<template>
  <div>
    <header class="page__header">
      <h1>Ingrediënten</h1>
    </header>
    <section class="section">
      <header class="section__header">
        <h2>Welke ingrediënten wil je <span>niet</span> eten?</h2>
      </header>
      <ingredients-form></ingredients-form>
    </section>

    <section class="section">
      <header class="section__header">
        <h2>Welke ingrediënten wil je <span>niet</span> eten?</h2>
      </header>
      <ul class="block-list">
        <li v-for="category in ingredientCategories" :key="category.slug">
          <router-link :to="`/ingredients/${category.id}`">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div class="visual">
              <ingredient-category-icon :category="category.slug"></ingredient-category-icon>
            </div>
            <span>{{ category.name }}</span>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import IngredientCategoryIcon from '@/components/IngredientCategoryIcon'
import IngredientsForm from '@/components/IngredientsForm'

export default {
  name: 'PageIngredientsHome',
  components: {
    IngredientCategoryIcon,
    IngredientsForm
  },
  computed: {
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
  }
}
</script>

<style lang="scss">
.page-ingredients {

}

.block-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    width: 33.333%;
    height: 100px;
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

    .visual {
      margin-top: 1.5rem;
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
