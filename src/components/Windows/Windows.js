import {h as H} from "vue";
import Window   from "./Window";

let zIndex = 999999999;
export default {
  name: "Windows",
  props: {
    items: {type: Array, default: () => []},
    front: String,
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
      let window = this.$refs[id];
      if (window != null && window.layer < zIndex - 1) {
        /**
         * We have to update this value by directly.
         * Because we don't want to update all window when some window's zIndex change.
         * That's no necessary.
         */
        window.layer = zIndex++;
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
          zIndex: item.zIndex || zIndex++,
          options: item,
          onClose: this.onClose,
          onClick: () => this.onFront(item.id)
        }));
    return H("div", {class: "component.windows"}, children);
  }
}