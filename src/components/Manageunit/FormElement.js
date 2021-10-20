import {h, resolveComponent} from "vue";
import get                   from "../../assists/get";
import set                   from "../../assists/set";

export default {
  name: "FormElement",
  props: {
    model: Object,
    options: Object
  },
  inject: ["emitter"],
  methods: {
    get(key, def) {
      return get(this.model, key, def);
    },
    set(key, val) {
      return set(this.model, key, val);
    },
    render(H, resolve, options) { }
  },
  render() {
    return this.render(h, resolveComponent, this.options);
  }
}