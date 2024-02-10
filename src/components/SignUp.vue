<template>
  <img class="logo" src="../assets/logo.png" />
  <h1 class="title">Регистрация в TodoApp</h1>
  <div class="register">
    <input type="text" v-model="name" placeholder="Введите Имя" />
    <input type="text" v-model="email" placeholder="Введите ваш Email" />
    <input type="password" v-model="password" placeholder="Введите пароль" />
    <button @click="signUp">Зарегестрироваться</button>
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
        alert("sign-up-done");
        localStorage.setItem("user-info", JSON.stringify(result.data));
      }
    },
  },
};
</script>
<style>
.logo {
  width: 100px;
}
.register input {
  width: 300px;
  height: 30px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid rgb(0, 0, 0);
}
.register button {
  width: 320px;
  height: 50px;
  border: 1px solid black;
  background: black;
  color: white;
  cursor: pointer;
}
.title {
  color: black;
}
</style>
