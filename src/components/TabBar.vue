<template>
  <nav class="tabbar">
    <router-link class="tabbar__item" to="/recipes">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
      </svg>
      <span>Recepten</span>
    </router-link>
    <router-link class="tabbar__item" to="/favorites">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <span>Favorieten</span>
    </router-link>
    <router-link class="tabbar__item" to="/settings">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
      </svg>
      <span>Instellingen</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style lang="scss">
.tabbar {
  display: flex;
  position: fixed;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 5.5rem;
  bottom: 0;
  justify-content: space-around;
  border-bottom: 0;
  background-color: $color-white;
  border-top: 1px $gray-80 solid;
  padding: 0;
  text-align: center;

  .tabbar__item {
    align-self: center;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    flex: 1 1 0;
    width: auto;
    font-size: 1.2rem;
    text-decoration: none;
    color: $gray-50;

    &:last-child {
      border-right: 0;
    }

    &.is-active {
      color: $color-primary;

      svg {
        fill: $color-primary;
      }
    }

    span {
      display: block;
      margin-bottom: 4px;
      font-weight: 600;
    }

    svg {
      position: relative;
      top: 6px;
      fill: $gray-60;
    }
  }
}
</style>
