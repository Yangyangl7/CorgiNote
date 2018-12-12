<template>
  <div class="note">
    <div class="note-container">
      <div class="note-btns">
        <router-link :to="{name: 'SharedNoteList'}">&#8592; Back</router-link>
      </div>
      <!-- <h5 class="title">{{this.title}}</h5> -->
      <div class="form-group textfield">
        <quill-editor
          v-model="content"
          style="height:100%;"
          ref="myQuillEditor"
          :options="editorOption"
          :disabled="disabled"
        ></quill-editor>
      </div>
      <!-- <h5 class="content">{{this.content}}</h5> -->
       <photo-easy :note="note"/>
      <Comment></Comment>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/init";

import PhotoEasy from "../components/PhotoEasy.vue";

import Comment from "../components/Comment.vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "CommentNotePage",
  components: {
    PhotoEasy,
    Comment,
    quillEditor
  },
  data() {
    return {
      content: "<h2>I am Example</h2>",
      note: this.$route.params.note,
      noteId: this.$route.params.noteId,
      courseId: this.$route.params.courseId,
      editorOption: {
        // some quill options
        modules: {
          toolbar: false
        }
      },
      disabled: ""
    };
  },
  created() {
    this.getNote();
    // var quill = new Quill(".textfield", {
    //   modules: {
    //     toolbar: [
    //       [{ header: [1, 2, false] }],
    //       ["bold", "italic", "underline"],
    //       ["image", "code-block"]
    //     ]
    //   },
    //   placeholder: "Compose an epic...",
    //   theme: "snow" // or 'bubble'
    // });
    // quill.enable(false);
  },
  methods: {
    getNote() {
      let self = this;
      db.collection("notes")
        .doc(this.noteId)
        .get()
        .then(function(doc) {
          self.content = doc.data().content;
          //   self.title = doc.data().title;
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
.title {
  text-align: center;
}

.content {
  text-align: center;
  margin-bottom: 25px;
}

.note {
  background-color: #fafafa;
  height: 100%;
}

a {
  color: rgba(0, 0, 0, 0.7);
}

.note-container {
  padding: 10px 60px 0 60px;
  width: 80%;
  margin: auto;
  /* background-color: #fff; */
}

.textfield {
  height: 100%;
  margin-top: 1rem;
  margin-bottom: 0.8rem;
  /* overflow: scroll; */
  background-color: #fff;
  border: none;
  border-radius: 3px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  /* pointer-events: none !important; */
  /* margin-bottom: 1px solid #ddd; */
}

.note-btns {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1.2rem;
}

.note-btns a {
  transition: all linear 0.2s;
}

.note-btns a:hover,
.note-btns a:focus {
  /* color: #eb8d21; */
  color: #86addd;
}

@media screen and (max-width: 900px) {
  .note-container {
    padding: 10px 10px;
    width: 90%;
  }
}

@media screen and (max-width: 540px) {
  .textfield {
    /* height: 88vh; */
  }
}

@media screen and (max-width: 420px) {
  .note-container {
    /* margin: 20px; */
    padding: 10px;
    width: 100%;
    margin: auto;
  }
  .commentArea {
    margin-bottom: 0.3rem;
  }
}

@media screen and (max-width: 370px) {
  .textfield {
    /* height: 92vh; */
  }
}
</style>

