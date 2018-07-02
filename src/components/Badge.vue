<template>
  <div class="badge" :class="{'badge-primary': variant === 'primary'}">{{ label }}</div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    label: {
      type: String
    },
    variant: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.badge {
  border-radius: 5px;
  background-color: $gray-90;
  color: $color-black;
  font-size: 1.2rem;
  padding: 0.1rem 0.5rem;

  &.badge-primary {
    background-color: $color-primary;
    color: $color-white;
  }
}
</style>
