<template>
  <div class="container">
    <div v-if="notes.length === 0">
      <img class="corgi-courses" src="@/assets/newNote.png" alt="new note icon" width="220">
      <div class="row">
        <div class="col s12">
          <h5>{{ courseInfo.label }} {{ courseInfo.name }}</h5>
          <h6>Start to capture ideas and inspiration in notes</h6>
        </div>
      </div>
      <div class="newBtn">
        <router-link
          :to="{name: 'Note', params: {note: {imgUrls:[],title:'',content:''},noteId:notes.length,courseId:this.$route.params.courseId,newlyCreated:true}}"
          class="btn waves-effect waves-light btn-course"
        >
          <i class="material-icons left" style="font-size:1rem">add</i>Create New Note
        </router-link>
      </div>
    </div>
    <div class="col s12">
      <!-- <div class="centerText"> -->
      <!-- <h3>Note-List</h3> -->
      <!-- </div> -->
      <div v-if="notes.length !== 0">
        <h5 class="course-note">{{ courseInfo.label }} {{ courseInfo.name }}</h5>
        <div class="note-container col s12 m6 l6" v-for="(note, index) in notes" :key="note.index">
          <ul class="card">
            <li
              class="card-content"
              :class="{ 'active': index === activeNote}"
              @click="changeNote(index)"
            >
              <span class="dot"></span>
              <span class="remove" @click="removeNote(note.id)">&times;</span>
              <router-link
                :to="{name: 'Note', params: {note: note,noteId:note.id,courseId:note.courseId,newlyCreated:false}}"
              >
                <!-- <div class="note-title">{{ note.title | titleSnippet }}</div> -->
                <div class="note-title">{{ note.content | getText | titleSnippet }}</div>
                <div class="note-date">{{ note.date | getDate }}</div>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="newBtn">
          <router-link
            :to="{name: 'Note', params: {note: {imgUrls:[],title:'',content:''},noteId:notes.length,courseId:this.$route.params.courseId,newlyCreated:true}}"
            class="btn waves-effect waves-light btn-course btn-round"
          >
            <i class="material-icons" style="font-size:1.2rem">add</i>
          </router-link>
        </div>
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
    },
    removeNote(id) {
      this.$emit("app-removeNote", id);
    }
  }
};
</script>

<style scoped>
.list {
  margin: 20px;
}

a {
  color: rgba(0, 0, 0, 0.8);
}

.container {
  text-align: center;
}

.corgi-courses {
  margin-top: 4.2rem;
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
  padding: 0.6rem 1.5rem;
}

h5.course-note {
  margin-top: 2rem;
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
  padding: 5px 20px;
  height: 46px;
  bottom: 9.5rem;
  transition: all linear 200ms;
  z-index: 3;
}

.btn-course:focus,
.btn-course:hover {
  background-color: #e0903e;
}

.btn-round {
  border-radius: 50%;
  box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.14);
  bottom: 5.5rem;
  height: 50px;
  padding: 6px 16px 5px 16px;
}

.centerText {
  margin: auto;
  width: fit-content;
}

.note-container {
  text-align: left;
}

.card {
  box-shadow: unset;
  border-radius: 3px;
  background-color: #f7f7f7;
  border: 1.5px solid #f7f7f7;
  transition: all linear 0.2s;
  z-index: 2;
}
.card:hover,
.card:focus {
  background-color: #fff;
  border: 1.5px solid #eb8d21;
}

.card .card-content {
  padding: 18px 24px;
  line-height: 1.8rem;
}

.note-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.note-date {
  color: rgba(0, 0, 0, 0.4);
  margin-top: 0.7rem;
}

.dot {
  height: 1rem;
  width: 1rem;
  background-color: #fff;
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0.8rem;
  top: 0.6rem;
  transition: all linear 0.2s;
  cursor: pointer;
}
.remove {
  position: absolute;
  right: 1rem;
  top: 0.1rem;
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.card:hover .dot,
.card:focus .dot {
  background-color: #eb8d21;
}

.card:hover .remove,
.card:focus .remove {
  color: #fff;
}

@media screen and (max-width: 600px) {
  .btn-course {
    bottom: 5.8rem;
  }
  h5 {
    font-size: 1.4rem;
    width: 22rem;
  }
  h6 {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 420px) {
  .btn-course {
    bottom: 2.8rem;
    font-size: 0.8rem;
  }
  img {
    width: 160px;
  }
  .corgi-courses {
    margin-top: 3.5rem;
  }
  h5 {
    font-size: 1.1rem;
    width: 18rem;
    line-height: 1.5rem;
  }
  h6 {
    line-height: 1.7rem;
    font-size: 1rem;
  }

  h5.course-note {
    width: 20rem;
  }

  .note-title {
    font-size: 1rem;
  }
  .note-date {
    font-size: 0.8rem;
  }
}

@media screen and (max-width: 320px) {
  .corgi-courses {
    margin-top: 2rem;
  }
  img {
    width: 120px;
  }
  h5 {
    margin-top: 1.2rem;
    font-size: 1rem;
    width: 15rem;
  }
  .btn-course {
    bottom: 1.8rem;
  }
  h5.course-note {
    width: 18rem;
  }
  .note-title {
    font-size: 1rem;
  }
  .note-date {
    font-size: 0.8rem;
  }
}
</style>
