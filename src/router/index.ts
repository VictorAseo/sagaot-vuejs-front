import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import SignInView from "@/views/SignIn/SignInView.vue";
import SignUpView from "@/views/SignUp/SignUpView.vue";
import HomeView from "@/views/home/HomeView.vue";


const routes: Array<RouteRecordRaw> = [
  { //Dashboard screen
    path: "/Dashboard_S",
    name: "HomeView",
    component: HomeView,
  },
  { // Sign in screen
    path:"/SignInView",
    name:"SignInView",
    component: SignInView
  },
  { // Sign Up screen
    path:"/SignUpView",
    name:"SignUpView",
    component: SignUpView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
