import {resolveComponent} from "vue";
import {defineComponent}  from "vue";
import {h, inject}        from "vue";
import {get}              from "./tools.explorer";

export default defineComponent({
  name: "ActionQuerier",
  props: {
    mapping: String,
    actions: Array,
    natives: Object,
  },
  emits: ["query", "action"],
  setup(props, context) {
    const condition = inject("condition");
    const selection = inject("selection");

    return () => h("div", {class: "managunit--querier action"},
        [
          h(resolveComponent("q-input"), {
            ...props.natives?.keyword,
            class: "querier--keyword",
            modelValue: condition[props.mapping],
            "update:model-value": value => condition[props.mapping] = value,
          }),
          h("div", {class: "querier--splitter"}),
          h("div", {class: "querier--actions"}, [
            h(resolveComponent("q-btn"), {
              ...props.natives?.query,
              class: "querier--query",
              onclick: () => context.emit("query"),
            }),
            ...props.actions.map((e: any, i) => h(resolveComponent("q-btn"), {
                  ...e.native,
                  key: i,
                  class: "querier--action-item",
                  image: e.image,
                  color: e.color,
                  label: e.label,
                  disable: get(e.disable, selection),
                  onclick: () => context.emit("action", e),
                }),
            ),
          ]),
        ],
    )
  },
})