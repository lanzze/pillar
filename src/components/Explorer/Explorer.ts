import {defineComponent}      from "vue";
import {defineAsyncComponent} from "vue";
import {h, provide}           from "vue";
import {computed}             from "vue";
import {shallowRef}           from "vue";
import assign                 from "../assign";

export default defineComponent({
  name: "Explorer",
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const options   = props.options,
          directory = options.directory,
          managunit = options.managunit,
          configure = options.configure,
          unity     = configure.unity;

    const directoryComponent = defineAsyncComponent(directory.component);
    const selected = shallowRef(null);
    const optioned = computed(() => {
      if (selected.value != null) {
        let key = unity instanceof Function ? unity(selected.value) : selected.value[unity];
        let options = managunit.units[key];
        if (options !== undefined) {
          return assign({}, managunit.basic, options);
        }
      }
    });

    provide("unit", selected);

    return () => h("div", {class: "component explorer"},
        [
          h(directoryComponent, {...directory.attribute, onSelect: e => selected.value = e}),
          optioned.value &&
          h(defineAsyncComponent(optioned.value.component), {...optioned.value.attribute}),
        ],
    )
  },
})