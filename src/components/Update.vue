<template>
  <Header />
  <h1>Изменить заметку</h1>
  <form class="add">
    <input
      type="text"
      name="name"
      placeholder="Введите название"
      v-model="notes.name"
    />
    <input
      type="text"
      name="name"
      placeholder="Введите текст заметки"
      v-model="notes.text"
      Сделано
    />
    <button type="button" @click="updateNote">Изменить заметку</button>
  </form>
</template>
<script>
import axios from "axios";
import Header from "./Header.vue";
export default {
  name: "Update",
  async mounted() {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
    const result = await axios.get(
      "http://localhost:3000/notes/" + this.$route.params.id
    );
    // console.warn(this.$route.params.id);
    console.warn(result.data);
    this.notes = result.data;
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
    async updateNote() {
      let result = await axios.put(
        "http://localhost:3000/notes/" + this.$route.params.id,
        {
          name: this.notes.name,
          text: this.notes.text,
          checked: this.notes.checked,
        }
      );
      if (result.status == 200) {
        this.$router.push({ name: "Home" });
      }
      console.warn("result", result);
    },
  },
};
</script>
