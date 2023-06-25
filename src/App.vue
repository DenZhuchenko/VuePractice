<template>
  <navbar></navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/pages/Navbar";
export default {
  name: "App",
  components: {Navbar}
}
</script>

<style scoped>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.app {
  padding: 20px;
  background: wheat;
  display: block;
  min-height: 100vh;
}
</style>