<template>
  <div id="app">
    <tab-bar></tab-bar>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'

export default {
  name: 'App',
  components: {
    TabBar
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  font-size: 62.5%;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
  padding: 0;
  margin: 0;
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-black;
  font-size: 16px;
  line-height: 1.5;
}

.is-hidden {
  display: none !important;
}

#app {
  max-width: $max-width;
  margin: 0 auto;
}

h1 {
  font-family: 'Merriweather', Palatino, Georgia, serif;
  font-size: 2.4rem;
}
</style>
