<template>
  <div class="settings">
    <header>
      <router-link to="/" class="btn-back">
        &times;
      </router-link>
      <h1>Welke ingredienten wil je <span>niet</span> eten?</h1>
      <h2>Hoe meer ingredienten je toevoegt, hoe slimmer de recepten.</h2>
    </header>

    <ingredients-form></ingredients-form>

  </div>
</template>

<script>
import IngredientsForm from '@/components/IngredientsForm'

export default {
  name: 'Settings',
  components: {
    IngredientsForm
  }
}
</script>

<style lang="scss">

.settings {
  padding: 5rem 2rem;

  h1 {
    text-align: center;

    span {
      color: $color-red;
    }
  }

  h2 {
    font-size: 1.8rem;
    color: $gray-70;
    text-align: center;
    font-weight: normal;
  }
}
</style>
