<template>
   <div class="note">
        <div v-if="note">
            <h3>Note</h3>
            <div class="form-group">
                <input class="form-control" type="text" v-model="note.title" placeholder="Title" />
            </div>
            <div class="form-group">
                <!-- <textarea class="form-control" v-model="note.content" placeholder="Content"></textarea> -->
                <quill-editor v-model="note.content"
                ref="myQuillEditor"
                :options="editorOption"
                >
            </quill-editor>
            </div>
            <div class="form-group">
                <textarea class="form-control" v-model="note.date" placeholder="Date"></textarea>
            </div>
            <photo-easy   :note="note"/>

            <button class="btn btn-danger" @click="removeNote()">Remove</button>
            
            <button class="btn btn-success" @click="saveNote()">Save</button>
        </div>
        <div v-else>
            <h5>Please create new Note...</h5>
        </div>
         <br>
       <router-link :to="{name: 'UploadPage', params: {courseId:courseId}}" tag="button">Return to Note List</router-link>
         
    </div> 
</template>

<script>
import PhotoEasy from './PhotoEasy.vue';
import "firebase/firestore";
import { db,auth } from '@/firebase/init';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

const noteCollection = db.collection("notes");

export default {
  name: "Note",
  components: {
    PhotoEasy,
    quillEditor
  },
  props: ["note","noteId","courseId"],
  data () {
      return {
        content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
        }
      }
    },
  methods: {
    saveNote() {
      // this.note.imgUrls=[];
      this.note.courseId=this.courseId;
      this.note.userId=auth.currentUser.uid;
      const note=this.note;
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
        imgUrls:note.imgUrls,
        courseId:note.courseId
      });
    },
    createNote(note) {
      noteCollection.add(note);
    },
    removeNote() {
      const id = this.note.id;
      noteCollection.doc(id).delete();
    }
  },
  computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  }
};
</script>

<style>
.note {
  margin: 20px;
}
</style>