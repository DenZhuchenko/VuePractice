<template>
  <form class="form" @submit.prevent>
    <h4>Create Post</h4>
    <my-input
        v-focus
        v-model = "post.title"
        type="input"
        placeholder="Enter Title"
    />
    <my-input
        v-model="post.body"
        type="input"
        placeholder="
        Enter Description"
    />
    <my-button
        class="form__btn"
        @click="createPost"
    >
      Add Post
    </my-button>
  </form>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
export default {
  name: "PostForm",
  components: {MyInput, MyButton},
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      if (this.post.body && this.post.title) {
        this.post.id = Date.now()
        this.$emit('create', this.post)
        this.post = {
          title: '',
          body: '',
        }
      }
    }
  },
  watch: {
    post: {
      handler(newValue) {
        console.log('newPostValue: ', newValue)
      },
      deep: true
    }
  }
}
</script>

<style scoped>


.form {
  display: flex;
  flex-direction: column;

}

.form__btn {
  margin-top: 15px;
}

</style>