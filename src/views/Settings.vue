<template>
  <div class="page page-settings">
    <header class="page__header">
      <h1>Instellingen</h1>
    </header>

    <section class="section">
      <h2>Waar doe jij je boodschappen?</h2>
      <custom-select name="store" :selected="storeOptions.selected" :options="storeOptions.options" @input="handleStoreChange"></custom-select>
    </section>

    <!-- <footer class="page__footer">
      <btn label="Annuleren" className="btn-secondary" @click.native="$router.push('/')"></btn>
      <btn label="Opslaan" className="btn-primary" @click.native="$router.push('/')"></btn>
    </footer> -->
  </div>
</template>

<script>
import Btn from '@/components/Btn'
import CustomSelect from '@/components/CustomSelect'

// TODO: when something is changed in the settings, we need to reset the recipes and get a new list

export default {
  name: 'Settings',
  components: {
    Btn,
    CustomSelect
  },
  computed: {
    storeOptions () {
      return {
        selected: null,
        options: [
          {
            text: 'Selecteer een supermarkt',
            value: null
          },
          {
            text: 'Albert Heijn',
            value: 1
          },
          {
            text: 'Jumbo',
            value: 2
          }
        ]
      }
    }
  },
  methods: {
    handleStoreChange (storeId) {
      console.log('store change', storeId)
    }
  }
}
</script>
