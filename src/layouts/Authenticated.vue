<template>
  <div class="layout-authenticated">
    <tab-bar></tab-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
  padding-bottom: 5rem; // tabbar spacer
}
</style>
