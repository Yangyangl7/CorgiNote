<template>
  <div class="container">
    <div v-if="publicCourses.length == 0">
      <img
        class="corgi-courses"
        src="@/assets/noSharedCourse.png"
        alt="new course icon"
        width="180"
      >
      <div class="row">
        <div class="col s12">
          <h5>Woof... {{ this.userName }} has not shared any course.</h5>
        </div>
        <div class="newBtn">
          <router-link to="/course" class="btn waves-effect waves-light">Back To My Courses</router-link>
        </div>
      </div>
    </div>
    <div v-if="publicCourses.length != 0">
      <h5 style="margin-top:3.2rem;margin-bottom:2rem">{{ this.userName }}'s Public Courses</h5>
      <div class="row">
        <div class="col s6 m4 l3" v-for="course in orderedCourses" :key="course.id">
          <ul class="card" style="margin-right:auto;margin-left:auto">
            <li class="card-content" style="position:relative">
              <router-link
                :to="{ name: 'CommentPage', params: { courseId: course.id, courseName:course.name } }"
                class="btn-note"
              >
                <div>
                  <span>
                    <span class="semester">{{ course.year }}&nbsp; Semester {{ course.semester }}</span>
                    <br>
                    <span class="course-info">
                      {{ course.label | shortSnippet }} {{course.num | shortSnippet}}
                      <br>
                      {{ course.name | shortSnippet}}
                    </span>
                  </span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="newBtn">
        <router-link to="/course" class="btn waves-effect waves-light btn-course">Back To My Courses</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { db } from "@/firebase/init";

export default {
  name: "Search",
  data: function() {
    return {
      searchUser: this.$route.params.userId,
      publicCourses: [],
      userName: ""
    };
  },
  computed: {
    orderedCourses: function() {
      return _.orderBy(this.publicCourses, "date", "desc");
    }
  },
  created() {
    this.getCourse();
  },
  methods: {
    getCourse() {
      this.myCourses = [];
      let self = this;
      db.collection("users")
        .doc(self.searchUser)
        // .then(console.log("search user:", self.searchUser))
        .collection("courses")
        .where("isPublic", "==", true)
        .get()
        .then(function(querySnapshot) {
          var email = self.searchUser;
          self.userName = email.replace(/@[^@]+$/, "");

          querySnapshot.forEach(function(doc) {
            self.publicCourses.push({
              id: doc.id,
              isPublic: doc.data().isPublic,
              num: doc.data().courseId,
              name: doc.data().name,
              year: doc.data().year,
              label: doc.data().label,
              semester: doc.data().semester,
              date: doc.data().createdTime
            });
          });
        });
    }
  }
};
</script>

<style scoped>
.corgi-courses {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3.5rem;
}

a {
  color: rgba(0, 0, 0, 0.8);
}

h5 {
  font-weight: 700;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 2.2rem;
  margin-bottom: 2.2rem;
  letter-spacing: 0.9px;
  text-align: center;
}

.newBtn .btn {
  color: #fff;
  text-transform: unset;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.9);
  margin-top: 2.5rem;
  transition: all linear 200ms;
  padding: 5px 16px 5px 16px;
  height: 46px;
}
.newBtn .btn:focus,
.newBtn .btn:hover {
  background-color: #e0903e;
}

.card {
  height: 11.5rem;
  width: 11.5rem;
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
  text-align: center;
}

.card:hover,
.card:focus {
  background-color: #fff;
  border: 1.5px solid #eb8d21; /* Brighter orange color */
}

.card:hover .course-info,
.card:focus .course-info {
  color: #eb8d21;
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

.btn-course {
  position: fixed;
  bottom: 9.5rem;
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
}
</style>


