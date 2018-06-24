<template>
  <button type="button" class="btn btn-remove">{{label }} <span>&times;</span></button>
</template>

<script>
export default {
  name: 'BtnRemove',
  props: ['label']
}
</script>

<style lang="scss">
.btn-remove {
  background-color: $color-secondary;
  color: $color-black;
  display: inline-block;
  padding: 0.85rem 1.5rem;
  // height: 2rem;
  border: 0;
  border-radius: 0.3rem;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  // margin-bottom: 0.5rem;
  vertical-align: middle;
  line-height: 1.4rem;

  span {
    color: $color-black;
    font-weight: bold;
    font-size: 2rem;
    display: inline-block;
    position: relative;
    top: 0.1rem;
    margin-left: 0.5rem;
    // height: 1.5rem;

  }

}
</style>
