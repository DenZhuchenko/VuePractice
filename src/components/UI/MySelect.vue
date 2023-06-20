<template>
    <select
        @v-model="modelValue"
        @change="changeOption">
      <option disabled value="">Choose from list</option>
      <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
</template>

<script>
export default {
  name: "MySelect",
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event)
    }
  },
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>