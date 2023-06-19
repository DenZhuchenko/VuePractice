<template>
  <button class="button">
    <slot>

    </slot>
  </button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>

<style scoped>

.button {
  width: fit-content;
  border: 2px solid teal;
  padding: 10px;
}
</style>