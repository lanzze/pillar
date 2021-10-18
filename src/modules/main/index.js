import store from "../../store";
import local from "./store";

import "./styles/index.scss";

+function setup() {
  store.registerModule("main", local);
}()