<template>
  <div class="settings">
    <header>
      <h1>Welke ingredienten wil je <span>niet</span> eten?</h1>
      <h2>Hoe meer ingredienten je toevoegt, hoe slimmer de recepten.</h2>
    </header>
    <ingredients-form></ingredients-form>
    <btn label="Annuleren" className="btn-secondary" @click.native="$router.push('/')"></btn>
    <btn label="Opslaan" className="btn-primary" @click.native="$router.push('/')"></btn>
  </div>
</template>

<script>
import Btn from '@/components/Btn'
import IngredientsForm from '@/components/IngredientsForm'

export default {
  name: 'Settings',
  components: {
    Btn,
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
