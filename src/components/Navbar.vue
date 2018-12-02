<template>
  <div class="navbar">
    <nav class="nav-wrapper white">
      <div class="container">
        <a class="brand-logo">
          <router-link :to="{ name: 'CoursePage' }">Corgi Note</router-link>
        </a>
        <a href="#" class="sidenav-trigger">
          <i class="material-icons" @click="openNav">menu</i>
        </a>
        <ul class="right hide-on-med-and-down">
          <li v-if="!user">
            <router-link :to="{ name: 'Login' }">
              <span class="log-in">Log in</span>
            </router-link>
          </li>
          <li v-if="!user">
            <router-link :to="{ name: 'Signup' }">
              <span class="sign-up">Sign up</span>
            </router-link>
          </li>
          <li v-if="user">
            <a class="user-email">{{ user.email }}</a>
          </li>
          <li v-if="user">
            <router-link :to="{ name: 'CoursePage' }">Courses</router-link>
          </li>
          <li v-if="user">
            <a @click="logout">Log out</a>
          </li>
        </ul>
      </div>
    </nav>

    <ul class id="sidenav" ref="sidenav">
      <a href="javascript:void(0)" @click="closeNav" class="closebtn">&times;</a>
      <li v-if="user">
        <a class="sidenav-account">Account:
          <br>
          {{ user.email }}
        </a>
      </li>
      <li v-if="!user">
        <router-link :to="{ name: 'Login' }">Log in</router-link>
      </li>
      <li v-if="!user">
        <router-link :to="{ name: 'Signup' }">Sign up</router-link>
      </li>
      <li v-if="user">
        <router-link :to="{ name: 'CoursePage' }">Courses</router-link>
      </li>
      <li v-if="user">
        <a @click="logout">Log out</a>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },
  methods: {
    openNav() {
      this.$refs.sidenav.style.width = "250px";
    },
    closeNav() {
      this.$refs.sidenav.style.width = "0";
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("this is user:", user);
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style scoped>
.navbar nav a {
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
}
.navbar ul li a {
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  transition: all linear 0.2s;
}

.navbar ul li a:hover,
.navbar ul li a:focus {
  background-color: transparent;
  color: #e0903e;
}

.navbar .white {
  z-index: 999;
  box-shadow: none;
  border-bottom: 1px solid#ddd;
}

.log-in {
  transition: all linear 0.2s;
}

.log-in:hover,
.log-in:focus {
  color: rgba(0, 0, 0, 0.9);
  color: #e0903e;
}
.sign-up {
  background-color: rgba(0, 0, 0, 0.9);
  padding: 6px 13px 8px;
  color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  transition: all linear 0.3s;
}

.sign-up:hover,
.sign-up:focus {
  background-color: #e0903e;
}

.brand-logo {
  font-size: 1.5rem;
}

.navbar ul li .user-email {
  cursor: unset;
  color: rgba(0, 0, 0, 0.8);
}

.navbar ul li .user-email:hover,
.navbar ul li .user-email:focus {
  color: rgba(0, 0, 0, 0.8);
}

#sidenav {
  background-color: #111;
  height: 100vh;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 7rem;
  margin-top: 0;
}

#sidenav a {
  padding: 8px 8px 8px 45px;
  text-decoration: none;
  font-size: 1.5rem;
  color: #818181;
  color: #fff;
  display: block;
  transition: 0.3s;
  cursor: pointer;
}

#sidenav a:hover,
#sidenav a:focus {
  color: #eb8d21;
}

#sidenav .closebtn {
  position: absolute;
  top: 6px;
  right: 16px;
  font-size: 1.8rem;
  margin-left: 50px;
}

#sidenav .closebtn:hover,
#sidenav .closebtn:focus {
  transform: scale(1.2);
}
#sidenav .sidenav-account {
  font-size: 1.2rem;
  cursor: unset;
  margin-top: -20px;
  color: #818181;
}
#sidenav .sidenav-account:hover,
#sidenav .sidenav-account:focus {
  color: #818181;
}
</style>