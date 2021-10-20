import SourcedFormElement from "../SourcedFormElement";

export default {
  name: "ElementTextField",
  extends: SourcedFormElement,
  methods: {
    render(H, resolve, options) {
      return H(resolve("el-form-item"), {label: options.label}, [
        H(resolve("el-radio-group"),
            Object.assign({
              modelValue: this.get(options.field, options.default),
              onChange: v => this.set(options.field, v)
            }),
            this.source.map(item => H(resolve("el-radio"),
                Object.assign({label: this.itemValueOf(item),}, options.attrs),
                this.itemLabelOf(item))
            )
        )
      ])
    }
  }
}