<template>
  <div class="nav">
    <router-link to="/">Главная</router-link>
    <router-link to="/Add">Создать новую заметку</router-link>
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
  background-color: rgb(32, 32, 32);
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0) 20%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 1)
    ),
    linear-gradient(
      45deg,
      black 25%,
      transparent 25%,
      transparent 75%,
      black 75%,
      black
    ),
    linear-gradient(
      45deg,
      black 25%,
      transparent 25%,
      transparent 75%,
      black 75%,
      black
    ),
    linear-gradient(to bottom, rgb(8, 8, 8), rgb(32, 32, 32));
  background-size: 100% 100%, 10px 10px, 10px 10px, 10px 5px;
  background-position: 0px 0px, 0px 0px, 5px 5px, 0px 0px;
  overflow: hidden;
  right: 100%;
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
