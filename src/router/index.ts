import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import SignInView from "@/views/SignIn/SignInView.vue";
import SignUpView from "@/views/SignUp/SignUpView.vue";
//import DashboardView from "@/views/Dashboard/DashboardView.vue";


const routes: Array<RouteRecordRaw> = [
  // { // Sign Up screen
  //   path:"/",
  //   name:"Homeview",
  //   component:
  // },
  { // Sign in screen
    path:"/SignInView",
    name:"SignInView",
    component: SignInView
  },
  { // Sign Up screen
    path:"/SignUpView",
    name:"SignUpView",
    component: SignUpView
  },
  // { //Dashboard screen
  //   path: "/DashboardView",
  //   name: "DashboardView",
  //   component: DashboardView,
  // }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
