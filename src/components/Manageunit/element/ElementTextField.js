import FormElement from "../FormElement";

export default {
  name: "ElementTextField",
  extends: FormElement,
  methods: {
    render(H, resolve, options) {
      return H(resolve("el-form-item"), {
        label: options.label,
        rules: options.rules,
      }, [H(resolve("el-input"), Object.assign({
        modelValue: this.get(options.field, options.default),
        onInput: v => this.set(options.field, v)
      }, options.attrs))])
    }
  },

}