import {resolveComponent} from "vue";
import {h}                from "vue";

export default {
  name: "Progresser",
  props: ["name", "size", "color"],
  setup(props, context) {
    return () => h(resolveComponent(`q-spinner-${props.name}`),
        {
          class: "dialog--progresser",
          color: props.color,
          size: props.size
        })
  }
}