import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
import HomeView from "@/views/home/HomeView.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },
  {
    path:"/login",
    name:"LoginView",
    component: LoginView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
