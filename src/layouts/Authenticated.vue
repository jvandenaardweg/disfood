<template>
  <div class="layout-authenticated">
    <tab-bar></tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'

export default {
  name: 'LayoutAuthenticated',
  components: {
    TabBar
  }
}
</script>

<style lang="scss">
.layout-authenticated {
  padding-bottom: 6rem; // tabbar spacer
}
</style>
