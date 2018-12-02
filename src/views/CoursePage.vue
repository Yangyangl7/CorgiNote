<template>
  <div class="coursePage">

    <ul class="collection" v-for="course in myCourses" :key="course.id">
      <li class="collection-item">{{ course.name }}</li>
    </ul>
    <div class="newBtn">
      <router-link to="/course/new" class="btn-floating btn-medium waves-effect waves-light red">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  
  </div>
</template>

<script>
import { db, auth } from '@/firebase/init';

export default {
  name: "CoursePage",
  data: function() {
    return {
      msg: "Test",
      user: auth.currentUser.email,
      myCourses: []
    }
  },
  created() {
    this.getCourse();
  },
  methods: {
    getCourse () {
      let self = this;
      db
        .collection("users")
        .doc(self.user)
        .collection("courses")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              self.myCourses.push ({
                name: doc.data().name
              })         
          });
        })
    }
  }
};
</script>

<style scoped>
  .newBtn{
    margin: auto;
    width: 50%;
  }

  .btn-floating{
    position: absolute;
    left: 50%;
    margin-left: -28px;
  }
</style>