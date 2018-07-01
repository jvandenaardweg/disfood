<template>
  <div class="custom-select form-control">
    <select :name="name" v-model="value">
      <option v-for="option in options"
        :value="option.value"
        :key="option.value"
        :disabled="option.value === null">
        {{ option.text }}
      </option>
    </select>
  </div>

</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    name: {
      type: String
    },
    options: {
      type: Array
    },
    selected: {
      type: [String, Number]
    }
  },
  computed: {
    value: {
      get () {
        return this.selected
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss">
.custom-select {
  position: relative;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border-radius: 0.3rem;

  select {
    font-size: 1.6rem;
    width: 100%;
    height: 100%;
    padding: 0 1rem;
    border: 0;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;

    &:focus {
      outline: none;
    }

    &::-ms-expand {
      display: none;
    }
  }

  &:after {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: .255em;
    vertical-align: .255em;
    content: "";
    border-top: .3em solid;
    border-right: .3em solid transparent;
    border-bottom: 0;
    border-left: .3em solid transparent;
    position: absolute;
    right: 1.5rem;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
