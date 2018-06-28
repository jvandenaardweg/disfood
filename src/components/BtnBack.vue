<template>
  <button type="button" class="btn btn-back" @click.prevent="handleClick">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'BtnBack',
  methods: {
    handleClick (event) {
      this.$router.go(-1)
      // this.$router.go(-1) // TODO: this will not work with referral links
    }
  }
}
</script>

<style lang="scss">
.btn {
  &.btn-back {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    height: 4rem;
    width: 4rem;
    line-height: 4rem;
    font-size: 1.6rem;
    padding: 0;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    // line-height: 5rem;
    border-radius: 0.3rem;
    background: $gray-20;
    color: $color-white;
    border: 0;
    vertical-align: middle;
    z-index: 10;

    svg {
      height: 3rem;
      // width: 100%;
      position: relative;
      fill: $color-white;
      top: 5px;
      // left: -2px;
    }
  }
}
</style>
