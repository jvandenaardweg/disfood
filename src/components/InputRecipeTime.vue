<template>
  <custom-select name="store"
  :selected="recipeTimeOptions.selected"
  :options="recipeTimeOptions.options"
  @input="handleRecipeTimeChange"></custom-select>
</template>

<script>
import CustomSelect from '@/components/CustomSelect'

export default {
  name: 'InputRecipeTime',
  components: {
    CustomSelect
  },
  data: () => ({
    recipeTime: null
  }),
  beforeMount () {
    const savedRecipeTime = this.$store.getters['filters/recipeTime']
    if (savedRecipeTime) this.recipeTime = savedRecipeTime
  },
  computed: {
    recipeTimeOptions () {
      return {
        selected: this.recipeTime,
        options: [
          {
            text: 'Hoeveel tijd heb jij?',
            value: null
          },
          {
            text: 'Weinig tijd (max. 15 minuten)',
            value: 15
          },
          {
            text: 'Wel wat tijd (max. 30 minuten)',
            value: 30
          },
          {
            text: 'Veel tijd (meer dan 30 minuten)',
            value: 60
          }
        ]
      }
    }
  },
  methods: {
    handleRecipeTimeChange (recipeTime) {
      this.$store.commit('filters/setRecipeTime', recipeTime)
      this.$emit('change', recipeTime)
    }
  }
}
</script>

<style lang="scss">
.input-recipe-time {
  position: relative;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border-radius: 0.3rem;

  select {
    font-size: 1.6rem;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    border: 0;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;

    &:focus {
      outline: none;
    }

    &::-ms-expand {
      display: none;
    }
  }

  &:after {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
    position: absolute;
    right: 1.5rem;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
