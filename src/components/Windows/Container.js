import {isRef, ref}              from "vue";
import {Transition}              from "vue";
import {defineAsyncComponent, h} from "vue";
import Dialog                    from "../Modal/Dialog.vue";

export default {
  name: "Container",
  props: {
    zIndex: [Number, ref],
    options: Object
  },
  emits: ["close"],
  setup(props, context) {
    let model = null;
    const options = props.options;
    const validation = ref(true);
    const onAction = (name, ...args) => {
      if (options.onAction) options.onAction(name, ...args);
      if (options.prevent !== true) {
        context.emit("close");
      }
    }
    const onSubmit = () => {
      if (options.onSubmit) options.onSubmit(model);
      if (options.prevent !== true) {
        context.emit("close");
      }
    }
    const onCancel = () => {
      if (options.onCancel) options.onCancel();
      if (options.prevent !== true) {
        context.emit("close");
      }
    }

    const isComponent = options.content instanceof Function;
    const component = isComponent ? defineAsyncComponent(options.content) : undefined;
    return () => h(Transition, {
      appear: true,
      "enter-active-class": options.animation?.enter || "window--enter-active",
      "leave-active-class": options.animation?.leave || "window--leave-active"
    }, [h(Dialog, {
          icon: options.icon,
          sizes: options.sizes,
          title: options.title,
          offset: options.offset,
          header: options.header,
          footer: options.footer,
          closer: options.closer,
          cancel: options.cancel,
          submit: options.submit,
          modally: options.modally,
          maximum: options.maximum,
          progress: options.progress,
          validation,
          zIndex: isRef(props.zIndex) ? props.zIndex.value : props.zIndex,
          onSubmit,
          onCancel,
          ...options.modals
        },
        [isComponent ?
            h(component, {
              ...options.attrs,
              onSubmit,
              onCancel,
              onAction,
              onInput: value => model = value,
              "onUpdate:validation": value => validation.value = value
            }) :
            h("div", {innerHTML: options.content})
        ]
    )]);
  }
}
