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
  <p></p>
  <div v-for="(task, index) in tasks" v-bind:key="index">{{ task }}</div>
  <p></p>
  <button @click="removeTask(index)">Удалить</button>
  <p></p>
  <input v-model="newTask" />
  <button @click="addTask">Добавить задачу</button>
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
    if (localStorage.getItem("tasks")) {
      try {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
      } catch (e) {
        localStorage.removeItem("tasks");
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
      tasks: [[]],
      newEditState: false,
      newTask: null,
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
      this.tasks.push(this.newTask);
      this.newTask = "";
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
      let parsedTask = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", parsedTask);
    },
    // новая фича
    addTask() {
      if (!this.newTask) return;
      this.tasks.push(this.newTask);
      this.newTask = [""];
      this.saveTasks();
    },
    removeTask(x) {
      this.tasks.splice(x, 1);
      this.saveTasks();
    },
    saveTasks() {
      let parsed = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", parsed);
    },
  },
};
</script>
