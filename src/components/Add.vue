<template>
  <Header />
  <h1>Добавить заметку</h1>
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
  },
  components: {
    Header,
  },
};
</script>
