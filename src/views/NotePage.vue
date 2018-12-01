<template>
  <div class = "coursePage">
    <slide-bar
      v-bind:courseName = "courseName"/>

    <div class="courseList">
      <div class = "currentCourse" >
        {{courseName | snippet}}
      </div>
    <div>

  </div>
</template>

<script>
import SlideBar from '@/components/SliderBar.vue'

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
