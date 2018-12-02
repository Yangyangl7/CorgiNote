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
                <input placeholder="Course Name" type="text" class="validate" v-model="name" required>
              </div>
            </div>
            <div class="row">
              <div class="input-field cols s12">
                <input placeholder="Course Number" type="text" class="validate" v-model="courseId" required>
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
          name: null,
          courseId: null,
          user: auth.currentUser.email
        }
    },
    methods: {
      saveCourse () {
        let self = this;
        db
          .collection("users")
          .doc(self.user)
          .collection("courses")
          .add({
            univName : this.univName,
            name: this.name,
            courseId : this.courseId,
            timestamp: new Date().toLocaleString()
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