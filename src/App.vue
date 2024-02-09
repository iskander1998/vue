<template>
  <h1 v-if="count === 1">hello</h1>
  <h1 v-else>{{ count }}</h1>
  <button @click="add_count">{{ name_of_button }}</button>
  <button @click="delete_digit">Delete this digit</button>
  <input type="text" />
  <p></p>
  Password: <input type="text" value="Введите пароль" />
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      name_of_button: "add digit",
      count: 1,
    };
  },

  methods: {
    add_count() {
      this.count++;
      console.log(this.count);
    },
    delete_digit() {
      this.count--;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Times, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
