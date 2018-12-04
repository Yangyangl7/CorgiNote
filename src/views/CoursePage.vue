<template>
  <div class="coursePage">

    <ul class="collection" v-for="course in orderedCourses" :key="course.id">
      <li class="collection-item">
        <span>
          <span class="switch">
            <label>
              Private
              <input v-if="course.isPublic" type="checkbox" @change="changeState(course)" checked>
              <input v-if="!course.isPublic" type="checkbox" @change="changeState(course)">
              <span class="lever"></span>
              Public
            </label>
          </span>
          <span class="courseAdj">
            {{ course.year }}-Semester {{ course.semester }}-{{ course.label }}{{course.num}}-{{ course.name }}
          </span>
          <span class="btn-note">
            <router-link :to="{ name: 'NotePage', params: { courseId: course.id } }">
              <i class="material-icons left">visibility</i>
              View Course
            </router-link>
          </span>
        </span>
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
      this.myCourses = [];
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
                isPublic: doc.data().isPublic,
                num: doc.data().courseId,
                name: doc.data().name,
                year: doc.data().year,
                label: doc.data().label,
                semester: doc.data().semester,
                date: doc.data().createdTime
              })
          });
        })
    },
    changeState (course) {
      var state;
      let self = this;
      if (course.isPublic) {
        state = false;
      }
      else {
        state = true;
      }
      console.log(course.name + ": " + course.isPublic + " to: " + state)
    
      db
      .collection("users")
      .doc(self.user)
      .collection("courses")
      .doc(course.id)
      .update({
        isPublic: state
      })
      .then(self.getCourse)
      
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

  .courseAdj {
    margin: 0 30px;
    width: 33%
  }
</style>
