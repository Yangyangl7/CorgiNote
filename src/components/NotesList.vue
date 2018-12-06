<template>
  <div class="container">
    <div>
      <img class="corgi-courses" src="@/assets/newNote.png" alt="new note icon" width="220">
      <div class="row">
        <div class="col s12">
          <h5>{{ courseInfo.label }} {{ courseInfo.name }}</h5>
          <h6>Start to capture ideas and inspiration in notes</h6>
        </div>
      </div>
    </div>
    <div class="col s12">
      <div class="centerText">
        <!-- <h3>Note-List</h3> -->
      </div>
      <ul class="collection">
        <li
          class="collection-item"
          v-for="(note, index) in notes"
          :key="note.index"
          :class="{ 'active': index === activeNote}"
          @click="changeNote(index)"
        >
          <router-link
            :to="{name: 'Note', params: {note: note,noteId:index,courseId:note.courseId}}"
          >{{ note.title }}</router-link>
        </li>
      </ul>
      <router-link
        :to="{name: 'Note', params: {note: {imgUrls:[]},noteId:notes.length,courseId:this.$route.params.courseId}}"
        tag="button"
        class="btn btn-info"
      >+ Note</router-link>

      <div class="newBtn">
        <router-link
          :to="{name: 'Note', params: {note: {imgUrls:[]},noteId:notes.length,courseId:this.$route.params.courseId}}"
          class="btn waves-effect waves-light btn-course"
        >
          <i class="material-icons left" style="font-size:1rem">add</i>Create New Note
        </router-link>
      </div>

      <!-- <button @click="addNote()" class="btn btn-info">+ Note</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteList",
  props: ["notes", "activeNote", "courseId", "courseInfo"],
  methods: {
    changeNote(index) {
      this.$emit("app-changeNote", index);
    },
    addNote() {
      this.$emit("app-addNote");
    }
  }
};
</script>

<style scoped>
.list {
  margin: 20px;
}

.container {
  text-align: center;
}

.corgi-courses {
  margin-top: 2.2rem;
}

h5 {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 2.2rem;
  margin-bottom: 1.2rem;
  letter-spacing: 0.9px;
  background-color: rgba(241, 211, 159, 0.6);
  width: 24rem;
  margin-left: auto;
  margin-right: auto;
}
h6 {
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: 0.5px;
  margin: 1.8rem 0 2.8rem 0;
  font-size: 1.5rem;
}

.newBtn {
  margin: 10px auto;
  width: 50%;
}
.btn-course {
  position: fixed;
  color: #fff;
  left: 50%;
  /* margin-left: -99px; */
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.9);
  text-transform: unset;
  padding: 5px 16px;
  height: 46px;
  bottom: 9.5rem;
  transition: all linear 200ms;
}

.btn-course:focus,
.btn-course:hover {
  background-color: #e0903e;
}

.centerText {
  margin: auto;
  width: fit-content;
}
</style>
