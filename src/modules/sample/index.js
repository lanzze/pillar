import store from "../../store"
import local from "./store";

import "./styles/index.scss";

/**
 * This is sample code.
 *
 * The function for init the module.
 * Do not use this function for complex things (remember that, that's important!).
 */
+function setup() {
  store.registerModule("moduleName", local);
}();