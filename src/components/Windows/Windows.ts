import {h}               from "vue";
import {reactive, ref}   from "vue";
import {defineComponent} from "vue";
import Container         from "./Container";

export default defineComponent({
  name: "Windows",
  props: {
    items: {type: Array, default: () => ([])},
    front: String,
    layer: Number,
  },
  setup(props) {
    let zIndex = props.layer || 1000000000;
    const indices = reactive({});
    const refs = reactive({});
    const onFront = (id) => {
      let window = refs[id];
      if (window != null && indices[id] < zIndex - 1) {
        indices[id] = zIndex++;
      }
    }
    const onClose = (id) => {
      let index = props.items.findIndex((e: any) => e.id === id);
      if (index >= 0) props.items.splice(index, 1);
      delete refs[id];
      delete indices[id];
    }

    return () => h("div", {class: "component windows"}, props.items.map((item: any) =>
        h(Container, {
          key: item.id,
          ref: target => refs[item.id] = target,
          zIndex: (indices[item.id] = item.zIndex || zIndex++),
          options: item,
          onClose: () => onClose(item.id),
          onClick: () => onFront(item.id),
        }),
    ));
  },
})