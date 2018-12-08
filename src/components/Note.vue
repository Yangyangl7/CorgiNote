<template>
  <div class="note" >
    <div v-if="note">
      <div class="form-group noteTitle">
        <input class="form-control inputTitle" type="text" v-model="note.title" placeholder="Title">
      </div>
      <div class="form-group textfield">
        <!-- <textarea class="form-control" v-model="note.content" placeholder="Content"></textarea> -->
        <quill-editor v-model="note.content" style = "height:100%" ref="myQuillEditor" :options="editorOption"></quill-editor>
      </div>
      <!-- <div class="form-group">
        <textarea class="form-control" v-model="note.date" placeholder="Date"></textarea>
      </div> -->
      <!-- <p> {{note.date.toDate()}}</p> -->


      <button class="btn btn-danger" @click="removeNote()">Remove</button>
      <button class="btn btn-success" @click="saveNote()">Save</button>
      <photo-easy :note="note"/>


    </div>
    <div v-else>
      <h5>Please create new Note...</h5>
    </div>
    <br>
    <router-link
      :to="{name: 'UploadPage', params: {courseId:courseId}}"
      tag="button"
    >Return to Note List</router-link>
  </div>
</template>

<script>
import PhotoEasy from "./PhotoEasy.vue";
import "firebase/firestore";
import firebase from "firebase/app";

import { db, auth } from "@/firebase/init";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

const noteCollection = db.collection("notes");

export default {
  name: "Note",
  components: {
    PhotoEasy,
    quillEditor
  },
  props: ["note", "noteId", "courseId"],
  data() {
    return {
      content: "<h2>I am Example</h2>",
      editorOption: {
        // some quill options
      }
    };
  },
  methods: {
    saveNote() {
      // this.note.imgUrls=[];
      this.note.courseId = this.courseId;
      this.note.userId = auth.currentUser.uid;
      this.note.date=firebase.firestore.FieldValue.serverTimestamp();
      const note = this.note;
      if (note.id) {
        this.updateNote(note);
      } else {
        this.createNote(note);
      }

      self.$toasted.show("Photo Success Saved", { 
            theme: "outline", 
            position: "top-center", 
            duration : 1500
      });
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
    removeNote() {
      const id = this.note.id;
      noteCollection.doc(id).delete();

      self.$toasted.show("Photo Success Removed", { 
            theme: "outline", 
            position: "top-center", 
            duration : 1500
      });
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  }
};
</script>

<style scoped>

.note {
  /* margin: 20px; */
  padding:20px;
  width: 80%;
  margin:  auto;
}

@media screen and (max-width: 420px) {
  .note {
    /* margin: 20px; */
    padding:10px;
    width: 100%;
    margin:  auto;
  }
}
.textfield {
  height: 80vh;
  margin-bottom: 20px;
  overflow: hidden;
  margin-bottom: 1px solid #ddd;
}

.noteTitle {
  margin-bottom: 25px;
}

.inputTitle {
  font-weight: bold;
  font-size: 32px;
  font-family: fantasy;
  letter-spacing: 2px;
  text-align: center;
}
</style>
