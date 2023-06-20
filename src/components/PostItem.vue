<template>

  <div class="post">
    <div class="postItem">
      <div><strong>Title: </strong>{{ post.title }}</div>
      <div><strong>Description: </strong>{{ post.body }}</div>
    </div>

    <div class="post__btns">
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



</style>