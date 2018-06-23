<template>
  <div class="home">
    <btn-settings></btn-settings>
    <recipes></recipes>
  </div>
</template>

<script>
import Recipes from '@/components/Recipes'
import BtnSettings from '@/components/BtnSettings'

export default {
  name: 'home',
  components: {
    Recipes,
    BtnSettings
  }
}
</script>

<style lang="scss">
// .home {
//   max-width: $max-width;
//   margin: 0 auto;
//   position: relative;
// }
</style>
