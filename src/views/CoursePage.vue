<template>
  <div class="coursePage">
    <div class="container">
      <div v-if="myCourses.length == 0">
        <img class="corgi-courses" src="@/assets/newCourse1.png" alt="new course icon" width="180">
        <div class="row">
          <div class="col s12">
            <h5>Remember Everything Important</h5>
            <h6>Now it’s the time to create your first course and take notes for it!</h6>
          </div>
        </div>
      </div>
      <div v-if="myCourses.length != 0">
        <h5 style="margin-top:3.2rem;margin-bottom:2rem">Courses You Have Created</h5>
        <div class="row">
          <div class="col s6 m3 l2" v-for="course in orderedCourses" :key="course.id">
            <ul class="card" style="margin-right:auto;margin-left:auto">
              <li class="card-content" style="position:relative">
                <span class="dot"></span>
                <span class="remove" @click="removeCourse(course.id)">&times;</span>
                <router-link :to="{ name: 'UploadPage', params: { courseId: course.id,courseName:course.name } }" class="btn-note">
                  <div style="text-align: left;">
                    <span>
                      <span class="semester">{{ course.year }}&nbsp; Semester {{ course.semester }}</span>
                      <br>
                      <span class="course-info">
                        {{ course.label | shortSnippet }}{{course.num | shortSnippet}}
                        <br>
                        {{ course.name | shortSnippet}}
                      </span>
                    </span>
                  </div>
                  <!-- <router-link
                  :to="{ name: 'NotePage', params: { courseName: course.name } }"
                  class="btn-note"
                >
                  <i class="material-icons left">visibility</i>
                  View Course-->
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="newBtn">
        <router-link to="/new" class="btn waves-effect waves-light btn-course">
          <i class="material-icons left" style="font-size:1rem">add</i>Create New Course
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { db, auth } from "@/firebase/init";

export default {
  name: "CoursePage",
  data: function() {
    return {
      msg: "Test",
      user: auth.currentUser.email,
      myCourses: []
    };
  },
  created() {
    this.getCourse();
    let self = this;
    db.collection("users")
      .doc(self.user)
      .collection("courses")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "removed") {
            self.myCourses = self.myCourses.filter(course => {
              return course.id != change.doc.id;
            });
          }
        });
      });
  },
  computed: {
    orderedCourses: function() {
      return _.orderBy(this.myCourses, "date", "desc");
    }
  },
  methods: {
    getCourse() {
      let self = this;
      db.collection("users")
        .doc(self.user)
        .collection("courses")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            self.myCourses.push({
              id: doc.id,
              num: doc.data().courseId,
              name: doc.data().name,
              year: doc.data().year,
              label: doc.data().label,
              semester: doc.data().semester,
              date: doc.data().createdTime
            });
          });
        });
    },
    removeCourse(id) {
      let self = this;
      db.collection("users")
        .doc(self.user)
        .collection("courses")
        .doc(id)
        .delete()
        .then(() => {
          self.myCourses = self.myCourses.filter(course => {
            return course.id != id;
          });
        });
    }
  }
};
</script>

<style scoped>
a {
  color: rgba(0, 0, 0, 0.8);
}
.coursePage {
  text-align: center;
}
.newBtn {
  margin: 10px auto;
  width: 50%;
}

.btn-course {
  position: fixed;
  color: #fff;
  left: 50%;
  /* margin-left: -99px; */
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.9);
  text-transform: unset;
  padding: 5px 16px;
  height: 46px;
  bottom: 10.5rem;
  transition: all linear 200ms;
}

.btn-course:focus,
.btn-course:hover {
  background-color: #e0903e;
}

.collection {
  margin: 10px auto;
  width: 50%;
}

.btn-note {
  float: right;
}

.corgi-courses {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5.5rem;
}
h5 {
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 2.2rem;
  margin-bottom: 1.2rem;
  letter-spacing: 0.9px;
}
h6 {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: 0.5px;
  margin: 1.8rem 0 2.8rem 0;
}
.card {
  height: 10rem;
  width: 10rem;
  box-shadow: unset;
  /* box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2); */
  border-radius: 6px;
  background-color: #f7f7f7;
  border: 1.5px solid #f7f7f7;
  transition: all linear 0.2s;
  /* margin: 1em; */
}

.card .card-content {
  padding: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.5rem;
}

.semester {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.5);
}
.course-info {
  font-weight: 500;
  transition: all linear 0.2s;
  font-size: 0.9rem;
}
.dot {
  height: 1rem;
  width: 1rem;
  background-color: #fff;
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 1rem;
  top: -1rem;
  transition: all linear 0.2s;
  cursor: pointer;
}
.remove {
  position: absolute;
  right: 1.2rem;
  top: -1.3rem;
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.card:hover,
.card:focus {
  background-color: #fff;
  border: 1.5px solid #eb8d21; /* Brighter orange color */
}
.card:hover .dot,
.card:focus .dot {
  background-color: #eb8d21;
}

.card:hover .remove,
.card:focus .remove {
  color: #fff;
}

.card:hover .course-info,
.card:focus .course-info {
  color: #eb8d21;
}

@media screen and (max-width: 600px) {
  .btn-course {
    bottom: 5.8rem;
  }
}

@media screen and (max-width: 420px) {
  .btn-course {
    bottom: 2.8rem;
    font-size: 0.8rem;
  }
  img {
    width: 130px;
  }
  .corgi-courses {
    margin-top: 3.5rem;
  }
  h6 {
    line-height: 1.7rem;
  }
}
</style>
