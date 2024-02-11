<template>
  <img class="logo" src="../assets/logo.png" />
  <h1 class="title">Регистрация в TodoApp</h1>
  <div class="register">
    <input type="text" v-model="name" placeholder="Введите логин" />
    <input type="text" v-model="email" placeholder="Введите ваш Email" />
    <input
      :type="passwordFieldType"
      v-model="password"
      placeholder="Введите пароль"
    />
    <button class="icon" @click="switchVisibility">
      Показать / Скрыть пароль
    </button>
    <p></p>
    <button @click="signUp">Зарегестрироваться</button>
    <p>
      <router-link to="/login"> Перейти на страницу входа </router-link>
    </p>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordFieldType: "password",
    };
  },
  methods: {
    async signUp() {
      let result = await axios.post("http://localhost:3000/users", {
        email: this.email,
        password: this.password,
        name: this.name,
      });
      console.warn(result);
      if (result.status == 201) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.$router.push({ name: "Home" });
      }
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
