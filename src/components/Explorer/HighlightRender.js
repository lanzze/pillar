import {h}                from "vue";
import {resolveComponent} from "vue";
import {get}              from "./explorer.tools";

export default {
  name: "HighlightRender",
  props: ["model", "native", "click", "color", "fontColor", "value"],
  emits: ["action"],
  setup(props, context) {
    return () => h(resolveComponent("q-chip"),
        {
          ...props.native,
          textColor: props.fontColor || "white",
          color: get(props.color, props.model),
          onclick: () => props.click && context.emit("action", props.click)
        },
        {default: () => get(props.value, props.model)}
    )
  }
}