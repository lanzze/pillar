import {isRef, ref}              from "vue";
import {Transition}              from "vue";
import {defineAsyncComponent, h} from "vue";
import Dialog                    from "../Modal/Dialog.vue";

export default {
  name: "Container",
  props: {
    zIndex: [Number, ref],
    options: Object,
  },
  setup(props, context) {
    let model = null;
    const validation = ref(true);
    const onAction = (name, ...args) => {
      if (props.options.onAction) props.options.onAction(name, ...args);
      if (props.options.prevent !== true) {
        context.emit("close");
      }
    }
    const onSubmit = () => {
      if (props.options.onSubmit) props.options.onSubmit(model);
      if (props.options.prevent !== true) {
        context.emit("close");
      }
    }
    const onCancel = () => {
      if (props.options.onCancel) props.options.onCancel();
      if (props.options.prevent !== true) {
        context.emit("close");
      }
    }

    const options = props.options;
    const isComponent = options.content instanceof Function;
    return () => h(Transition, {
      appear: true,
      "enter-active-class": options.animation?.enter || "window.enter-active",
      "leave-active-class": options.animation?.leave || "window.leave-active",
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
          maximizer: options.maximizer,
          validation: validation.value,
          zIndex: isRef(props.zIndex) ? props.zIndex.value : props.zIndex,
          onSubmit,
          onCancel,
          ...options.modal
        },
        [isComponent ?
            h(defineAsyncComponent(options.content), {
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
