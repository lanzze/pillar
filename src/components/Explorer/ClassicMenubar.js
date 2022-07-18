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
    const data = inject("data");

    return () => h("div",
        {
          class: "managunit menubar classic " + (props.color ? `bg-${props.color}` : "")
        },
        {
          default: () => props.items.map((e, i) => h(resolveComponent("q-btn"),
                  {
                    ...e.native,
                    key: i,
                    class: "menu--item",
                    icon: e.icon,
                    label: e.label,
                    title: e.title,
                    color: e.color,
                    disable: get(e.disable, data),
                    onclick: () => context.emit("action", e)
                  }
              )
          )
        }
    )
  }
}