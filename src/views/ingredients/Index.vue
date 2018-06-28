<template>
  <div class="page page--ingredients">
    <!-- <transition name="fade" mode="in-out"> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'PageIngredients',
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="scss">

</style>
