<template>
  <div class="settings">
    <header>
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

    <!-- <header>
      <h1>Welke ingredienten wil je <span>niet</span> eten?</h1>
      <h2>Hoe meer ingredienten je toevoegt, hoe slimmer de recepten.</h2>
    </header> -->

    <section class="section">
      <h2>Welke ingredienten wil je <span>niet</span> eten?</h2>
      <ingredients-form></ingredients-form>
    </section>

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

.section {
  text-align: left;
  border-bottom: 1px $gray-90 solid;
  padding-bottom: 2rem;
}

.settings {
  padding: 1.5rem;

  header {
    text-align: center;

    h2 {
      color: $gray-70;
    }
  }

  h1 {
    span {
      color: $color-red;
    }
  }

  h2 {
    font-size: 1.6rem;
    // font-weight: 600;

    span {
      color: $color-red;
    }
  }

}

.settings__footer {
  // margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  // position: fixed;
  // bottom: 0;
  // left: 0;
  width: 100%;
  padding: 1.5rem;
  z-index: 10;
  background-color: $color-white;

  .btn {
    width: 100%;
  }

}
</style>
