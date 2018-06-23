<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style lang="scss">
.loader {
  font-size: 2rem;
  text-align: center;
  background-color: #E3E3E3;
  width: 100%;
  padding-top: 73.05%;
  position: relative;
  display: block;

  &:before {
    content: "Loading...";
    font-weight: bold;
    font-size: 1.8rem;
    height: 30px;
    width: 100px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    color: #9B9B9B;
  }
}
</style>
