import {resolveComponent} from "vue";
import get                from "../../assists/get";
import set                from "../../assists/set";

export default function resolve(H, options, model) {
  return H(resolveComponent("q-input"), Object.assign({
    label: options.label,
    placeholder: options.placeholder,
    modelValue: get(model, options.field, options.default),
    "onUpdate:modelValue": v => set(model, options.field, v)
  }, options.attrs))
}