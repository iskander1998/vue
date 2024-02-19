<template>
  <Header />
  <h1>Добавить заметку</h1>
  <form class="add">
    <input
      type="text"
      name="name"
      placeholder="Введите название заметки"
      v-model="newNote"
    />
    <input
      type="text"
      name="name"
      placeholder="Введите текст заметки"
      v-model="newText"
    />
    <button type="button" @click="addNote">Добавить заметку</button>
  </form>
</template>
<script>
import Header from "./Header.vue";
export default {
  name: "Add",
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
    if (localStorage.getItem("notes1")) {
      try {
        this.notes1 = JSON.parse(localStorage.getItem("notes1"));
      } catch (e) {
        localStorage.removeItem("notes1");
      }
    }
    if (localStorage.getItem("notesText")) {
      try {
        this.notesText = JSON.parse(localStorage.getItem("notesText"));
      } catch (e) {
        localStorage.removeItem("notesText");
      }
    }
    if (localStorage.getItem("editState")) {
      try {
        this.editState = JSON.parse(localStorage.getItem("editState"));
      } catch (e) {
        localStorage.removeItem("editState");
      }
    }
  },
  components: {
    Header,
  },
  data() {
    return {
      notes1: [],
      notesText: [],
      editState: [],
      newEditState: false,
      newText: null,
      newNote: null,
    };
  },
  methods: {
    addNote() {
      if (!this.newNote && !this.newText) {
        return;
      }
      this.notes1.push(this.newNote);
      this.newNote = "";
      this.notesText.push(this.newText);
      this.newText = "";
      this.editState.push(this.newEditState);
      this.newEditState = "false";
      this.saveNotes();
      this.$router.push({ name: "Home" });
    },
    saveNotes() {
      let parsed1 = JSON.stringify(this.notes1);
      localStorage.setItem("notes1", parsed1);
      let parsedText = JSON.stringify(this.notesText);
      localStorage.setItem("notesText", parsedText);
      let parsedState = JSON.stringify(this.editState);
      localStorage.setItem("editState", parsedState);
    },
  },
};
</script>
