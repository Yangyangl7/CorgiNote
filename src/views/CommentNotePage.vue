<template>
    <div class="container">
        <div class="noteInfo">
            <h5 class="title">{{this.title}}</h5>
            <h5 class="content">{{this.content}}</h5>
        </div>
        <Comment :noteId1="this.$route.params.noteId"></Comment>
    </div>
</template>

<script>
import { db } from "@/firebase/init";

import Comment from '../components/Comment.vue'

export default {
    name: "CommentNotePage",
    components: {
        Comment
    }, 
    data () {
        return {
            content: "",
            title:"",
            noteId: this.$route.params.noteId,
            courseId: this.$route.params.courseId
        }
    },
    created () {
        this.getNote();
    },
    methods: {
        getNote() {
            let self = this;
            db
            .collection("notes")
            .doc(this.noteId)
            .get()
            .then(function(doc) {
                self.content= doc.data().content;
                self.title = doc.data().title
            })
        }
    }
}
</script>

<style scoped>
.container{
    margin-top: 25px;
    margin-bottom: 50px;
    margin-left: auto;
    margin-right: auto;
    width:100%;
}

.title {
   text-align: center;
}

.content {
    text-align: center;
    margin-bottom: 25px;
}

</style>

