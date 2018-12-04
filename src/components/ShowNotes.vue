<template>
    <div class="col s12 m8 l9">
        <div class = "centerText">
          <h3>Note-List</h3>
        </div>
        <ul class="collection" >
            <li class="collection-item"
                v-for="(note, index) in notes"
                :key="note.index"
                >
                <div>{{ note.title }}</div>
            </li>
        </ul>

        <div style = "margin: auto; width: fit-content">
        <router-link :to="{ name: 'UploadPage', params: {courseId: this.$route.params.courseId} }" class="btn-note">
          <button  class="btn btn-info" >+ Note</button>
        </router-link>
        </div>

    </div>
</template>

<script>
export default {
  name: "ShowNotes",
  props: {
    notes: {
      type: Array,
      default: null
    },
    courseName: {
      type: String,
      default: null
    }
  },
};
</script>

<style>
.list {
  margin: 20px;
}

.centerText {
  margin: auto;
  width:fit-content
}
</style>
