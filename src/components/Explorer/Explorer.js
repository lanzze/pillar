import {h, computed}          from "vue";
import {defineAsyncComponent} from "vue/dist/vue";
import {assign}               from "loadsh"
import {isCssColor}           from "./explorer.tools";

export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const config = props.config, directory = config.directory, managunit = config.managunit;

    let selected = null, itemkey = config.configure.itemkey;
    let optioned = computed(() => {
      if (selected != null) {
        let key = itemkey instanceof Function ? itemkey(selected) : itemkey;
        let options = managunit.items[key];
        if (options != null) {
          return assign({}, managunit.basic, managunit.items[key]);
        }
      }
    });

    const css = isCssColor(config.color);
    return h("div",
        {
          class: `explorer ${css ? undefined : config.color}`,
          style: `background:${css ? css : undefined}`
        },
        [
          directory && h(defineAsyncComponent(directory.component),
              {
                attrs: directory.attribute,
                on: {
                  select: item => selected = item
                }
              }
          ),
          optioned && h(defineAsyncComponent(managunit.component),
              {
                attrs: optioned
              }
          )
        ])
  }
}