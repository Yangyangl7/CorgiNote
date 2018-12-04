<template>
  <div class="signUp">
    <div class="container">
      <h5>
        <span class="highlight">Create</span>,
        <span class="highlight">share</span> and
        <span class="highlight">explore</span> meaningful notes
        <br>keep your hands on the keyboard - and your brain happy.
      </h5>
      <div class="row">
        <div class="col l6 m12 s12 signup-left">
          <h4>Create Account</h4>
          <form @submit.prevent class="signup">
            <div class="field">
              <label for="email">Email Address</label>
              <input type="email" name="email" v-model="email">
              <span class="helper-text" data-error="wrong" data-success="right">helper text</span>
            </div>
            <div class="field">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                v-model="password"
                style="margin-bottom: 10px;"
              >
            </div>
            <div class="feedback red-text" v-if="feedback">{{ feedback }}</div>
            <div
              style="display: flex;align-items: center;justify-content: space-between;"
              id="signup-button"
            >
              <div class="field">
                <button class="btn" @click="signup">Sign Up</button>
              </div>
              <div class="field">
                <p>-or-</p>
              </div>
              <div class="field">
                <button class="btn" @click="googleLogin">Login With Google</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col l6 m12 s12 signup-right">
          <img src="@/assets/signup.png" alt="signup corgi" height="300">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { provider, db, auth } from "@/firebase/init";

export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  created() {
    var user = auth.currentUser;
    if (user) {
      this.$router.replace("course");
    }
  },
  methods: {
    signup() {
      if (this.email && this.password) {
        let ref = db.collection("users").doc(this.email);
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            ref.set({
              user_id: cred.user.uid
            });
          })
          .then(() => {
            this.$router.replace("course");
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.feedback = "Please enter all fields.";
      }
    },
    googleLogin() {
      this.feedback = null;
      auth
        .signInWithRedirect(provider)
        .then(result => {
          db.collection("users")
            .doc(result.user.email)
            .set({
              user_id: result.user.uid
            });
        })
        // .then(() => {
        //   this.router.replace("course");
        // })
        .catch(err => {
          this.feedback = err.message;
        });
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 5rem;
}
h5 {
  text-align: center;
  line-height: 2.7rem;
  font-weight: 500;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.8);
}
.highlight {
  background-color: rgba(241, 211, 159, 0.6);
}
.row {
  margin-top: 3.5rem;
}
.row h4 {
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 25px;
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
.signup-left {
  padding-right: 5rem;
}
.col .field button {
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  /* padding: 0px 38px; */
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

.signup-right {
  margin-top: 18px;
  padding-left: 30px;
}

@media screen and (max-width: 992px) {
  .signup-right img {
    position: absolute;
    top: 22rem;
    padding: 0;
    left: 50%;
    margin-left: -15rem;
    width: 30rem;
    height: unset;
    -webkit-animation: cssAnimation 4s forwards;
    animation: cssAnimation 4s forwards;
  }
  @keyframes cssAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
      z-index: -1;
    }
  }
  @-webkit-keyframes cssAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
      z-index: -1;
    }
  }

  .signup-left {
    padding: 5px 80px;
    -webkit-animation: fadeIn 7s forwards;
    animation: fadeIn 7s forwards;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
  .col .field button {
    padding: 0 6.7vw;
  }
  .container {
    margin-top: 6rem;
  }
  .row {
    margin-top: 4.6rem;
  }
}

@media screen and (max-width: 590px) {
  .col .field button {
    font-size: 11px;
    padding: 0px 2.5vw;
  }
}
@media screen and (max-width: 420px) {
  .signup-left {
    padding: 5px 40px;
  }
}
</style>