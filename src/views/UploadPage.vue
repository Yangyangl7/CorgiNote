<template>
  <div id="upload">
    <div style="color: blue;"></div>
    <div class="row">
      <div class="col s12">
        <NotesList
          @app-addNote="addNote"
          @app-changeNote="changeNote"
          @app-removeNote="removeNote"
          :notes="notes"
          :courseId="this.$route.params.courseId"
          :activeNote="index"
          :courseInfo="courseInfo"
          :newNotes="newNotes"
        />
      </div>
      <!-- <div class="col-sm-6"> -->
      <!-- <Note
                  @app-saveNote="saveNote"
                  @app-removeNote="removeNote"
      :note="notes[index]" />-->
      <!-- </div> -->
    </div>
  </div>
</template>
<script src="https://www.gstatic.com/firebasejs/5.5.6/firebase.js"></script>
<script>
import NotesList from "../components/NotesList.vue";
import Note from "../components/Note.vue";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import PhotoEasy from "../components/PhotoEasy.vue";
import { db, auth } from "../firebase/init";

//enable offline mode
//db.enablePersistence();

const noteCollection = db.collection("notes");

var unsubscribe;

export default {
  name: "UploadPage",
  props: ["courseName"],
  components: {
    NotesList,
    Note,
    PhotoEasy
  },
  data: () => ({
    notes: [],
    index: 0,
    user: auth.currentUser.email,
    courseInfo: [],
    newNotes: []
  }),
  methods: {
    addNote() {
      this.notes.push({
        title: "",
        content: "",
        date: "",
        imgUrls: [],
        courseId: this.$route.params.courseId
      });
      // console.log(this.courseId);
      this.index = this.notes.length - 1;
    },
    changeNote(index) {
      this.index = index;
    },
    saveNote() {
      const note = this.notes[this.index];
      if (note.id) {
        this.updateNote(note);
      } else {
        this.createNote(note);
      }
    },
    updateNote(note) {
      noteCollection.doc(note.id).update({
        title: note.title,
        content: note.content,
        date: note.date,
        imgUrls: note.imgUrls,
        courseId: note.courseId
      });
    },
    createNote(note) {
      noteCollection.add(note);
    },
    removeNote(id) {
      // const id = this.notes[this.index].id;
      noteCollection
        .doc(id)
        .delete()
        .then(() => {
          this.newNotes = this.newNotes.filter(note => {
            return note.id != id;
          });
        });
    }
  },
  created() {
    noteCollection
      .where("courseId", "==", this.$route.params.courseId)
      .where("userId", "==", auth.currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.notes.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            date: doc.data().date,
            imgUrls: doc.data().imgUrls,
            courseId: doc.data().courseId
          });
          this.newNotes.push({
            id: doc.id,
            title: doc.data().title,
            content: doc.data().content.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, ""),
            date: doc.data().date,
            imgUrls: doc.data().imgUrls,
            courseId: doc.data().courseId
          });
        });
      });

    // Get Course Info
    let self = this;
    db.collection("users")
      .doc(self.user)
      .collection("courses")
      .doc(self.$route.params.courseId)
      .get()
      .then(doc => {
        if (doc.exists) {
          self.courseInfo = doc.data();
        } else {
          console.log("No such doc!");
        }
      });

    unsubscribe = noteCollection
      .where("courseId", "==", this.$route.params.courseId)
      .where("userId", "==", auth.currentUser.uid)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const note = { ...change.doc.data(), id: change.doc.id };
            console.log("note was added: ", note);

            this.notes[this.notes.length - 1] = note;
          }
          if (change.type === "modified") {
            const updatedNote = this.notes.find(
              note => note.id === change.doc.id
            );
            updatedNote.title = change.doc.data().title;
            updatedNote.content = change.doc.data().content;
            updatedNote.date = change.doc.data().date;
            updatedNote.imgUrls = change.doc.data().imgUrls;
            updatedNote.courseId = change.doc.data().courseId;

            console.log("note was updated: ", updatedNote);
          }
          if (change.type === "removed") {
            // const deletedNote = this.notes.find(
            //   note => note.id === change.doc.id
            // );
            // console.log("note was removed: ", deletedNote);

            // const index = this.notes.indexOf(deletedNote);
            // this.notes.splice(index, 1);
            // this.index = this.index === 0 ? 0 : index - 1;

            this.newNotes = this.newNotes.filter(note => {
              return note.id != change.doc.id;
            });
          }
        });
      });
  },
  destroyed() {
    unsubscribe();
  }
};
</script>

<style scoped>
#upload {
  text-align: center;
  /* max-width: 700px; */
}
</style>