<template>
  <div class="page page-settings">
    <header class="page__header">
      <h1>Instellingen</h1>
    </header>

    <!-- <section class="section">
      <h2>Hoeveel tijd heb jij vandaag?</h2>
      <input-recipe-time></input-recipe-time>
    </section> -->

    <section class="section">
      <h2>Waar doe jij je boodschappen?</h2>
      <input-recipe-time></input-recipe-time>
    </section>

    <footer class="page__footer">
      <btn label="Annuleren" className="btn-secondary" @click.native="$router.push('/')"></btn>
      <btn label="Opslaan" className="btn-primary" @click.native="$router.push('/')"></btn>
    </footer>
  </div>
</template>

<script>
import Btn from '@/components/Btn'
import IngredientsForm from '@/components/IngredientsForm'
import InputRecipeTime from '@/components/InputRecipeTime'

// TODO: when something is changed in the settings, we need to reset the recipes and get a new list

export default {
  name: 'Settings',
  components: {
    Btn,
    IngredientsForm,
    InputRecipeTime
  }
}
</script>

<style lang="scss">
.page-settings {
  //
}
</style>
