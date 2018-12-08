<template>

    <ul class="commentArea collection with-header">
        <li class="collection-header"><h4>Comment Area</h4></li>
        <form class="col s12" @submit.prevent="saveComment(inputComment)">
            <div class="row" style="margin-bottom: -1.5rem">
              <div class="input-field col s12 comment-container">
                <input
                  type="text"
                  v-model="inputComment"
                  placeholder="Add comment"
                  @keyup.enter="saveComment(inputComment)"
                >
                <i class="small material-icons submit-button prefix" @click="saveComment(inputComment)">edit</i>
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
        </form> -->
        <li class="collection-item" v-for="comment in orderedComments" :key="comment.id">
            <!-- <h5 v-if="user != comment.author">{{comment.content}}</h5> -->
            <h6>{{comment.author}}</h6>
            <h5>{{comment.content}}</h5>
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
            </form> -->
        </li>
    </ul>
            
</template>

<script>
import _ from "lodash";
import { db, auth} from "@/firebase/init";

export default {
    name: "Comment",
    data () {
        return {
            user: auth.currentUser.email,
            inputComment: "",
            comments:[],
            noteId: this.$route.params.noteId,
        }
    },
    computed: {
        orderedComments: function() {
            return _.orderBy(this.comments, "date", "desc");
        }
    },
    created () {
        let self = this;
        db
        .collection("comments")
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
                })
            })
        });
    },
    methods: {
        saveComment(input) {
            let self = this;

            db
            .collection("comments")
            .add({
                author: self.user,
                content: input,
                noteId: self.noteId,
                date: new Date().toLocaleString()
            })
        },
        editComment(input, id) {
            db
            .collection("comments")
            .doc(id)
            .update({
                content: input,
                date: new Date().toLocaleString()
            })
        },
        deleteComment(id) {
            db.collection("comments")
            .doc(id)
            .delete()
            .then(function() {
                self.$toasted.show("Success Delete", { 
                    theme: "outline", 
                    position: "top-center", 
                    duration : 1500
                });
            })
        }
    }
}
</script>

<style scoped>

.commentArea{
    width: 75%;
    margin: 10px auto;
    border: 2px solid black;
    border-radius: 25px;
}

.comment-container {
  padding: 1rem 10rem;
}

</style>
