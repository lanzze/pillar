import {h, computed}          from "vue";
import {defineAsyncComponent} from "vue/dist/vue";
import {assign}               from "loadsh"

export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const config = props.config, directory = config.directory, managunit = config.managunit;

    let selected = null, itemkey = config.options.itemkey;
    let optioned = computed(() => {
      if (selected != null) {
        let key = itemkey instanceof Function ? itemkey(selected) : itemkey;
        let options = managunit.items[key];
        if (options != null) {
          return assign({}, managunit.basic, managunit.items[key]);
        }
      }
    });

    return h("div",
        {class: "commons component explorer"},
        [
          h(defineAsyncComponent(directory.component),
              {
                attrs: directory.attribute,
                on: {
                  select: item => selected = item
                }
              }),
          optioned ? h(defineAsyncComponent(managunit.component),
                  {
                    attrs: optioned
                  })
              : undefined
        ])
  }
}