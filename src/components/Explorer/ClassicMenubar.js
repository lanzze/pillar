import {resolveComponent} from "vue";
import {h}                from "vue";

export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }, setup(props, context) {

    return () => h("div", {class: "explorer__managunit__menubar"},
        props.items.map(e => h(resolveComponent("q-btn"),
            {
              ...e.natives,
              class: "explorer__managunit__menubar-item",
              icon: e.icon,
              label: e.label,
              title: e.title,
              color: e.color,
              onclick: () => context.emit("action", e),
            }))
    )
  }
}