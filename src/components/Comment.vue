<template>
  <ul class="commentArea collection with-header">
    <li class="collection-header">
      <h6>Comment</h6>
    </li>
    <form class="col s12" @submit.prevent="saveComment(inputComment)">
      <div class="row" style="margin-bottom: -1.5rem">
        <div class="input-field col s12 comment-container">
          <input type="text" v-model="inputComment" placeholder="Add comment" class="comment-input">
          <!-- <i
            class="small material-icons submit-button prefix"
            @click="saveComment(inputComment)"
          >edit</i>-->
          <i
            class="small material-icons submit-button prefix"
            @click="saveComment(inputComment)"
          >add</i>
        </div>
      </div>
    </form>
    <!-- <form class="col s12" @submit.prevent="saveComment(inputComment)">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix">mode_edit</i>
                    <textarea id="icon_prefix2" class="materialize-textarea" v-model="inputComment"></textarea>
                </div>
                <div class="input-field col s6">
                    <button type="submit" class="btn">Comment</button>
                </div>
            </div>
    </form>-->
    <li class="collection-item" v-for="comment in orderedComments" :key="comment.id">
      <span v-if="user != comment.author">
        <p class="comment-author">{{comment.author}}</p>
        <p class="bull">&bull;</p>
        <p class="comment-date">{{comment.date}}</p>
        <p class="comment-content">{{comment.content}}</p>
      </span>
      
      <span v-if="user === comment.author">
        <!-- <span>
          <i
            class="material-icons right"
            style="margin-top:13px; font-size:1rem"
            @click="deleteComment(comment.id)"
          >delete</i>
        </span>-->
        <p class="comment-author">{{comment.author}}</p>
        <p class="bull">&bull;</p>
        <p class="comment-date">{{comment.date | getDate }}</p>
        <p class="comment-remove" @click="deleteComment(comment.id)">Remove</p>
        <p class="comment-content">{{comment.content}}</p>
      </span>
      <!-- <form v-if="user === comment.author" class="col s12" @submit.prevent="editComment(inputComment, comment.id)">
                <div class="row">
                    <div class="input-field col s6">
                    <textarea id="icon_prefix2" class="materialize-textarea" v-model="inputComment" :placeholder="comment.content"></textarea>
                    </div>
                    <div class="input-field col s6">
                        <button type="submit" class="btn">Edit</button>
                        <button class="btn">Delete</button>
                    </div>
                </div>
      </form>-->
    </li>
  </ul>
</template>

<script>
import _ from "lodash";
import { db, auth } from "@/firebase/init";

export default {
  name: "Comment",
  data() {
    return {
      user: auth.currentUser.email,
      inputComment: "",
      comments: [],
      noteId: this.$route.params.noteId
    };
  },
  computed: {
    orderedComments: function() {
      return _.orderBy(this.comments, "date", "desc");
    }
  },
  created() {
    let self = this;
    db.collection("comments")
      .where("noteId", "==", self.noteId)
      .onSnapshot(function(querySnapshot) {
        self.comments = [];
        querySnapshot.forEach(function(doc) {
          self.comments.push({
            author: doc.data().author,
            content: doc.data().content,
            noteId: doc.data().noteId,
            id: doc.id,
            date: doc.data().date
          });
        });
      });
  },
  methods: {
    saveComment(input) {
      let self = this;
      if (self.inputComment.trim().length == 0) {
        return;
      }

      db.collection("comments").add({
        author: self.user,
        content: input,
        noteId: self.noteId,
        date: new Date().toLocaleString()
      });

      self.inputComment = "";
    },
    editComment(input, id) {
      db.collection("comments")
        .doc(id)
        .update({
          content: input,
          date: new Date().toLocaleString()
        });
    },
    deleteComment(id) {
      let self = this;
      db.collection("comments")
        .doc(id)
        .delete()
        .then(function() {
          self.$toasted.show("Comment Been Removed Successfully.", {
            theme: "toasted-primary",
            position: "top-center",
            duration: 1500
          });
        });
    }
  }
};
</script>

<style scoped>
.commentArea {
  margin-top: 1rem;
  margin-bottom: 2.8rem;
  background-color: #fff;
  border: none;
  border-radius: 3px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.input-field {
  margin-top: 0px;
}
h6 {
  font-weight: 600;
  color: #eb8d21;
}
.collection.with-header .collection-header {
  border-bottom: unset;
}
.comment-container {
  padding: 1rem 3rem 1rem 2.6rem;
}

::placeholder {
  font-family: "Raleway", sans-serif;
  font-size: 0.8rem;
}

input.comment-input {
  border: 1px solid #f1f1f1;
  padding: 2px 0px 2px 8px;
  border-radius: 2px;
}

input.comment-input[type="text"]:focus {
  border: 1px solid #d3d3d3;
  box-shadow: none;
  height: 5rem;
}

input.comment-input[type="text"]:focus ~ .prefix {
  top: 3.2rem;
}

i.submit-button {
  color: rgba(0, 0, 0, 0.2);
  transition: all linear 200ms;
  cursor: pointer;
  font-size: 1.5rem;
}
i.submit-button:hover,
i.submit-button:focus {
  color: rgba(0, 0, 0, 0.7);
  color: #eb8d21;
}
.input-field .prefix {
  top: 2rem;
  right: 1.8rem;
}

.input-field .prefix.active {
  color: rgba(0, 0, 0, 0.7);
  color: #eb8d21;
}

p.comment-author {
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  color: #86addd;
}

p.comment-date {
  font-size: 0.7rem;
  /* color: #86addd; */
  display: inline-block;
  color: rgba(0, 0, 0, 0.6);
}

p.bull {
  display: inline-block;
  color: #ddd;
  margin-right: 0.3rem;
  margin-left: 0.3rem;
}

p.comment-remove {
  font-size: 0.8rem;
  color: #ddd;
  display: inline-block;
  float: right;
  cursor: pointer;
  transition: all linear 0.2s;
}

p.comment-remove:hover,
p.comment-remove:focus {
  color: rgba(0, 0, 0, 0.7);
}

.collection.with-header .collection-item {
  padding-left: 30px;
}
.collection .collection-item {
  padding: 10px 25px 15px 25px;
  border-bottom: 1px solid #f1f1f1;
}

p.comment-content {
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.9rem;
}

@media screen and (max-width: 420px) {
  .commentArea {
    margin-bottom: 0.3rem;
  }
  p.comment-remove {
    margin-bottom: 0;
    margin-top: 1.1rem;
  }
}
</style>
