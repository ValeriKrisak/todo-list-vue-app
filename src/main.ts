import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faPlus,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faPlus, faBackward);

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
