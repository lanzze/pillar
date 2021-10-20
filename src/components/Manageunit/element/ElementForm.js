import {defineAsyncComponent}     from "vue";
import {h as H, resolveComponent} from "vue";
import Form                       from "../Form";
import ElementRadio               from "./ElementRadio";
import ElementSelect              from "./ElementSelect";
import ElementTextField           from "./ElementTextField";

const map = {
  "textfield": ElementTextField,
  "radio": ElementRadio,
  "select": ElementSelect,
}
export default {
  name: "ElementForm",
  extends: Form,
  render() {
    return H(resolveComponent("el-form"), this.form.attrs, this.form.items.map(options => {
      let component = options.component;
      if (component instanceof Function) {
        return H(defineAsyncComponent(component), {model: this.model, options}, options.attrs);
      }
      let element = map[component];
      if (element != null) {
        return H(element, {model: this.model, options})
      }
    }))
  }
}