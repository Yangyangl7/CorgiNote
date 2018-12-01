<template>
  <div class="coursePage">
    <h1>{{msg}}</h1>
    <p>This is the page to show/add courses</p>
  </div>
</template>

<script>
export default {
  name: "CoursePage",
  data: function() {
    return {
      msg: "Test"
    }
  }
};
</script>

<style scoped>
</style>