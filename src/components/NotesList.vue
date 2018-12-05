<template>
    <div class="col s12 m8 l9">
        <div class = "centerText">
          <!-- <h3>Note-List</h3> -->
        </div>
        <ul class="collection">
            <li class="collection-item"
                v-for="(note, index) in notes"
                :key="note.index"
                :class="{ 'active': index === activeNote}"
                @click="changeNote(index)"
                >
                                <router-link :to="{name: 'Note', params: {note: note,noteId:index,courseId:note.courseId}}">{{ note.title }}</router-link>

            </li>
        </ul>
        <router-link :to="{name: 'Note', params: {note: {imgUrls:[]},noteId:notes.length,courseId:this.$route.params.courseId}}" tag="button" class="btn btn-info">+ Note</router-link>

        <!-- <button @click="addNote()" class="btn btn-info">+ Note</button> -->
    </div>
</template>

<script>
export default {
  name: "NoteList",
  props: ["notes", "activeNote","courseId"],
  methods: {
    changeNote(index) {
      this.$emit("app-changeNote", index);
    },
    addNote() {
      this.$emit("app-addNote");
    }
  }
};
</script>

<style>
.list {
  margin: 20px;
}

.centerText {
  margin: auto;
  width:fit-content
}
</style>
