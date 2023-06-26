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
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            v-focus
            class="app__buttons-validation__input"
            placeholder="Searching..."
        />
        <my-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
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

  </div>

</template>


<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
  name: "PostPageWithStore",
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'posts/setPage',
      setSearchQuery: 'posts/setSearchQuery',
      setSelectedSort: 'posts/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'posts/loadMorePosts',
      fetchPosts: 'posts/fetchPosts'
    }),

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
  },


  mounted() {
    this.fetchPosts()
  },

  computed: {
    ...mapState({
      posts: state => state.posts.posts,
      isPostLoading: state => state.posts.isPostLoading,
      searchQuery: state => state.posts.searchQuery,
      selectedSort: state => state.posts.selectedSort,
      page: state => state.posts.page,
      postsOnPage: state => state.posts.postsOnPage,
      totalPages: state => state.posts.totalPages,
      sortOptions: state => state.posts.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'posts/sortedPosts',
      sortedAndSearchedPosts: 'posts/sortedAndSearchedPosts'
    })
  },


  watch:{
  }

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