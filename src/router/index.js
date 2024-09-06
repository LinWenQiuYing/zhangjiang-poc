// src/router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home.vue";
import searchMain from "../views/searchMain";

const routes = [
  {
    path: "/",
    redirect: "/home", // 设置默认路由为/home
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "searchMain",
    component: searchMain,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
