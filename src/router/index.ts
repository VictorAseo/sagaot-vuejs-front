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
  },
  { // Professor list screen to student category
    path:"/ProfessorsListView_S",
    name:"ProfessorsListView",
    component: ProfessorsListView
  },
  { // GPA Screen
    path:"/GPAView",
    name:"GPAView",
    component: GPAView
  },
  { // Message Screen
    path:"/MessagesView",
    name:"MessagesView",
    component: MessagesView
  },
  { // Documents/Reports screen
    path:"/DocumentsView",
    name:"DocumentsView",
    component: DocumentsView
  },
  { // Students list screen to professor category
    path:"/StudentsListView_P",
    name:"StudentsListView",
    component: StudentsListView
  },
  { // Settings screen
    path:"/SettingsView",
    name:"SettingsView",
    component: SettingsView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
