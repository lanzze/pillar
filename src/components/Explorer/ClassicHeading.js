import {resolveComponent} from "vue";
import {h}                from "vue";

export default {
  props: {
    item: Object,
    title: [String, Function],
    subtitle: [String, Function]
  },
  setup(props, context) {
    return () => [
      h(resolveComponent("div"), {
        class: "managunit.heading:title"
      }),
      h(resolveComponent("div"), {}),
    ];
  }
}