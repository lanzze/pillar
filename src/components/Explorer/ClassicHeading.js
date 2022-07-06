import {inject}           from "vue";
import {resolveComponent} from "vue";
import {h}                from "vue";
import {get}              from "./explorer.tools";

export default {
  props: {
    title: [String, Function],
    subtitle: [String, Function]
  },
  setup(props, context) {
    const actives = inject("actives", null);
    return () => h("div", {class: "managunit heading classic"},
        [
          h(resolveComponent("div"), {
            class: "heading--title"
          }, get(props.title, actives)),

          props.subtitle &&
          h(resolveComponent("div"), {
            class: "heading--subtitle"
          }, get(props.subtitle, actives))
        ]
    );
  }
}