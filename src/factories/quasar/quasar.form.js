import {resolveComponent} from "vue";

export default function resolve(H, options, model, children) {
  return H(resolveComponent("q-form"), options.attrs, children)
}