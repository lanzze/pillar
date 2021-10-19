import {defineAsyncComponent} from "vue";

export default function resolve(H, model, options, get, set) {
  return H(defineAsyncComponent(options.content), Object.assign({
    label: options.label,
    value: get(model, options.field),
    "onUpdate:modelValue": () => set(options.field, model)
  }, options.attrs))
}