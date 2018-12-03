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
  position: absolute;
  width: 40rem;
  bottom: 5px;
  left: 50%;
  margin-left: -11rem;
  color: rgba(0, 0, 0, 0.3);
}
@media screen and (min-width: 1200px) {
  .container p {
    font-size: 14px;
  }
}
@media screen and (min-width: 1992px) {
  .container p {
    font-size: 13px;
  }
}
@media screen and (min-width: 0) {
  .container p {
    font-size: 12px;
  }
}
</style>