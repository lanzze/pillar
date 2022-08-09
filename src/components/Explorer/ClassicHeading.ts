import {defineComponent} from "vue";
import {inject}          from "vue";
import {h}               from "vue";
import {get}             from "./tools.explorer";

export default defineComponent({
  name: "ClassicHeading",
  props: {
    title: [String, Function],
    subtitle: [String, Function],
  },
  setup(props) {
    const unit = inject("unit", null);
    return () => h("div", {class: "managunit--heading classic"},
        [
          h("div", {class: "heading--title"}, get(props.title, unit)),
          props.subtitle &&
          h("div", {class: "heading--subtitle"}, get(props.subtitle, unit)),
        ],
    );
  },
})