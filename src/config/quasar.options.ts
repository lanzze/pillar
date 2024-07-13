import '@quasar/extras/mdi-v6/mdi-v6.css';
import zhCH                             from "quasar/lang/zh-CN";
import iconSet                          from "quasar/icon-set/mdi-v6";
import {Notify, AppFullscreen, QDialog} from "quasar";

// To be used on app.use(Quasar, { ... })
export default <any>{
  config: {},
  plugins: {Notify, QDialog, AppFullscreen},
  lang: zhCH,
  iconSet,
};