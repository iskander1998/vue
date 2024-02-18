<template>
  <img class="logo" src="../assets/logo.png" />
  <h1 class="title">Войти в TodoApp</h1>
  <div class="login">
    <input type="text" v-model="name" placeholder="Введите логин" />
    <div class="pass">
      <input
        class="pass1"
        :type="passwordFieldType"
        v-on:keyup.enter="login"
        v-model="password"
        placeholder="Введите пароль"
      />
      <button class="icon1" @click="switchVisibility">👁</button>
    </div>
    <button @click="login">Войти</button>
    <p>
      <router-link to="/sign-up"> Перейти на страницу регистрации </router-link>
    </p>
  </div>
</template>
<script>
// import axios from "axios";
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
      let result = [
        {
          email: this.email,
          password: this.password,
          name: this.name,
        },
      ];
      // await axios.get(
      //   `http://localhost:3000/users?name=${this.name}&password=${this.password}`
      // );

      // if (result.this.name == 200 && result.data.length > 0) {
      if (this.name == "admin" && this.password == "admin") {
        localStorage.setItem("user-info", JSON.stringify(result));
        this.$router.push({ name: "Home" });
      } else alert("Неверный логин или пароль");
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
<style>
.pass {
  position: relative;
}
.pass .pass1 {
  display: inline-block;
  width: 270px;
  height: 31.5px;
  border: 1px solid gray;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.pass .icon1 {
  text-align: center;
  display: inline-block;
  width: 30px;
  height: 35px;
  background-color: gray;
  border: 1px solid gray;
  vertical-align: middle;
  font-size: 100%;
  top: 50%;
  left: 50%;
  /* margin-left: 1px; */
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
</style>
