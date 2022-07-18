import {getCurrentInstance}   from "vue";
import {ref}                  from "vue";
import {provide}              from "vue";
import {computed, h}          from "vue";
import {defineAsyncComponent} from "vue";


export default {
  name: "Explorer",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const config    = props.config,
          directory = config.directory,
          managunit = config.managunit;

    const directoryComponent = defineAsyncComponent(directory.component);
    const selected = ref(null), itemkey = config.configure.itemkey;
    const optioned = computed(() => {
      if (selected.value != null) {
        let key = itemkey instanceof Function ? itemkey(selected.value) : selected.value[itemkey];
        let options = managunit.items[key];
        if (options !== undefined) {
          return Object.assign({}, managunit.basic, options);
        }
      }
    });

    provide("actives", selected);

    return () => h("div", {class: "component explorer"}, {
      default: () =>
          [
            h(directoryComponent, {...directory.attribute, onSelect: e => selected.value = e}),
            optioned.value &&
            h(defineAsyncComponent(optioned.value.component), {...optioned.value.attribute})
          ]
    })
  }
}