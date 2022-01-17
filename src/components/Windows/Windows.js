import {h as H}  from "vue";
import Container from "./Container";

let zIndex = 999999999;
export default {
  name: "Windows",
  props: {
    items: {type: Array, default: () => []},
    front: String,
    layer: {
      type: Number,
      default: zIndex
    }
  },
  watch: {
    front(id) { this.onFront(id) }
  },
  created() {
    zIndex = this.layer;
  },
  methods: {
    onFront(id) {
      let window = this.$refs[id];
      if (window != null && window.layer < zIndex - 1) {
        /**
         * We have to update this value by directly.
         * Because we don't want to update all window when some window's zIndex changed.
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
        H(Container, {
          ref: item.id,
          key: item.id,
          zIndex: item.zIndex || zIndex++,
          options: item,
          onClose: () => this.onClose(item.id),
          onClick: () => this.onFront(item.id)
        }));
    return H("div", {class: "component.windows"}, children);
  }
}