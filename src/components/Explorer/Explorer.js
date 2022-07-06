import {ref}                  from "vue";
import {provide}              from "vue";
import {shallowRef}           from "vue";
import {computed, h}          from "vue";
import {defineAsyncComponent} from "vue";

export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const config = props.config, directory = config.directory, managunit = config.managunit;

    let selected = ref(null), itemkey = config.configure.itemkey;
    let optioned = computed(() => {
      if (selected.value != null) {
        let key = itemkey instanceof Function ? itemkey(selected.value) : selected.value[itemkey];
        let options = managunit.items[key];
        if (options !== undefined) {
          return Object.assign({}, managunit.basic, options);
        }
      }
    });

    provide("actives", selected);

    return () => h("div", {class: "component explorer"},
        [
          directory && h(defineAsyncComponent(directory.component),
              {
                ...directory.attribute,
                onSelect: item => selected.value = item
              }
          ),
          optioned.value && h(defineAsyncComponent(optioned.value.component),
              optioned.value.attribute
          )
        ])
  }
}