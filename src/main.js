import {createApp}  from 'vue'
import App          from './App.vue'
import store        from "./store";
import router       from "./router";
import {createI18n} from "vue-i18n";
import plugin       from "./plugins/vue/vue.plugin.index";

import "./config/modules";
import "./components/index.scss";

import {Quasar}          from 'quasar'
import quasarUserOptions from './quasar-user-options'

import zh_CN from "./locale/lang/zh_CN";

const i18n = createI18n({
  locale: "cn",
  messages: {
    cn: zh_CN
  }
});
const app = createApp(App);
app.use(i18n);
app.use(Quasar, quasarUserOptions);
app.use(store);
app.use(router);
app.use(plugin);
app.mount('#app');

