<template>
  <input
      class="input"
      type="text"
      @input="updateInput"
  >
</template>



<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}


</script>



<style scoped>

.input {
  border: 1px solid teal;
  padding: 10px 15px;
  max-width: 30vw;
  border-radius: 4px;
}

</style>