<template>
  <div class="coursePage">
    <div class="container">
      <div>
        <div class="row">
          <form class="col s12" @submit.prevent>
            <div class="row" style="margin-bottom: -1.5rem">
              <div class="input-field col s12 search-container">
                <input
                  type="email"
                  v-model="searchUser"
                  placeholder="Search users by their email"
                  @keyup.enter="searchUsers"
                >
                <i class="small material-icons submit-button prefix" @click="searchUsers">search</i>
              </div>
            </div>
          </form>
        </div>
      </div>
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
          <div class="col s6 m4 l3" v-for="course in myCourses" :key="course.id">
            <ul class="card" style="margin-right:auto;margin-left:auto">
              <li class="card-content" style="position:relative">
                <div class="switch">
                  <label>
                    Private
                    <input
                      v-if="course.isPublic"
                      type="checkbox"
                      @change="changeState(course)"
                      checked
                    >
                    <input v-if="!course.isPublic" type="checkbox" @change="changeState(course)">
                    <span class="lever"></span>
                    Public
                  </label>
                </div>
                <span class="dot"></span>
                <span class="remove" @click="removeCourse(course.id)">&times;</span>
                <router-link
                  :to="{ name: 'UploadPage', params: { courseId: course.id, courseName:course.name } }"
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
import { db, auth } from "@/firebase/init";

export default {
  name: "CoursePage",
  data() {
    return {
      user: auth.currentUser.email,
      myCourses: [],
      searchUser: ""
    };
  },
  created() {
    this.myCourses = [];
    let self = this;

    db.collection("users")
      .doc(self.user)
      .collection("courses")
      .orderBy("createdTime")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            let doc = change.doc;
            self.myCourses.unshift({
              id: doc.id,
              isPublic: doc.data().isPublic,
              num: doc.data().courseId,
              name: doc.data().name,
              year: doc.data().year,
              label: doc.data().label,
              semester: doc.data().semester,
              date: doc.data().createdTime
            });
          }
          if (change.type === "removed") {
            self.myCourses = self.myCourses.filter(course => {
              return course.id != change.doc.id;
            });
          }
          if (change.type === "modified") {
            let doc = change.doc;
            let arr = self.myCourses.find(x => x.id === doc.id);
            arr.isPublic = doc.data().isPublic;
          }
        });
      });
  },
  methods: {
    searchUsers() {
      var email = this.searchUser;
      let self = this;

      if (email) {
         db.collection("users")
        .doc(email)
        .get()
        .then(function(doc) {
          if (doc.id != self.user && doc.exists) {
            self.$router.push({ name: "Search", params: { userId: email } });
          } else {
            console.log("No such user");
            self.$toasted.show("Sorry, No Such User.", { 
              theme: "outline", 
              position: "top-center", 
              duration : 1500
            });
          }
        });
      }
    },
    changeState(course) {
      var state;
      let self = this;
      if (course.isPublic) {
        state = false;
      } else {
        state = true;
      }

      console.log(course.name + ": " + course.isPublic + " to: " + state);
      course.isPublic = state;

      db.collection("users")
        .doc(self.user)
        .collection("courses")
        .doc(course.id)
        .update({
          isPublic: state
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
      db.collection("notes")
        .where("courseId", "==", id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .delete()
              .then(() => {
                console.log("note doc" + id + "has been deleted!");
              })
              .catch(err => {
                console.log("deleting doc error" + err);
              });
          });
        });
    }
  }
};
</script>

<style scoped>
#toast-container {
    position: fixed !important;
    bottom: 0px !important;
    left: 0px !important;
}

.toast {
  position: fixed !important;
  top: 50px !important;
}

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
  bottom: 9.5rem;
  transition: all linear 200ms;
  z-index: 3;
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
  float: center;
}

.corgi-courses {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.2rem;
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
  height: 11.5rem;
  width: 11.5rem;
  box-shadow: unset;
  /* box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2); */
  border-radius: 6px;
  background-color: #f7f7f7;
  border: 1.5px solid #f7f7f7;
  transition: all linear 0.2s;
  z-index: 2;
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

input[type="email"]:not(.browser-default) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.input-field input[type="email"]:focus {
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.7);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.7); */
  border-bottom: 1px solid rgba(235, 141, 33, 0.8);
  box-shadow: 0 1px 0 0 rgba(235, 141, 33, 0.8);
}

.input-field .prefix.active {
  color: #eb8d21;
}

i.submit-button {
  transition: all linear 200ms;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
}

i.submit-button:hover,
i.submit-button:focus {
  color: #eb8d21;
}
i.prefix {
  top: 1.4em;
  right: 9.5rem;
}

.search-container {
  padding: 1rem 10rem;
}

::placeholder {
  font-weight: 300;
  font-size: 1rem;
}

.switch label .lever {
  width: 26px;
  height: 12px;
  margin: 0 8px 0 12px;
}

.switch label .lever:before,
.switch label .lever:after {
  width: 16px;
  height: 16px;
}

.switch label input[type="checkbox"]:checked + .lever:before,
.switch label input[type="checkbox"]:checked + .lever:after {
  left: 14px;
}

.switch label input[type="checkbox"]:checked + .lever {
  background-color: rgba(235, 141, 33, 0.5);
}

.switch label input[type="checkbox"]:checked + .lever:after {
  background-color: #eb8d21;
}

/* #toast-container {
  display: block;
  position: fixed;
  z-index: 10000;
  /* top: 10%;
  left: 50%;
  transform: translateX(-50%); */

/* @media only screen and (min-width: 993px) {
  #toast-container {
    top: 10%;
    right: 50%;
    max-width: 86%;
  }
} */

@media screen and (max-width: 600px) {
  .btn-course {
    bottom: 5.8rem;
  }
  .search-container {
    padding: 1rem 8rem;
  }
  i.prefix {
    top: 1.4em;
    right: 7rem;
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

  .search-container {
    padding: 1rem 4rem;
  }

  i.prefix {
    top: 1.4em;
    right: 3rem;
  }

  ::placeholder {
    font-size: 0.9rem;
  }
}

@media screen and (max-width: 320px) {
  .corgi-courses {
    margin-top: 0;
  }
  h5 {
    margin-top: 1.2rem;
  }
}
</style>
