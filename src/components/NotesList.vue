<template>
    <div class="list">
        <h3>Note-List</h3>
        <ul class="collection">
            <li class="collection-item"
                v-for="(note, index) in notes"
                :key="note.index"
                :class="{ 'active': index === activeNote}"
                @click="changeNote(index)"
                >
                <div>{{ note.title }}</div>
            </li>
        </ul>
        <button @click="addNote()" class="btn btn-info">+ Note</button>
    </div>
</template>

<script>
export default {
  name: "NoteList",
  props: ["notes", "activeNote"],
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
</style>
