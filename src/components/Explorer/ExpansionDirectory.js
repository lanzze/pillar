import {ref}              from "vue";
import {onBeforeMount}    from "vue";
import {resolveComponent} from "vue";
import {h, reactive}      from "vue";

export default {
  name: "ExpansionDirectory",
  props: {
    color: String,
    source: [Function, Array],
    mapping: Object
  },
  emits: ["select"],
  setup(props, context) {
    const mapping = props.mapping;
    const loading = ref(false);
    const errored = ref(false);
    const remote = props.source instanceof Function;
    const items = reactive(remote ? [] : props.source.slice());

    const fetch = (item, children) => {
      loading.value = true;
      errored.value = false;
      props.source(item)
          .then(data => children.push(...data))
          .catch(() => errored.value = true)
          .finally(() => loading.value = false);
    }

    const onItemClick = item => {
      let children = item[mapping.items];
      if (children == null && remote) {
        fetch(item, item[mapping.items] = reactive([]));
      }
      context.emit("select", item);
    }

    const convert = (item) => {
      return h(resolveComponent("q-expansion-item"), {
            ...props.native,
            key: item[mapping.value],
            label: item[mapping.label],
            caption: item[mapping.caption],
            icon: item[mapping.icon],
            "active-class": "text--primary",
            "expand-icon-toggle": false,
            "onclick": () => onItemClick(item)
          },
          item[mapping.items] ? item[mapping.items].map(e => convert(e)) : undefined
      );
    }

    onBeforeMount(() => {
      if (remote) fetch(null, items)
    });
    return () => h("div",
        {
          class: "explorer directory expansion"
        },
        [h(resolveComponent("q-list"), items.map(e => convert(e)))]
    );
  }
}