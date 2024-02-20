import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import Add from "./components/Add.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
    meta: { title: "Todo | Все заметки" },
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/sign-up",
    meta: { title: "Todo | Регистрация" },
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
    meta: { title: "Todo | Вход" },
  },
  {
    name: "Add",
    component: Add,
    path: "/add",
    meta: { title: "Todo | Создать новую заметку" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  next();
});

export default router;
