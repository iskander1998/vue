<template>
  <Header />
  <h1>Добавить заметку</h1>
  <form class="add">
    <input
      type="text"
      name="name"
      placeholder="Введите название заметки"
      v-model="notes.name"
    />
    <input
      type="text"
      name="name"
      placeholder="Введите текст заметки"
      v-model="notes.text"
    />
    <button type="button" @click="addNote">Добавить заметку</button>
  </form>
</template>
<script>
import axios from "axios";
import Header from "./Header.vue";
export default {
  name: "Add",
  mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
  },
  components: {
    Header,
  },
  data() {
    return {
      notes: {
        name: "",
        text: "",
      },
    };
  },
  methods: {
    async addNote() {
      let result = await axios.post("http://localhost:3000/notes", {
        name: this.notes.name,
        text: this.notes.text,
      });
      if (result.status == 201) {
        this.$router.push({ name: "Home" });
      }
      console.warn("result", result);
    },
  },
};
</script>
