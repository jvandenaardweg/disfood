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
</style>
