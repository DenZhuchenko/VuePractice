<template>
  <div>
    <h1>Page with Posts</h1>
    <div class="app__buttons">
      <div>
        <my-button
            @click='showDialog'
        >
          Create Post
        </my-button>
      </div>
      <div class="app__buttons-validation">
        <my-input
            v-focus
            class="app__buttons-validation__input"
            v-model="searchQuery"
            placeholder="Searching..."
        />
        <my-select
            v-model="selectedSort"
            :options="sortOptions"
        />
      </div>
    </div>
    <my-dialog
        v-model:show="dialogVisible"
    >
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostLoading "
    />
    <div v-if="isPostLoading">Loading...</div>
    <div
        class="observer"
        v-intersection="loadMorePosts"
    ></div>

    <!--    <post-paginator-->
    <!--        :page="page"-->
    <!--        :totalPages="totalPages"-->
    <!--        @changePage="changePage"-->

    <!--    />-->


  </div>

</template>


<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios'
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      searchQuery: '',
      selectedSort: '',
      page: 1,
      postsOnPage: 10,
      totalPages: 0,

      sortOptions: [
        {value: 'title', name: 'Sort by title'},
        {value: 'body', name: 'Sort by body'},
        {value: 'id', name: 'Sort by id'}
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

    // changePage (pageNumber){
    //   this.page = pageNumber
    // },

    async fetchPosts() {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`, {
          params: {
            _page: this.page,
            _limit: this.postsOnPage
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.postsOnPage)
        this.posts = response.data
      } catch (err) {
        console.log(err.message)
      }
    },

    async loadMorePosts() {

      try {
        this.page += 1
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`, {
          params: {
            _page: this.page,
            _limit: this.postsOnPage
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.postsOnPage)
        this.posts = [...this.posts, ...response.data]
      } catch (err) {
        console.log(err.message)
      }
    },

  },
  mounted() {
    this.fetchPosts()
  },

  computed: {
    sortedPosts() {
      const titleOrBody = this.selectedSort === 'title' || this.selectedSort === 'body'
      return titleOrBody
          ? [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
          : [...this.posts].sort((post1, post2) => post1[this.selectedSort] - post2[this.selectedSort])
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title?.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch:{
    // page(){
    //   this.fetchPosts()
    // }
  }


  //watcher on selectedSort with mutation of original state
  // watch: {
  //   selectedSort(newValue) {
  //
  //     if (newValue === 'title' || newValue === 'body') {
  //       this.posts.sort((post1, post2) => {
  //         return post1[newValue].localeCompare(post2[newValue])
  //       })
  //     } else {
  //       this.posts = this.posts.sort((post1, post2) => {
  //         return post1[newValue] - post2[newValue]
  //       })
  //     }
  //   }
  // }

}


</script>
<style>



.app__buttons {
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
}

.app__buttons-validation {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
}

.app__buttons-validation__input {
  margin-right: 30px;
}

.observer {
  height: 30px;
}


</style>