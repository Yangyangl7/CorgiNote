<template>
  <div id="new-course">
    <div class="container">
      <h4>Create New Course</h4>
      <div class="row">
        <form @submit.prevent="saveCourse" class="col s12">
          <div class="row">
            <div class="field col s12">
              <label for="univ-name">University Name</label>
              <input type="text" class="validate" v-model="univName" required>
              <!-- <label for="univ-name">University Name</label> -->
            </div>
          </div>
          <div class="row">
            <div class="field col s12">
              <label for="label-name">Label Name</label>
              <input type="text" class="validate" v-model="label" required>
            </div>
          </div>
          <div class="row">
            <div class="field col s12">
              <label for="course-num">Course Number</label>
              <input type="text" class="validate" v-model="courseId" required>
            </div>
          </div>
          <div class="row">
            <div class="field col s12">
              <label for="course-name">Course Name</label>
              <input type="text" class="validate" v-model="name" required>
            </div>
          </div>
          <div class="course-btn">
            <button type="submit" class="btn">Save</button>
            <router-link
              :to="{ name: 'CoursePage' }"
              class="btn"
              style=" background-color: rgba(0, 0, 0, 0.3);"
            >Cancel</router-link>
            <!-- <a href="/course" class="btn" style=" background-color: rgba(0, 0, 0, 0.3);">Cancel</a> -->
          </div>
        </form>
      </div>
    </div>
    <img class="corgi-head-web" src="@/assets/newCourse.png" alt="new course icon" width="140">
    <router-link :to="{ name: 'CoursePage' }">
      <img class="left-arrow" src="@/assets/left-arrow.png" alt="left arrow icon" height="24">
    </router-link>
    <!-- <a href="/course">
      <img class="left-arrow" src="@/assets/left-arrow.png" alt="left arrow icon" height="24">
    </a>-->
  </div>
</template>

<script>
import { db, auth } from "@/firebase/init";
export default {
  name: "NewCourse",
  data() {
    return {
      univName: null,
      label: null,
      name: null,
      courseId: null,
      semester: null,
      user: auth.currentUser.email
    };
  },
  methods: {
    saveCourse() {
      var month = new Date().getMonth();

      if (month <= "12" && month >= "6") {
        this.semester = "2";
      } else {
        this.semester = "1";
      }

      db.collection("users")
        .doc(this.user)
        .collection("courses")
        .add({
          univName: this.univName,
          name: this.name,
          label: this.label,
          courseId: this.courseId,
          semester: this.semester,
          year: new Date().getFullYear(),
          createdTime: new Date().toLocaleString(),
          isPublic: false
        })
        .then(() => {
          this.$router.push({ name: "CoursePage" });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.btn {
  margin: 10px 15px;
  text-transform: unset;
  padding: 0 2.3rem;
  background-color: rgba(0, 0, 0, 0.9);
}
.btn:hover,
.btn:focus {
  background-color: #e0903e;
}
.container {
  padding: 2.2rem 12rem;
}
h4 {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2.5rem;
}
.field input {
  height: 2.4rem;
}
.field input[type="text"]:focus {
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.7);
}
input.valid[type="text"]:not(.browser-default) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.7);
}

.course-btn {
  text-align: center;
}
.course-btn button {
  padding: 0 2.6rem;
}
img.corgi-head-web {
  position: absolute;
  -ms-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
  top: 50%;
  right: -30px;
  margin-top: -70px;
}
img.left-arrow {
  opacity: 0.5;
  position: absolute;
  top: 50%;
  margin-top: -12px;
  /* transform: translateY(-50%); */
  left: 40px;
  cursor: pointer;
  transition: all linear 0.2s;
}
img.left-arrow:hover,
img.left-arrow:focus {
  opacity: 1;
}

@media screen and (max-width: 600px) {
  .container {
    padding: 2.2rem 6rem;
  }
  img.left-arrow {
    height: 16px;
    margin-top: -8px;
  }
  img.corgi-head-web {
    width: 90px;
    margin-top: -45px;
    right: -20px;
  }
}

@media screen and (max-width: 420px) {
  .container {
    padding: 2.2rem 4rem;
  }
  img.left-arrow {
    height: 12px;
    margin-top: -6px;
    left: 20px;
  }
  img.corgi-head-web {
    width: 60px;
    margin-top: -25px;
    right: -20px;
  }
}
</style>