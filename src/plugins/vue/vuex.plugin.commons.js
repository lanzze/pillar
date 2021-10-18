import set from "../../assists/set";

export default function install(store) {
  store.update = function (key, value) {
    if (process.env.NODE_ENV === "development") {
      store.commit("SET", {key, value});
    } else {
      set(store.state, key, value);
    }
    return value;
  }
}