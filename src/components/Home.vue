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
    };
  },
  async mounted() {
    this.loadData();
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
</style>
