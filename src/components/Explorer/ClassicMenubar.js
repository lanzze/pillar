import {resolveComponent} from "vue";
import {h}                from "vue";

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }, setup(props, context) {
    return () => props.items.map(e => h(resolveComponent("q-btn"),
        {
          ...e.native,
          icon: e.icon,
          label: e.label,
          title: e.title,
          color: e.color,
          onclick: () => context.emit("action", e),
        }))
  }
}