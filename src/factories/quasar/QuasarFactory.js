import FrameworkFactory from "../FrameworkFactory";
import form             from "./quasar.form";
import textfield        from "./quasar.textfield";
import radio            from "./quasar.radio";

const map = {
  'form': form,
  'textfield': textfield,
  'radio': radio,
}

export default class QuasarFactory extends FrameworkFactory {

  from(H, element, options, model, children) {
    let resolve = map[element];
    if (resolve == null) {
      throw new Error("Unsupported element for: " + options.content);
    }
    return resolve(H, options, model, children);
  }
}