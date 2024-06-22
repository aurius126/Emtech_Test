import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import { BootstrapVue3 } from "bootstrap-vue-3";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircle,
  faUser,
  faEnvelope,
  faSave,
  faCheck,
  faPhone,
  faUserTag,
  faBook,
  faCalendarAlt,
  faDashboard,
  faTable,
  faTrash,
  faPencil
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "./plugins/axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = createApp(App);

library.add(
  faCircle,
  faUser,
  faEnvelope,
  faSave,
  faCheck,
  faPhone,
  faUserTag,
  faBook,
  faCalendarAlt,
  faDashboard,
  faTable,
  faTrash,
  faPencil
);
app.use(router);
app.use(BootstrapVue3);

app.config.globalProperties.$axios = axiosInstance;

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
