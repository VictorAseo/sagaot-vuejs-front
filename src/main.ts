import "./assets/scss/reset.scss";
import "./assets/scss/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// import axios from "./plugins/axios";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(axios);

app.mount("#app");

// globais

// app.config.globalProperties.$axios = axios;
