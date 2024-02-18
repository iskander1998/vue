<template>
  <Header />
  <h1>Привет {{ name }}, список всех заметок:</h1>
  <!-- <table border="1" align="center">
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
  </table> -->
  <!-- Введите название заметки: <input v-model="newNote" />
  <p></p>
  Введите текст <input v-model="newText" />
  <button @click="addNote">add</button> -->
  <p></p>
  <div class="note">
    <div class="item" v-for="(note, index) in notes1" v-bind:key="note">
      <button class="del_but" @click="removeNote(index)">X</button>
      <div class="title_field">
        {{ note }}
      </div>
      <p>{{ notesText[index] }}</p>
      <p></p>
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
    removeNote(x) {
      if (confirm("Are you sure?")) {
        this.notes1.splice(x, 1);
        this.notesText.splice(x, 1);
        this.saveNotes();
      }
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
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  justify-content: center;
}

.note .item {
  margin-left: 5%;
  margin-right: 5%;
  padding-top: 0.1%;
  padding-left: 5%;
  padding-right: 0.1%;
  text-align: left;
  background-color: #c1c1c1;
  overflow: hidden;
  font-size: 100%;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: 1s;
}
.note .item:hover {
  transform: scale(1.1);
}
.note .item .del_but {
  position: absolute;
  left: 1;
  bottom: 1;
  right: 0;
  height: 25px;
  width: 30px;
  background-color: rgb(209, 9, 9);
  border-radius: 10px;
  border-color: rgb(61, 43, 43);
  cursor: pointer;
  /*  */
  border: none;
  outline: none;
  color: white;
  background: #ffffff;
  z-index: 0;
}
.del_but:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.del_but:active {
  color: #d60000;
}

.del_but:active:after {
  background: transparent;
}

.del_but:hover:before {
  opacity: 1;
}

.del_but:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
.title_field {
  color: black;
  padding-top: 3%;
  padding-right: 20px;
  width: 89%;
  font-size: 25px;
  font-weight: 600;
}
</style>
