<template>
  <div class="coursePage">

    <ul class="collection" v-for="course in orderedCourses" :key="course.id">
      <li class="collection-item">
        <span>
          {{ course.year }}-Semester {{ course.semester }}-{{ course.label }}{{course.num}}-{{ course.name }}
        </span>
        <router-link :to="{ name: 'UploadPage', params: { course: course.id } }" class="btn-note">
          <i class="material-icons left">edit</i>
          View/Edit/Add note
        </router-link>
      </li>
    </ul>
    <div class="newBtn">
      <router-link to="/new" class="btn-large waves-effect waves-light btn-course">
        <i class="material-icons left">add</i>Create course
      </router-link>
    </div>
  
  </div>
</template>

<script>
import _ from "lodash";
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
  computed: {
    orderedCourses: function() {
      return _.orderBy(this.myCourses, 'date', 'desc')
    }
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
                id: doc.id,
                num: doc.data().courseId,
                name: doc.data().name,
                year: doc.data().year,
                label: doc.data().label,
                semester: doc.data().semester,
                date: doc.data().createdTime
              })         
          });
        })
    }
  }
};
</script>

<style scoped>
  .newBtn {
    margin: 10px auto;
    width: 50%;
  }

  .btn-course {
    position: absolute;
    left: 50%;
    margin-left: -115px;
  }

  .collection {
    margin: 10px auto;
    width: 50%;
  }

  .btn-note {
    float: right;
  }
</style>