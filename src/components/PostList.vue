<template>
<div v-show="posts.length > 0">
  <h3>User List</h3>
  <PostItem
      :post="post"
      v-for="post in posts"
      :key=post.id
      @remove="$emit('remove', post)"
  />

</div>
  <h2 v-show="posts.length === 0" style="color: red"> Post list is empty</h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  name: "PostList",
  components: {PostItem},
  props: {
    posts: {

    }
  }

}
</script>

<style scoped>


</style>