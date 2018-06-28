<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
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

.section {
  text-align: left;
  border-bottom: 1px $gray-90 solid;
  padding-bottom: 2rem;

  .section__header {
    h1, h2, h3, h4 {
      margin-bottom: 0.5rem;
    }
  }
}

.page {
  padding: 1.5rem;

  .page__header {
    text-align: center;
    border-bottom: 1px $gray-90 solid;

    h1, h2, h3, h4 {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    h2 {
      color: $gray-70;
    }
  }

  h1 {
    span {
      color: $color-red;
    }
  }

  h2 {
    font-size: 1.6rem;
    // font-weight: 600;

    span {
      color: $color-red;
    }
  }

  .page__footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1.5rem;
    z-index: 10;
    background-color: $color-white;

    .btn {
      width: 100%;
    }
  }
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
