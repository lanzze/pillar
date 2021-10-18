import {h as H} from "vue";
import Window   from "./Window";

let zIndex = 999999999;
export default {
  name: "Windows",
  props: {
    items: {type: Array, default: () => []},
    front: String,
    config: Object,
    zIndex: {
      type: Number,
      default: zIndex
    }
  },
  watch: {
    front(id) { this.onFront(id) }
  },
  methods: {
    onFront(id) {
      // TODO THIS IS WRONG CODE
      let item = this.items.find(e => e.id === id);
      if (item != null && item.zIndex < zIndex - 1) {
        item.zIndex = zIndex;
      }
    },
    onClose(id) {
      let index = this.items.findIndex(e => e.id === id);
      if (index >= 0) this.items.splice(index, 1);
    },
  },
  render() {
    let children = this.items.map(item =>
        H(Window, {
          ref: item.id,
          key: item.id,
          config: this.config,
          options: item,
          onClose: this.onClose,
          onClick: () => this.onFront(item.id),
          zIndex: (item.zIndex = item.zIndex || zIndex++)
        }));
    return H("div", {class: "component.windows"}, children);
  }
}