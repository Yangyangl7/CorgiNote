<template>
  <div>
  <div class = "row">
    <slide-bar
      v-bind:courseName = "courseName"/>


    <div class="col s12 m8 l9" style = "background-color: lightgrey;height: 93vh ">
      <div class = "currentCourse" >
        {{courseName | snippet}}
      </div>
    </div>

  </div>
</div>
</template>

<script>
import SlideBar from '@/components/SlideBar.vue'

export default {
  components: {
    SlideBar
  },
  data() {
    return {
      courseName: this.$route.params.courseName,
      noteList: []
    }
  },
  created() {

  },
  methods: {

  }
}

</script>

<style scoped>
  .coursePage {
    width: 100%;
    height: 100%
  }

  .courseList{
    width: 70%;
    height: 100%;
    background-color: lightgrey;
    display: inline-block;
  }

</style>
