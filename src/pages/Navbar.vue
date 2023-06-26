<template>
  <div class="navbar">
    <h1>
      <router-link class="logo" to="/">
        Vue
      </router-link>
    </h1>
    <div class="navbar__buttons">
      <router-link to="post">
        <my-button>Posts</my-button>
      </router-link>
        <my-button
            @click="$router.push('/about')"
        >About</my-button>
      <my-button
            @click="$router.push('/store')"
        >Store</my-button>
      <my-button
            @click="$router.push('/composition')"
        >Composition</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  name: "Navbar",
  components: {MyButton}
}
</script>

<style scoped>
h1{
  padding-left: 30px;
}

.logo {
  text-decoration: none;
  color: inherit
}
.navbar {
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  height: 50px;
  background: #e5961f;
  box-shadow: 2px 2px 4px green;
  justify-content: space-between;
  align-items: center;
}
.navbar__buttons {
  display: flex;
  justify-content: space-between;
}
</style>