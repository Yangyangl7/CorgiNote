<template>
  <div class="note">
    <div class="note-container">
      <div v-if="note">
        <!-- <div class="form-group noteTitle"> -->
        <!-- <input class="form-control inputTitle" type="text" v-model="note.title" placeholder="Title"> -->
        <!-- </div> -->
        <ul class="note-btns">
          <li>
            <router-link :to="{name: 'UploadPage', params: {courseId:courseId}}">&#8592; Back</router-link>
          </li>
          <li @click="removeNote()">Remove</li>
          <li @click="saveNote()">Save</li>
        </ul>

        <div class="form-group textfield">
          <!-- <textarea class="form-control" v-model="note.content" placeholder="Content"></textarea> -->
          <quill-editor
            v-model="note.content"
            style="height:100%;"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
        </div>
        <!-- <div class="form-group">
        <textarea class="form-control" v-model="note.date" placeholder="Date"></textarea>
        </div>-->
        <!-- <p> {{note.date.toDate()}}</p> -->
        <!-- <button class="btn btn-danger" @click="removeNote()">Remove</button>
        <button class="btn btn-success" @click="saveNote()">Save</button>-->
        <photo-easy :note="note"/>
        <Comment></Comment>
      </div>
      <div v-else>
        <h5>Please create new Note...</h5>
      </div>
      <br>
      <!-- <router-link
        :to="{name: 'UploadPage', params: {courseId:courseId}}"
        tag="button"
      >Return to Note List</router-link>-->
    </div>
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
import Comment from "./Comment.vue";

const noteCollection = db.collection("notes");

export default {
  name: "Note",
  components: {
    PhotoEasy,
    quillEditor,
    Comment
  },
  props: ["note", "noteId", "courseId"],
  data() {
    return {
      content: "<h2>I am Example</h2>",
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image"]
          ]
        }
      }
    };
  },
  methods: {
    saveNote() {
      // this.note.imgUrls=[];
      this.note.courseId = this.courseId;
      this.note.userId = auth.currentUser.uid;
      // this.note.date = firebase.firestore.FieldValue.serverTimestamp();
      this.note.date = new Date().toLocaleString();
      const note = this.note;
      if (note.id) {
        this.updateNote(note);
      } else {
        this.createNote(note);
      }

      this.$toasted.show("Note Has Been Saved Successfully.", {
        theme: "toasted-primary",
        position: "top-center",
        duration: 1500
      });
    },
    updateNote(note) {
      noteCollection.doc(note.id).update({
        // title: note.title,
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
      if (confirm("Are you sure to remove this note?")) {
        const id = this.note.id;
        noteCollection.doc(id).delete();

        this.$toasted.show("Note Has Been Removed Successfully.", {
          theme: "toasted-primary",
          position: "top-center",
          duration: 1500
        });
      } else {
        return;
      }
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
  /* background-color: #f9f9f9; */
  background-color: #fafafa;
}

a {
  color: rgba(0, 0, 0, 0.7);
}

.note-container {
  padding: 10px 60px;
  width: 80%;
  margin: auto;
  /* background-color: #fff; */
}

@media screen and (max-width: 420px) {
  .note-container {
    /* margin: 20px; */
    padding: 10px;
    width: 100%;
    margin: auto;
  }
}
.textfield {
  height: 82vh;
  margin-bottom: 0.8rem;
  /* overflow: scroll; */
  background-color: #fff;
  border: none;
  border-radius: 3px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);

  /* margin-bottom: 1px solid #ddd; */
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

.note-btns {
  display: inline-block;
}

.note-btns li {
  display: inline-block;
  margin-right: 1rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  transition: all linear 0.2s;
  cursor: pointer;
}
.note-btns li:hover,
.note-btns li:focus {
  color: #eb8d21;
}

.note-btns li a {
  transition: all linear 0.2s;
  cursor: pointer;
}

.note-btns li a:hover,
.note-btns li a:focus {
  color: #eb8d21;
}
</style>
