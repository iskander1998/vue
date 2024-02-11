<template>
  <img class="logo" src="../assets/logo.png" />
  <h1 class="title">Войти в TodoApp</h1>
  <div class="login">
    <input type="text" v-model="name" placeholder="Введите логин" />
    <input
      :type="passwordFieldType"
      v-on:keyup.enter="login"
      v-model="password"
      placeholder="Введите пароль"
    />
    <button class="icon" @click="switchVisibility">
      Показать / Скрыть пароль
    </button>
    <p></p>
    <button @click="login">Войти</button>
    <p>
      <router-link to="/sign-up"> Перейти на страницу регистрации </router-link>
    </p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      passwordFieldType: "password",
    };
  },
  methods: {
    async login() {
      let result = await axios.get(
        `http://localhost:3000/users?name=${this.name}&password=${this.password}`
      );

      if (result.status == 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: "Home" });
      } else alert("Неверный логин или пароль");

      console.log(result);
    },
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
<style></style>
