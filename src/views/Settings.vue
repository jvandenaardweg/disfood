<template>
  <div class="settings">
    <input-recipe-time></input-recipe-time>
    <header>
      <h1>Welke ingredienten wil je <span>niet</span> eten?</h1>
      <h2>Hoe meer ingredienten je toevoegt, hoe slimmer de recepten.</h2>
    </header>

    <ingredients-form></ingredients-form>
    <div class="settings__footer">
      <btn label="Annuleren" className="btn-secondary" @click.native="$router.push('/')"></btn>
      <btn label="Opslaan" className="btn-primary" @click.native="$router.push('/')"></btn>
    </div>
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

.settings__footer {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;

  .btn {
    width: 100%;
  }

}
</style>
