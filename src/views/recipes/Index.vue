<template>
  <div class="recipes">
    <btn-settings></btn-settings>
    <router-view></router-view>
  </div>
</template>

<script>
import BtnSettings from '@/components/BtnSettings'

export default {
  name: 'recipes',
  components: {
    BtnSettings
  }
}
</script>

<style lang="scss">

</style>
