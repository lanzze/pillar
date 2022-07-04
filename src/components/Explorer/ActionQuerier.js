import {h}                from "vue";
import {resolveComponent} from "vue";

export default {
  props: {
    condition: Object,
    selections: Array,
    loading: Boolean,
    error: Boolean,
    mapping: Object,
    actions: Array,
    natives: Object
  },
  setup(props, context) {
    return () => h("div", {class: "explorer__managunit__querier-classic"},
        [
          h(resolveComponent("q-input"), {
            ...props.natives.keyword,
            modelValue: props.condition[props.mapping.keyword],
            "update:model-value": value => props.condition[props.mapping.keyword] = value
          }),
          h("div", {class: "explorer__managunit__querier__splitter"}),
          h("div", {class: "explorer__managunit__querier__actions"}, [
            h(resolveComponent("q-btn"), {
              ...props.natives.query,
              onclick: () => context.emit("query")
            }),
            ...props.actions.map(e => h(resolveComponent("q-btn"), {
              ...e.natives,
              class: "explorer__managunit__querier__action-item",
              onclick: () => context.emit("action", e)
            }))
          ])
        ]
    )
  }
}