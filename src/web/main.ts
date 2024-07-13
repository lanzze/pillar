import {Quasar}      from "quasar";
import {createApp}   from 'vue';
import {createPinia} from 'pinia';
import {createI18n}  from 'vue-i18n';
import QuasarOptions from "@/config/quasar.options";
import {messages}    from "@/locale";
import App           from './App.vue';
import router        from '../router';
import Windows       from "../../../basic/src/plugins/pinia/windows";


import "@/style/tailwind.css";
import "quasar/dist/quasar.css";
import "../../../basic/src/components/style.scss";
import "../utils/px2rem"

const app   = createApp(App);
const pinia = createPinia();
const i18n  = createI18n(messages);

pinia.use(Windows({}));

app.use(pinia);
app.use(Quasar, QuasarOptions);
app.use(router);
app.use(i18n);

app.mount('#app');
