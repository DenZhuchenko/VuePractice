<template>
<div v-show="posts.length > 0">
  <h3>Post List</h3>
  <transition-group name="post-list">
    <PostItem
        :post="post"
        v-for="post in posts"
        :key=post.id
        @remove="$emit('remove', post)"
    />
  </transition-group>
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
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.post-list-move{
  transition: transform 0.3s ease-in-out;
}

</style>