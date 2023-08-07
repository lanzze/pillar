import {resolveComponent} from "vue";
import {defineComponent}  from "vue";
import {h}                from "vue";
import {get}              from "../tools.table";

export default defineComponent({
  name: "CellChip",
  props: ["model", "label", "title", "click", "color", "native"],
  emits: ["action"],
  setup(props, context) {
    const label = props.label instanceof Function ? props.label(props.model) : props.label;
    return () => h(resolveComponent("q-chip"),
        {
          clickable: !!props.click,
          textColor: "white",
          color: get(props.color, props.model),
          title: get(props.title, props.model),
          ...props.native,
          onClick: evt => context.emit("action", props.model, props.click, evt.stopPropagation()),
        },
        () => label)
  },
})