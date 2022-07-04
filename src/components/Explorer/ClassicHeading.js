import {resolveComponent} from "vue";
import {h}                from "vue";

export default {
  props: {
    item: Object,
    title: [String, Function],
    subtitle: [String, Function]
  },
  setup(props, context) {
    const get = target => target instanceof Function ? target(props.item) : target;
    return () => h("div", {class: "explorer__managunit__heading"},
        [
          h(resolveComponent("div"), {
            class: "explorer__managunit__heading--title"
          }, get(props.title)),
          h(resolveComponent("div"), {
            class: "explorer__managunit__heading--subtitle"
          }, get(props.subtitle)),
        ]
    );
  }
}