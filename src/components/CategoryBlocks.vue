<template>
  <ul class="category-blocks">
    <li class="category-blocks__item" v-for="category in categories" :key="category.slug">
      <router-link :to="`/${baseUrl}/${category.id}`">
        <badge :variant="badgeVariant(category.id)" :label="badgeLabel(category.id)"></badge>
        <div class="category-blocks__visual">
          <ingredient-category-icon :category="category.singular"></ingredient-category-icon>
        </div>
        <h3>{{ category.name }}</h3>
      </router-link>
    </li>
  </ul>
</template>

<script>
import IngredientCategoryIcon from '@/components/IngredientCategoryIcon'
import Badge from '@/components/Badge'

export default {
  name: 'CategoryBlocks',
  components: {
    IngredientCategoryIcon,
    Badge
  },
  props: {
    categories: {
      type: Array
    },
    ingredients: {
      type: Array
    },
    selectedCategoryItems: {
      type: Array
    },
    baseUrl: {
      type: String
    }
  },
  methods: {
    totalCategoryIngredients (categoryId) {
      const ingredients = this.ingredients.filter(ingredient => ingredient.ingredientsCategoryId === categoryId)
      if (ingredients) {
        return ingredients.length
      } else {
        return 0
      }
    },
    badgeLabel (categoryId) {
      return `${this.totalSelectedIngredients(categoryId)}/${this.totalCategoryIngredients(categoryId)}`
    },
    badgeVariant (categoryId) {
      if (this.totalSelectedIngredients(categoryId)) {
        return 'primary'
      }
    },
    totalSelectedIngredients (categoryId) {
      const items = this.ingredients.filter(ingredient => ingredient.ingredientsCategoryId === categoryId)
      if (items) {
        return items.reduce((prev, ingredient) => {
          if (this.selectedCategoryItems.includes(ingredient.name)) {
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
.category-blocks {
  list-style: none;
  padding: 0;
  margin: 2rem 0 0 0;

  .category-blocks__item {
    width: 33.333%;
    height: 120px;
    border: 1px $gray-90 solid;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    margin-right: -1px;
    margin-bottom: -1px;
    position: relative;

    h3 {
      display: block;
      font-size: 1.4rem;
      margin: 0;
      font-weight: normal;
    }

    a {
      display: block;
      text-decoration: none;
      color: $color-black;
      height: 100%;
    }

    .badge {
      position: absolute;
      right: 0.75rem;
      top: 0.75rem;
    }

    .category-blocks__visual {
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
