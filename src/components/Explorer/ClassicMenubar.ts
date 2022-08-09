import {h, inject}        from "vue";
import {resolveComponent} from "vue";
import {defineComponent}  from "vue";
import {get}              from "./tools.explorer";

export default defineComponent({
  name: "ClassicMenubar",
  props: {
    color: String,
    items: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const data = inject("data");

    return () => h("div",
        {
          class: "managunit--menubar classic " + (props.color ? `bg-${props.color}` : ""),
        },
        () => props.items.map((e: any, i) => h(resolveComponent("q-btn"),
                {
                  ...e.native,
                  key: i,
                  class: "menu--item",
                  icon: e.icon,
                  label: e.label,
                  title: e.title,
                  color: e.color,
                  disable: get(e.disable, data),
                  onclick: () => context.emit("action", e),
                },
            ),
        ),
    )
  },
})