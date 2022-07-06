import {inject}           from "vue";
import {h}                from "vue";
import {resolveComponent} from "vue";

export default {
  props: {
    color: String,
    field: String,
    natives: Object
  },
  emits: ["query"],
  setup(props, context) {
    const condition = inject("condition");

    return () => h("div", {class: "managunit querier"},
        [
          h(resolveComponent("q-input"), {
            class: "querier--keyword",
            ...props.natives.keyword,
            modelValue: condition[props.field],
            "update:model-value": value => condition[props.field] = value
          }),
          h("div", {class: "querier--splitter"}),
          h(resolveComponent("q-btn"), {
            ...props.natives.query,
            onclick: () => context.emit("query")
          })
        ]
    )
  }
}