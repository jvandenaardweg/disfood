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

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 200ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
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
  margin-bottom: 1.5rem;

  .section__header {
    h1, h2, h3, h4 {
      margin-bottom: 0.5rem;
    }
  }
}

.text-center {
  text-align: center !important;
}

.page {
  padding: 6rem 1.5rem 1.5rem 1.5rem;
  max-width: $max-width;
  margin: 0 auto;

  .page__header {
    padding: 1.5rem 1.5rem 0 1.5rem;
    text-align: center;
    border-bottom: 1px $gray-90 solid;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 6rem;
    background-color: $color-white;
    z-index: 10;
    max-width: $max-width;
    margin: 0 auto;

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

.form-control {
  height: 5rem;
  padding: 0 2rem;
  // line-height: 5rem;
  color: $color-black;
  background-color: $gray-90;
  border: 0;
  border-radius: 0.3rem;
  // border-top-left-radius: 0.3rem;
  // border-bottom-left-radius: 0.3rem;
  font-size: 1.6rem;
  width: 100%;
}
</style>
