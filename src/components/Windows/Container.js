import {defineAsyncComponent}     from "vue";
import {h as H, resolveComponent} from "vue";
import Dialog                     from "../Modal/Dialog.vue";

export default {
  name: "Container",
  props: {
    zIndex: Number,
    options: Object,
  },
  data() { return {layer: 0, model: null, validation: true} },
  watch: {
    zIndex: {
      immediate: true,
      handler(index) {
        if (index !== this.layer) {
          this.layer = index;
        }
      }
    }
  },
  methods: {
    onAction(name, ...args) {
      if (this.options.onSubmit) this.options.onSubmit(name, ...args);
      if (this.options.prevent !== true) {
        this.$emit("close");
      }
    },
    onSubmit() {
      if (this.options.onSubmit) this.options.onSubmit(this.model);
      if (this.options.prevent !== true) {
        this.$emit("close");
      }
    },
    onCancel() {
      if (this.options.onCancel) this.options.onCancel();
      if (this.options.prevent !== true) {
        this.$emit("close");
      }
    }
  },
  render() {
    const options = this.options;
    const isComponent = options.content instanceof Function;
    return H(resolveComponent("transition"), {
      appear: true,
      "appear-active-class": "open",
      "leave-active-class": "window.hide"
    }, [H(Dialog, {
          icon: options.icon,
          sizes: options.sizes,
          title: options.title,
          offset: options.offset,
          header: options.header,
          footer: options.footer,
          closer: options.closer,
          cancel: options.cancel,
          submit: options.submit,
          status: options.status,
          zIndex: this.layer,
          modally: options.modally,
          maximum: options.maximum,
          overflow: options.overflow,
          maximizer: options.maximizer,
          validation: this.validation,
          onSubmit: this.onSubmit,
          onCancel: this.onCancel,
          ...options.modal
        },
        [isComponent ?
            H(defineAsyncComponent(options.content), {
              ...options.attrs,
              onSubmit: this.onSubmit,
              onCancel: this.onCancel,
              onAction: this.onAction,
              onInput: value => this.model = value,
              "onUpdate:validation": value => this.validation = value
            }) :
            H("div", {innerHTML: options.content})
        ]
    )
    ]);
  }
}
