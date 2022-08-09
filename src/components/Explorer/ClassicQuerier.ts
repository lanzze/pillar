import {defineComponent}  from "vue";
import {resolveComponent} from "vue";
import {inject}           from "vue";
import {h}                from "vue";

export default defineComponent({
  name:"ClassicQuerier",
  props: {
    color: String,
    field: String,
    label: String,
    query: String,
    image: String,
    natives: Object,
  },
  emits: ["query"],
  setup(props, context) {
    const condition: any = inject("condition");
    return () => h("div", {class: "managunit--querier classic"},
        [
          h(resolveComponent("q-input"), {
            ...props.natives?.keyword,
            class: "querier--keyword",
            color: props.color,
            label: props.label,
            modelValue: condition[props.field],
            "update:model-value": value => condition[props.field] = value,
          }),
          h("div", {class: "querier--splitter"}),
          h(resolveComponent("q-btn"), {
            ...props.natives?.query,
            icon: props.image || "mdi-magnify",
            color: props.color || "primary",
            label: props.query,
            onclick: () => context.emit("query"),
          }),
        ],
    )
  },
})