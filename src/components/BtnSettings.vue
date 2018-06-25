<template>
  <router-link to="/settings" class="btn-settings">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
      <path fill="#FFF" fill-rule="evenodd" d="M18.9 12a8.6 8.6 0 0 0 0-2l2.3-2c.2-.2.3-.5.1-.7l-2.2-3.8c-.1-.2-.4-.3-.6-.2l-2.8 1a8 8 0 0 0-1.8-1l-.5-3c0-.2-.2-.4-.5-.4H8.5c-.3 0-.5.2-.5.5l-.5 2.9-1.8 1-2.8-1a.5.5 0 0 0-.6.2L0 7.4c-.2.2-.1.5.1.7L2.5 10a8.7 8.7 0 0 0 0 2.2L.2 13.9c-.2.2-.3.5-.1.7l2.2 3.8c.1.2.4.3.6.2l2.8-1a8 8 0 0 0 1.8 1l.5 3c0 .2.2.4.5.4h4.4c.3 0 .5-.2.5-.5l.5-2.9 1.8-1 2.8 1c.2.1.5 0 .6-.2l2.2-3.8c.2-.2.1-.5-.1-.7L18.9 12zm-8.2 3a3.9 3.9 0 1 1 0-7.8 3.9 3.9 0 0 1 0 7.8z"/>
    </svg>
  </router-link>
</template>

<script>
export default {
  name: 'BtnSettings'
}
</script>

<style lang="scss">
.btn-settings {
  position: absolute;
  top: 2rem;
  right: 2rem;
  height: 4rem;
  width: 4rem;
  line-height: 4rem;
  font-size: 1.6rem;
  padding: 0 1rem;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  line-height: 5rem;
  border-radius: 0.3rem;
  background: $gray-20;
  color: $color-white;
  border: 0;
  vertical-align: middle;
  z-index: 10;

  svg {
    height: 1.8rem;
    position: relative;
  }

}
</style>
