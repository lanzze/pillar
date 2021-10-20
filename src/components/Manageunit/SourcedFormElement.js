import FormElement from "./FormElement";

const KEYMAP = {label: "label", value: "value"};
export default {
  name: "SourcedFormElement",
  extends: FormElement,
  data() {
    return {source: null}
  },
  watch: {
    "options.source": {
      immediate: true,
      handler(value) {
        if (value == null) return this.source = [];
        if (Array.isArray(value)) {
          return this.source = value;
        }
      }
    }
  },
  methods: {
    itemLabelOf(item) {
      let keymap = item.keymap || KEYMAP;
      if (keymap instanceof Function) {
        return keymap(item, this.model);
      }
      return item[keymap.label];
    },
    itemValueOf(item) {
      let keymap = item.keymap || KEYMAP;
      if (keymap instanceof Function) {
        return keymap(item, this.model);
      }
      return item[keymap.value];
    }
  },
}