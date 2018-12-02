<template>
  <div class="logIn">
    <div class="container">
      <img src="@/assets/login.png" alt="login icon" height="300">
    </div>
    <p>this is the log in page</p>
  </div>
</template>

<script>
export default {
  name: "Login",
  created() {
    this.$refs.sidenav.style.width = "0";
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}
</style>