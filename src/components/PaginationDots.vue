<template>
  <ul class="pagination-dots">
    <li v-for="(dot, index) in dots" :key="index"><div class="pagination-dots__dot" :class="{'is-active': activeIndex === index}"></div></li>
  </ul>
</template>

<script>
export default {
  name: 'PaginationDots',
  props: {
    dots: {
      type: Number,
      default: 3
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss">
.pagination-dots {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  width: 100%;
  text-align: center;

  li {
    display: inline-block;
    margin: 0 0.5rem;
  }

  .pagination-dots__dot {
    width: 7px;
    height: 7px;
    border-radius: 7px;
    background-color: $gray-90;

    &.is-active {
      background-color: $gray-50;
    }
  }
}
</style>
