<template>
  <button type="button" class="btn" :class="className">{{ label }}<span v-if="icon" v-html="icon"></span></button>
</template>

<script>
export default {
  name: 'Btn',
  props: ['label', 'className', 'icon']
}
</script>

<style lang="scss">
.btn {
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  outline: none;

  &:focus {
    outline: none;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: inherit;
  }

  &.btn-primary {
    background-color: #0077FF;
    color: #ffffff;
    font-size: 1.8rem;
    height: 5rem;
    line-height: 5rem;
    padding: 0 2rem;
    border: 0;
    border-radius: 0.3rem;
  }

  &.btn-secondary {
    background-color: $color-secondary;
    color: $color-black;
    display: inline-block;
    padding: 0.85rem 1.5rem;
    border: 0;
    border-radius: 0.3rem;
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
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
    }
  }

  &.btn-block {
    display: block;
    width: 100%;
  }
}
</style>
