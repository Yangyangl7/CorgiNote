<template>
  <div class="errorPage">
    <div class="container">
      <img src="@/assets/error.png" alt="404 error icon" height="300">
      <h3>Ooops!</h3>
      <h6>Corgi can't find the page you are looking for.</h6>
      <br>
      <a class="waves-effect waves-light btn">
        <router-link :to="{ name: 'Signup' }">Back To Signup</router-link>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage"
};
</script>

<style scoped>
.container {
  text-align: center;
}
img {
  margin-top: 2.6rem;
  margin-bottom: -1rem;
}
a {
  color: #fff;
}
.btn {
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.9);
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
}
.btn:hover,
.btn:focus {
  background-color: #e0903e;
}
</style>

