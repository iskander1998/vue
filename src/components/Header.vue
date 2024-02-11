<template>
  <div class="nav">
    <router-link to="/">Главная</router-link>
    <router-link to="/Add">Создать новую заметку</router-link>
    <router-link to="/Update">Изменить</router-link>
    <a @click="logout" href="#">Выйти</a>
  </div>
</template>
<script>
export default {
  name: "Header",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style>
.nav {
  background: #333;
  overflow: hidden;
}
.nav a {
  float: left;
  color: whitesmoke;
  padding: 14px 16px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px;
}
.nav a:hover {
  background: whitesmoke;
  color: black;
}
</style>
