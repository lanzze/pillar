import {defineAsyncComponent, h as H, mergeProps} from "vue";
import Dialog                                     from "../Modal/Dialog.vue";

export default {
  name: "Window",
  props: {
    zIndex: Number,
    config: Object,
    options: Object
  },
  render() {
    const options = this.options;
    const isComponent = options.content instanceof Function;
    return H("transition", {
      appear: true,
      "enter-active-class": "enter",
      "leave-active-class": "leave"
    }, [
      H(Dialog, mergeProps({}, this.config, options.config, {
            icon: options.icon,
            sizes: options.sizes,
            title: options.title,
            offset: options.offset,
            modal: options.modal,
            zIndex: this.zIndex,
            onSubmit: () => this.$emit("close", this.options.id),
            onCancel: () => this.$emit("close", this.options.id),
          },
      ), [isComponent ?
          H(defineAsyncComponent(options.content), options.attrs) :
          H("div", {innerHTML: options.content})
      ])
    ]);
  }
}