<template>
  <Header />
  <h1>Изменить заметку</h1>
  <form class="add" v-for="(note, index) in notes1" v-bind:key="index">
    <input
      type="text"
      name="name"
      placeholder="Введите название"
      v-model="notes1[index]"
    />
    <input
      type="text"
      name="name"
      placeholder="Введите текст заметки"
      v-model="notesText[index]"
      Сделано
    />
    <button type="button" @click="saveNotes">Сохранить изменения</button>
    <p></p>
    <button type="button" @click="cancelNotes">Отменить изменения</button>
    <p></p>
  </form>
</template>
<script>
// import axios from "axios";
import Header from "./Header.vue";
export default {
  name: "Update",
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
    // const result = await axios.get(
    //   "http://localhost:3000/notes/" + this.$route.params.id
    // );
    // // console.warn(this.$route.params.id);
    // console.warn(result.data);
    // this.notes = result.data;
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
  data() {
    return {
      // notes: {
      //   name: "",
      //   text: "",
      // },
      name: "",
      notes: [],
      notes1: [],
      notesText: [],
    };
  },
  methods: {
    // async updateNote() {
    //   let result = await axios.put(
    //     "http://localhost:3000/notes/" + this.$route.params.id,
    //     {
    //       name: this.notes.name,
    //       text: this.notes.text,
    //       checked: this.notes.checked,
    //     }
    //   );
    //   if (result.status == 200) {
    //     this.$router.push({ name: "Home" });
    //   }
    //   console.warn("result", result);
    // },
    saveNotes() {
      let parsed1 = JSON.stringify(this.notes1);
      localStorage.setItem("notes1", parsed1);
      let parsedText = JSON.stringify(this.notesText);
      localStorage.setItem("notesText", parsedText);
      this.$router.push({ name: "Home" });
    },
    cancelNotes() {
      this.notesText = JSON.parse(localStorage.getItem("notesText"));
      this.notes1 = JSON.parse(localStorage.getItem("notes1"));
    },
  },
};
</script>
