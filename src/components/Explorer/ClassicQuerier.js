import {h}                from "vue";
import {resolveComponent} from "vue";

export default {
  props: {
    condition: Object,
    selections: Array,
    loading: Boolean,
    error: Boolean,
    mapping: Object,
    natives: Object,
  },
  setup(props, context) {

    return () => h("div", {class: "explorer__managunit__querier"},
        [
          h(resolveComponent("q-input"), {
            ...props.natives.keyword,
            modelValue: props.condition[props.mapping.keyword],
            "update:model-value": value => props.condition[props.mapping.keyword] = value
          }),

          h("div", {class: "explorer__managunit__querier-splitter"}),

          h(resolveComponent("q-btn"), {
            ...props.natives.query,
            onclick: () => context.emit("query")
          })
        ]
    )
  }
}