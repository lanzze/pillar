import {inject}           from "vue";
import {resolveComponent} from "vue";
import {h}                from "vue";
import {get}              from "./explorer.tools";

export default {
  props: {
    color: String,
    items: {
      type: Array,
      required: true
    }
  },
  setup(props, context) {
    const selections = inject("selections");

    return () => h("div", {class: "managunit menubar classic"},
        props.items.map((e, i) => h(resolveComponent("q-btn"),
                {
                  ...e.native,
                  key: i,
                  class: "menubar--item",
                  icon: e.icon,
                  label: e.label,
                  title: e.title,
                  color: e.color,
                  disable: get(e.disable, selections),
                  onclick: () => context.emit("action", e)
                }
            )
        )
    )
  }
}