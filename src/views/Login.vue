<template>
  <div class="logIn">
    <div class="container">
      <img src="@/assets/login.png" alt="login icon" height="200">
      <div class="row form-container">
        <div class="col s12">
          <h4>LOGIN</h4>
          <form @submit.prevent="login" class="login">
            <div class="field">
              <label for="email">Email Address</label>
              <input type="email" name="loginEmail" v-model="loginEmail">
              <span class="helper-text" data-error="wrong" data-success="right">helper text</span>
            </div>
            <div class="field">
              <label for="password">Password</label>
              <input type="password" name="loginPassword" v-model="loginPassword">
            </div>
            <div class="feedback" v-if="loginFeedback">{{ loginFeedback }}</div>
            <div class="field" style="display: inline-block">
              <button class="btn">Account login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase/init";

export default {
  name: "Login",
  data() {
    return {
      loginEmail: null,
      loginPassword: null,
      loginFeedback: null
    };
  },
  methods: {
    login() {
      if (this.loginEmail && this.loginPassword) {
        auth
          .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
          .then(function () {
            this.$router.replace("course");
            // console.log(cred.user);
          })
          .catch(err => {
            this.loginFeedback = err.message;
          });

        this.loginFeedback = null;
      } else {
        this.loginFeedback = "Please enter all fields.";
      }
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}
img {
  margin-top: 2.2rem;
  z-index: -2;
  position: relative;
}
.form-container {
  margin: 0 170px;
  padding: 2px 15px 20px 15px;
  border: 1px solid #ddd;
  z-index: 999;
  background-color: #fff;
  margin-top: -4rem;
  border-radius: 5px;
}
.col label {
  font-size: 0.8rem;
}
.col span {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.2);
}
.col .field {
  margin-top: 15px;
}

.col .field input[type="email"] {
  height: 2.4rem;
}
.col .field input[type="email"]:focus {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.8);
  box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.8);
}

.col .field input[type="password"] {
  height: 2.4rem;
}
.col .field input[type="password"]:focus {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.8);
  box-shadow: 0 0.5px 0 0 rgba(0, 0, 0, 0.8);
}
.col .field button {
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 0px 2vw;
  height: 38px;
  transition: all linear 200ms;
  font-size: 1rem;
  text-transform: unset;
}

.col .field button:hover,
.col .field button:focus {
  background-color: #e0903e;
}
</style>