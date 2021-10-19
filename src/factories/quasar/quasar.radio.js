import {resolveComponent} from "vue";
import get                from "../../assists/get";
import set                from "../../assists/set";

export default function resolve(H, options, model) {
  if (Array.isArray(options.source)) {
    return options.source.map(item => {
      return H(resolveComponent("q-radio"), Object.assign({
        label: item.label,
        modelValue: get(model, options.field, options.default),
        val: item.value,
        "onUpdate:modelValue": v => set(model, options.field, v)
      }, options.attrs))
    })
  }
}