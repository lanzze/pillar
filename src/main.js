import {createApp} from 'vue'
import App         from './App.vue'
import store       from "./store";
import router      from "./router";
import plugin      from "./plugins/vue/vue.plugin.index";

import "./config/modules";

import "./components/index.scss";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(plugin);
app.mount('#app');

