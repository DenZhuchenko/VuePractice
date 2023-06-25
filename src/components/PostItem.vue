<template>

  <div class="post">
    <div class="postItem">
      <div><strong>ID: {{post.id}}</strong></div>
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Body: </strong>{{ post.body }}</div>
    </div>

    <div class="post__buttons">
      <my-button
          @click="$router.push(`/post/${post.id}`)"
      >
        Open
      </my-button>
      <my-button
          @click="removePost"
      >Delete
      </my-button>
    </div>

  </div>

</template>

<script>
import MyButton from "@/components/UI/MyButton";

export default {
  name: "PostItem",
  components: {MyButton},
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    removePost() {
      this.$emit('remove', this.post)
    },
    testRemoveButton(){
      this.$emit('removeTest', this.post)
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 400px;

}

.post__buttons {
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  width: 140px;
}



</style>