import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../components/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/register.vue"),
  },
  {
    path: "/todo",
    name: "todolist",
    component: () => import("../components/toDoList.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
