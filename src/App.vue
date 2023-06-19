<template>
  <div class="app">


    <PostForm
        @create="createPost"
    />

    <PostList
        :posts="posts"
        @remove="removePost"

    />

  </div>

</template>


<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default {
  components: {PostList, PostForm},
  data() {
    return {
      posts: [
        {id: 1, title: 'Javascript 1', body: 'Some description 1'},
        {id: 2, title: 'Javascript 2', body: 'Some description 2'},
        {id: 3, title: 'Javascript 3', body: 'Some description 3'},
      ],
    }
  },

  methods: {
    createPost(newPost) {
      this.posts.push(newPost)
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id)
    }
  }
}


</script>

<style>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}


</style>