import store from "../../store"
import local from "./store";

+function setup() {
  store.registerModule("commons", local);
}()