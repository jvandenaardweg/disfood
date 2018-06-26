<template>
  <div class="recipes-carousel">
    <header class="recipes-carousel__header">
      <h2>{{ title }}</h2>
    </header>
    <div class="recipes-carousel__body">
      <div class="recipes-carousel__item" v-for="(recipe, index) in recipes" :key="index">
        <div class="recipes-carousel__item-picture">
          <source-logo name="Albert Heijn"></source-logo>
          <ul>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
              </svg>
              <span>{{ recipe.kcal }} kcal</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M16.24 7.76C15.07 6.59 13.54 6 12 6v6l-4.24 4.24c2.34 2.34 6.14 2.34 8.49 0 2.34-2.34 2.34-6.14-.01-8.48zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
              <span>{{ recipe.recipeTime }} min.</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              <span>{{ recipe.servingsNumber }}</span>
            </li>
          </ul>
          <img :src="recipe.imageMedium" :alt="recipe.title" />
        </div>
        <div class="recipes-carousel__item-title">
          <h2>{{ recipe.title }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SourceLogo from '@/components/SourceLogo'

export default {
  name: 'RecipesCarousel',
  components: {
    SourceLogo
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array
    }
  }
}
</script>

<style lang="scss">
.recipes-carousel {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  .recipes-carousel__header {
    padding: 0 1.5rem;

    h1, h2 {
      margin: 0 0 1.5rem 0;
    }
  }

  .recipes-carousel__body {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }

  .recipes-carousel__item {
    display: inline-block;
    margin-right: 1.5rem;
    width: 260px;
    vertical-align: top;

    &:first-child {
      margin-left: 1.5rem;
    }

    .recipes-carousel__item-picture {
      height: 320px;
      position: relative;

      .source-logo {
        width: 3.5rem;
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
      }

      img {
        object-fit: cover;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
      }

      ul {
        border-radius: 0.5rem;
        list-style: none;
        margin: 0;
        padding: 1.5rem;
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#a6000000',GradientType=0 ); /* IE6-9 */

        li {
          line-height: 1.5;
          vertical-align: middle;
          margin-right: 1rem;
          color: $color-white;
          text-shadow: 1px 1px rgba($color-black, 0.5);

          span {
            display: inline-block;
            margin-left: 2px;
            font-weight: bold;
          }

          svg {
            fill: $color-white;
            width: 18px;
            position: relative;
            top: 6px;
            margin-right: 2px;
          }
        }
      }
    }

    .recipes-carousel__item-title {
      padding-top: 1rem;

      h2 {
        margin: 0;
        white-space: normal;
        font-size: 1.8rem;
        font-weight: normal;
        line-height: 1.4;
      }
    }
  }
}
</style>
