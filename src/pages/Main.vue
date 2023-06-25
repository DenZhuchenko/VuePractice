<template>
  <div>
    <h1>Welcome to the VUE 3</h1>
    <h3>
      <router-link to="post">Posts</router-link>
    </h3>
    <h3>
      <router-link to="about">About</router-link>
    </h3>
  </div>
</template>

<script>
export default {
  name: "Main"
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>