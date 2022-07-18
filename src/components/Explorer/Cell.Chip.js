import {h}                from "vue";
import {resolveComponent} from "vue";
import {get}              from "./explorer.tools";

export default {
  name: "ChipCell",
  props: ["model", "label", "title", "click", "color", "fontColor", "native"],
  emits: ["action"],
  setup(props, context) {
    return () => h(resolveComponent("q-chip"),
        {
          class: props.click ? "cursor-pointer" : undefined,
          textColor: props.fontColor || "white",
          color: get(props.color, props.model),
          title: get(props.title, props.model),
          ...props.native,
          "onclick.stop": () => props.click && context.emit("action", props.click)
        },
        {default: () => get(props.label, props.model)}
    )
  }
}