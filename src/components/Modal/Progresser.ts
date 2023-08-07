import {resolveComponent} from "vue";
import {defineComponent}  from "vue";
import {h}                from "vue";

export default defineComponent({
  name: "Progresser",
  props: ["name", "size", "color"],
  setup(props) {
    return () => h(resolveComponent(`q-spinner-${props.name}`),
        {
          class: "dialog--progresser",
          color: props.color,
          size: props.size,
        })
  },
})