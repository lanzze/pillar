import SourcedFormElement from "../SourcedFormElement";

export default {
  name: "ElementTextField",
  extends: SourcedFormElement,
  methods: {
    render(H, resolve, options) {
      return H(resolve("el-form-item"), {label: options.label}, [
        H(resolve("el-select"),
            Object.assign({
              modelValue: this.get(options.field, options.default),
              onChange: v => this.set(options.field, v)
            }, options.attrs),
            this.source.map(item => H(
                resolve("el-option"),
                Object.assign({label: this.itemValueOf(item), value: this.itemValueOf(item),})
            ))
        )
      ])
    }
  }
}