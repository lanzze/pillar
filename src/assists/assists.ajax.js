import store from "../store";

export function request(config) {

}

export function response(config) {

}

export function handler(code, error) {
  store.dispatch("notify", {title: "错误", content: error.message, type: 'error'});
}