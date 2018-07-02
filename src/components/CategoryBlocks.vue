<template>
  <ul class="category-blocks">
    <li class="category-blocks__item" v-for="category in categories" :key="category.slug">
      <router-link :to="`/${baseUrl}/${category.id}`">
        <badge :variant="badgeVariant(category.id)" :label="badgeLabel(category.id)"></badge>
        <div class="category-blocks__visual">
          <ingredient-category-icon :category="category.slug"></ingredient-category-icon>
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
    categoryItems: {
      type: Object
    },
    selectedCategoryItems: {
      type: Array
    },
    baseUrl: {
      type: String
    }
  },
  methods: {
    totalCategoryItems (categoryId) {
      const category = this.categoryItems[categoryId]
      if (category) {
        return this.categoryItems[categoryId].length
      } else {
        return 0
      }
    },
    badgeLabel (categoryId) {
      return `${this.totalSelectedCategoryItems(categoryId)}/${this.totalCategoryItems(categoryId)}`
    },
    badgeVariant (categoryId) {
      if (this.totalSelectedCategoryItems(categoryId)) {
        return 'primary'
      }
    },
    totalSelectedCategoryItems (categoryId) {
      if (this.categoryItems[categoryId]) {
        return this.categoryItems[categoryId].reduce((prev, next) => {
          if (this.selectedCategoryItems.includes(next)) {
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
