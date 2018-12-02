<template>
    <div id="new-course">
      <div class="container">
        <h3>New Course</h3>
        <div class="row">
          <form @submit.prevent="saveCourse" class="col s12">
            <div class="row">
              <div class="input-field cols s12">
                <input placeholder="University Name" type="text" class="validate" v-model="univName" required>
              </div>
            </div>
            <div class="row">
              <div class="input-field cols s12">
                <input placeholder="Label Name" type="text" class="validate" v-model="label" required>
              </div>
            </div>
             <div class="row">
              <div class="input-field cols s12">
                <input placeholder="Course Number" type="text" class="validate" v-model="courseId" required>
              </div>
            </div>
            <div class="row">
              <div class="input-field cols s12">
                <input placeholder="Course Name" type="text" class="validate" v-model="name" required>
              </div>
            </div>
            <button type="submit" class="btn">Save</button>
            <router-link to="/course" class="btn">Cancel</router-link>
          </form>
        </div>  
      </div>
    </div>
</template>

<script>
import {db, auth} from '@/firebase/init'
export default {
    name: 'NewCourse',
    data () {
        return {
          univName: null,
          label: null,
          name: null,
          courseId: null,
          semester: null,
          user: auth.currentUser.email
        }
    },
    methods: {
      saveCourse () {
        var month = new Date().getMonth();

        if (month <= '12' && month >= '6') {
          this.semester = '2';
        }
        else {
          this.semester = '1';
        }

        db
          .collection("users")
          .doc(this.user)
          .collection("courses")
          .add({
            univName : this.univName,
            name: this.name,
            label: this.label,
            courseId: this.courseId,
            semester: this.semester,
            year: new Date().getFullYear(),
            createdTime: new Date().toLocaleString()
          })
          .then(() => {
            this.$router.push({name: 'CoursePage'})
          })
          .catch(error => console.log(err))
      }
    }
}
</script>

<style scoped>
  .btn{
    margin: 10px
  }
</style>