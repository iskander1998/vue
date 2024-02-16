<template>
  <Header />
  <h1>Привет {{ name }}, список заметок:</h1>
  <table border="1" align="center">
    <tr class="titles">
      <td>Название заметки</td>
      <td>Список дел</td>
      <td>Отметить выполнение</td>
      <td>Статус</td>
      <td>Действия</td>
    </tr>
    <tr v-for="item in notes" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.text }}</td>
      <td>
        <input type="checkbox" v-model="item.checked" />
      </td>
      <p>{{ item.checked ? "Сделано ✅" : "Не сделано 🛑" }}</p>
      <td>
        <router-link class="update" :to="'/update/' + item.id"
          >Изменить</router-link
        >
        <button class="delete" @click="deleteNote(item.id)">Удалить</button>
      </td>
    </tr>
  </table>
  Введите имя записки <input v-model="newNote" />
  <p></p>
  Введите текст <input v-model="newText" />
  <button @click="addNote">add</button>
  <p></p>
  <div class="note">
    <div class="name" v-for="note in notes1" v-bind:key="note">
      Название заметки: {{ note }}
      <p></p>
    </div>
    <div class="text" v-for="noteTex in notesText" v-bind:key="noteTex">
      Текст: {{ noteTex }}
      <p></p>
    </div>
  </div>
</template>
<script>
import Header from "./Header.vue";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      name: "",
      notes: [],
      notes1: [],
      notesText: [],
      newText: null,
      newNote: null,
    };
  },
  async mounted() {
    this.loadData();
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
  },
  components: {
    Header,
  },
  methods: {
    async deleteNote(id) {
      let result = await axios.delete("http://localhost:3000/notes/" + id);
      console.warn(result);
      if (result.status == 200) {
        this.loadData();
      }
    },
    async loadData() {
      let user = localStorage.getItem("user-info");
      this.name = JSON.parse(user).name;
      if (!user) {
        this.$router.push({ name: "SignUp" });
      }
      let result = await axios.get("http://localhost:3000/notes");
      console.warn(result);
      this.notes = result.data;
    },
    addNote() {
      if (!this.newNote && !this.newText) {
        return;
      }
      this.notes1.push(this.newNote);
      this.newNote = "";
      this.notesText.push(this.newText);
      this.newText = "";
      this.saveNotes();
    },
    saveNotes() {
      let parsed1 = JSON.stringify(this.notes1);
      localStorage.setItem("notes1", parsed1);
      let parsedText = JSON.stringify(this.notesText);
      localStorage.setItem("notesText", parsedText);
    },
  },
};
</script>
<style>
td {
  width: 160px;
  height: 40px;
}

.delete {
  background: rgb(236, 143, 143);
  color: whitesmoke;
  border-color: black;
  cursor: pointer;
  font-size: 17px;
  border-radius: 5px;
  padding-left: 45px;
  padding-right: 45px;
}
.delete :hover {
  background: black;
  color: black;
}
.update {
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
  text-decoration: none;
  color: whitesmoke;
  background: rgb(140, 187, 140);
  border-color: black;
  border-radius: 5px;
  font-size: 17px;
}
.titles {
  color: Black;
  font-size: 18px;
}

.note {
  position: relative;
  background-color: pink;
}

.note .name {
  display: block;
  width: 400px;
  color: white;
  right: 20%;
  background-color: black;
}

.note .text {
  display: inline-block;
  width: 200px;
  color: white;
  background-color: gray;
  padding-bottom: 10%;
}
</style>
