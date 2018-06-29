<template>
  <div>
    <header class="page__header">
      <btn-back :link="backLink"></btn-back>
      <h1>Fruit</h1>
    </header>
    <!-- <p>list of ingredients for this category</p> -->
    <button type="button">Selecteer alles</button>
    <ul class="list-group">
      <li v-for="fruit in fruits" :key="fruit">
        <label class="checkbox-inline">{{ fruit }}
          <input type="checkbox" name="fruit" :value="fruit" />
          <span class="checkbox-custom"></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import BtnBack from '@/components/BtnBack'

export default {
  name: 'PageIngredientsCategoryId',
  components: {
    BtnBack
  },
  computed: {
    fruits () {
      return ['aardbei', 'banaan', 'appel', 'sinaasappel']
    },
    backLink () {
      return '/ingredients'
    }
  }
}
</script>

<style lang="scss">
.list-group {
  list-style: none;
  padding: 0;
  margin: 0 -1.5rem 0 -1.5rem;

  li {
    padding: 1.5rem;
    border-bottom: 1px $gray-90 solid;

    &:first-child {
      border-top: 1px $gray-90 solid;
    }
  }
}

.checkbox-inline {
  display: flex;
  margin-top: -1.5rem;
  margin-bottom: -1.5rem;
  padding: 1.5rem 0;

  input {
    display: none;
  }

  input:checked + .checkbox-custom {
    background: green;
  }

  .checkbox-custom {
    margin-left: auto;
    width: 20px;
    height: 20px;
    border: 1px $gray-90 solid;
    background-color: $gray-90;
  }
}
</style>
