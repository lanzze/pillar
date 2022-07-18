import {defineAsyncComponent} from "vue";
import {h}                    from "vue";

export default {
  name: "AttachmentDirectory",
  props: {
    attachment: String,
    directory: Object,
  },
  emits: ["select"],
  setup(props, context) {
    const component = defineAsyncComponent(props.directory.component);
    return () => h("div",
        {
          class: "explorer directory attachment",
        },
        [
          h(component, {
            ...props.directory.attribute,
            class: "directory--component",
            onSelect: item => context.emit("select", item),
          }),
          h("div", {id: props.attachment, class: "directory--attachment"}),
        ])
  },
}