<template>
  <div class="app">

    <h1>Page with Posts</h1>
    <div class="app__buttons">
      <my-button
          @click='showDialog'
      >
        Create Post
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />

    </div>
    <my-dialog
        v-model:show="dialogVisible"
    >
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        :posts="posts"
        @remove="removePost"
        v-if="!isPostLoading "
    />
    <div v-if="isPostLoading">Loading...</div>

  </div>

</template>


<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios'
import MySelect from "@/components/UI/MySelect";

export default {
  components: {MySelect, MyButton, MyDialog, PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'sort by title'},
        {value: 'body', name: 'sort by body'},
        {value: 'id', name: 'sort by id'}
      ]
    }
  },
  methods: {
    createPost(newPost) {
      this.posts.push(newPost)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(el => el.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    hideDialog() {
      this.dialogVisible = false
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
        this.posts = response.data
      } catch (err) {
        console.log(err.message)
      } finally {
        this.isPostLoading = false

      }
    },

  },
  mounted() {
    this.fetchPosts()
  },
  watch: {
    selectedSort(newValue) {

      if (newValue === 'title' || newValue === 'body') {
        this.posts.sort((post1, post2) => {
          return post1[newValue].localeCompare(post2[newValue])
        })
      } else {
        this.posts = this.posts.sort((post1, post2) =>{
          return post1[newValue] - post2[newValue]
        })
      }

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

.app__buttons {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

</style>