<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Times, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  padding: 0;
  margin: 0;
}
.logo {
  padding-top: 100px;
  width: 100px;
}
.register input,
.login input,
.add input {
  width: 300px;
  height: 30px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid gray;
  border-radius: 10px;
}
.register button,
.login button,
.add button {
  width: 320px;
  height: 50px;
  border: 1px solid black;
  background: black;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  font-size: 15px;
}
.title {
  color: black;
}
.login .icon,
.register .icon {
  position: relative;
  display: inline;
  width: 320px;
  height: 30px;
  background-color: gray;
}
</style>
