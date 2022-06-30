import {resolveComponent} from "vue";
import {h}                from "vue";

export default {
  props: {
    menubar: Object,
    querier: Object,
    content: Object
  },
  setup(props, context) {
    return () => h(resolveComponent("div"), {}, [
      props.menubar &&
      h(resolveComponent("div"), {
        id: "commons.component.managunit:menubar"
      }),
      props.querier &&
      h(resolveComponent("div"), {
        class: ""
      })
    ])
  }
}