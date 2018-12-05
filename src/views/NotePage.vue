<template>
  <div>
  <div class = "row">
    <slide-bar
      v-bind:courseName = "courseId"/>

    <show-notes v-bind:courseName = "courseId" />

  </div>
</div>
</template>

<script>
import SlideBar from '@/components/SlideBar.vue'
import ShowNotes from '@/components/ShowNotes.vue'
import { db, auth } from '@/firebase/init';

export default {
  components: {
    SlideBar,
    ShowNotes
  },
  data() {
    return {
      user: auth.currentUser.email,
      courseId: this.$route.params.courseId,
      noteList: []
    }
  },
  created() {
    let self = this;
    db
      .collection("users")
      .doc(self.user)
      .collection("courses")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            self.noteList.push ({
              id: doc.id,
              num: doc.data().courseId,
              name: doc.data().name,
              year: doc.data().year,
              label: doc.data().label,
              semester: doc.data().semester,
              date: doc.data().createdTime
            })
          })
        });
  },
  methods: {

  }
}

</script>

<style scoped>


</style>
