<template>
  <p>a recipe {{ recipeId }}</p>
</template>

<script>
export default {
  name: 'recipes-id',
  computed: {
    recipeId () {
      return this.$route.params.recipeId
    }
  }
}
</script>

<style lang="scss">

</style>
