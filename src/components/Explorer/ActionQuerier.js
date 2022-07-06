import {h}                from "vue";
import {resolveComponent} from "vue";
import {inject}           from "vue/dist/vue";
import {get}              from "./explorer.tools";

export default {
  props: {
    mapping: Object,
    actions: Array,
    natives: Object
  },
  emits: ["query", "action"],
  setup(props, context) {
    const condition = inject("condition");
    const selection = inject("selection");

    return () => h("div", {class: "managunit querier classic"},
        [
          h(resolveComponent("q-input"), {
            ...props.natives.keyword,
            modelValue: condition[props.mapping.keyword],
            "update:model-value": value => condition[props.mapping.keyword] = value
          }),
          h("div", {class: "querier--splitter"}),
          h("div", {class: "querier--actions"}, [
            h(resolveComponent("q-btn"), {
              ...props.natives.query,
              onclick: () => context.emit("query")
            }),
            ...props.actions.map((e, i) => h(resolveComponent("q-btn"), {
                  ...e.native,
                  key: i,
                  class: "querier--action-item",
                  image: e.image,
                  color: e.color,
                  label: e.label,
                  disable: get(e.disable, selection),
                  onclick: () => context.emit("action", e)
                })
            )
          ])
        ]
    )
  }
}