<template>
  <div class="footer">
    <div class="container">
      <p>Built by Mooncake. © 2018 Corgi Note. All rights reserved.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.container p {
  position: fixed;
  width: 40rem;
  bottom: 2px;
  left: 50%;
  margin-left: -20rem;
  color: rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 12px;
}

@media screen and (min-width: 0) {
  .container p {
    display: none;
  }
}

@media screen and (min-width: 600px) {
  .container p {
    display: block;
  }
}

@media screen and (min-width: 992px) {
  .container p {
    display: block;
  }
}

@media screen and (min-width: 1200px) {
  .container p {
    display: block;
  }
}
</style>