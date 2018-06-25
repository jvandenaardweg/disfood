<template>
  <div class="input-recipe-time form-control">
    <select name="recipeTime" v-model="recipeTime">
      <option selected disabled :value="null">Hoeveel tijd heb jij?</option>
      <option :value="15">Weinig tijd (maximaal 15 minuten)</option>
      <option :value="30">Wel wat tijd (maximaal 30 minuten)</option>
      <option :value="60">Veel tijd (meer dan 30 minuten)</option>
    </select>
  </div>

</template>

<script>
export default {
  name: 'InputRecipeTime',
  data: () => ({
    recipeTime: null
  }),
  beforeMount () {
    const savedRecipeTime = this.$store.getters['filters/recipeTime']
    if (savedRecipeTime) this.recipeTime = savedRecipeTime
  },
  watch: {
    recipeTime (newValue, oldValue) {
      if (newValue) this.$store.commit('filters/setRecipeTime', newValue)
      this.$emit('recipeTime', this.recipeTime)
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
    right: 2rem;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
