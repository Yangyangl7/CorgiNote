<template>
    <div id="upload">
        <div style="color: blue;">
            <h1>Personal Note App</h1>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <NotesList 
                  @app-addNote="addNote"
                  @app-changeNote="changeNote"
                  :notes="notes"
                  :activeNote="index" />
            </div>
            <div class="col-sm-6">
                <Note
                  @app-saveNote="saveNote"
                  @app-removeNote="removeNote"
                  :note="notes[index]" />
                  <!-- <photo /> -->
            </div>
        </div>
    </div>
</template>
<script src="https://www.gstatic.com/firebasejs/5.5.6/firebase.js"></script>
<script>
import NotesList from "../components/NotesList.vue";
import Note from "../components/Note.vue";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"
import PhotoEasy from '../components/PhotoEasy.vue';
import {db} from '../firebase/init'



//enable offline mode
db.enablePersistence();

const noteCollection = db.collection("notes");


var unsubscribe;

export default {
  name: "UploadPage",
  components: {
    NotesList,
    Note,
    PhotoEasy
  },
  data: () => ({
    notes: [],
    index: 0
  }),
  methods: {
    addNote() {
      this.notes.push({
        title: "",
        content: "",
        date:"",
        imgUrls:[]
      });
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
        imgUrls:note.imgUrls
      });
    },
    createNote(note) {
      noteCollection.add(note);
    },
    removeNote() {
      const id = this.notes[this.index].id;
      noteCollection.doc(id).delete();
    }
  },
  created() {
    noteCollection.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.notes.push({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          date: doc.data().date,
          imgUrls:doc.data().imgUrls
        });
      });
    });

    

    

    unsubscribe = noteCollection.onSnapshot(snapshot => {
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



          console.log("note was updated: ", updatedNote);
        }
        if (change.type === "removed") {
          const deletedNote = this.notes.find(
            note => note.id === change.doc.id
          );
          console.log("note was removed: ", deletedNote);

          const index = this.notes.indexOf(deletedNote);
          this.notes.splice(index, 1);
          this.index = this.index === 0 ? 0 : index - 1;
        }
      });
    });
  },
  destroyed() {
    unsubscribe();
  }
};
</script>

<style>
#upload {
  text-align: center;
  max-width: 700px;
}
</style>