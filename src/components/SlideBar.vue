<template>
  <div class="col s12 m4 l3" >
    <div class = "currentCourse" >
      {{courseName | snippet}}
    </div>


    <div class = "quickAccess">

    </div>

    <div  class = "CreateCourse">

    </div>

  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  data() {
    return {
        taged: []
    }
  },
  props: {
    courseName: {
      type: String,
      default: "Current Course"
    }
  },
  created() {
    var user = firebase.auth().currentUser;
    // load user taged list
  }
}
</script>


<style scoped>
  .container{
    width: 30%;
    height: 100%;
    background-color: wheat;
    display: inline-block;
  }

</style>
