<template>
  <div>
        <h1>Page with Posts</h1>
        <div class="app__buttons">
          <div>
            <my-button
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
          />
        </my-dialog>

        <post-list
            :posts="sortedAndSearchedPosts"
            v-if="!isPostLoading "
        />
        <div v-if="isPostLoading">Loading...</div>
        <div
            class="observer"
        ></div>


  </div>

</template>


<script>
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
import MyInput from "@/components/UI/MyInput";
import MySelect from "@/components/UI/MySelect";
import MyButton from "@/components/UI/MyButton";
import MyDialog from "@/components/UI/MyDialog";
import PostList from "@/components/PostList";
import PostForm from "@/components/PostForm";

export default {
  components: {MyInput, MySelect, MyButton, MyDialog, PostList, PostForm},
  name: "PostPageCompositionApi",
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        {value: 'title', name: 'Sort by title'},
        {value: 'body', name: 'Sort by body'},
        {value: 'id', name: 'Sort by id'}
      ]
    }
  },


  setup(props) {
    const {isPostLoading, posts, totalPages} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
    return {
      isPostLoading,
      posts,
      totalPages,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts
    }
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