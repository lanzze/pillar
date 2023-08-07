import {resolveComponent} from "vue";
import {defineComponent}  from "vue";
import {ref, h}           from "vue";
import {shallowRef}       from "vue";
import {onMounted}        from "vue";
import {Ref}              from "vue";
import {ShallowRef}       from "vue";
import {shallowReactive}  from "vue";
import options            from "../options";


export default defineComponent({
  name: "ExpansionDirectory",
  props: {
    source: {
      type: [Function, Array],
      required: true,
    },
    mapping: {
      type: Object,
      required: true,
    },
    actives: [String, Number],
    natives: Object,
  },
  emits: ["select"],
  setup(props, context) {
    const mapping: any          = props.mapping,
          loading: Ref<boolean> = ref(false),
          errored: Ref<boolean> = ref(false),
          actives: ShallowRef   = shallowRef(null),
          nodes: any[]          = shallowReactive([]),
          opens: Set<any>       = new Set();

    const lockdown = (nodes: any[], parent?: any) => {
      for (let i = 0, ii = nodes.length; i < ii; i++) {
        let node = nodes[i];
        if (node[props.mapping.nodes] != null) {
          lockdown(node[props.mapping.nodes], node);
        } else {
          if (node[mapping.value] === props.actives || props.actives == null) {
            actives.value = node;
            opens.add(parent);
            break;
          }
        }
      }
    }

    const convert = (node, level = 1) => {
      if (node[mapping.nodes] === undefined) {
        return h(resolveComponent("q-item"),
            {
              ...props.natives?.leaf,
              class: `dir--node leaf level-${level} ${actives.value === node ? 'active' : ''}`,
              clickable: true,
              onClick: () => context.emit("select", actives.value = node),
            },
            () => h(resolveComponent("q-item-section"), {}, node[mapping.label]));
      }
      return h(resolveComponent("q-expansion-item"), {
            ...props.natives?.node,
            headerClass: `dir--node level-${level}`,
            key: node[mapping.value],
            label: node[mapping.label],
            caption: node[mapping.caption],
            icon: node[mapping.image],
            modelValue: opens.has(node),
          },
          () => node[mapping.nodes]
              ? node[mapping.nodes].map(e => convert(e, level + 1))
              : undefined,
      );
    }

    onMounted(() => {
      Promise.resolve(props.source)
          .then(source => {
            if (source instanceof Function) {
              return Promise.resolve(loading.value = !(errored.value = false))
                  .then(() => source.call(this))
                  .catch(() => errored.value = true)
                  .finally(() => loading.value = false);
            }
            return source;
          })
          .then((data: any[] = []) => nodes.push(...data))
          .then(() => lockdown(nodes))
          .then(() => context.emit("select", actives.value));
    });

    return () => h("div",
        {
          class: "component directory expansion",
        },
        [
          h(resolveComponent("q-linear-progress"), {
            ...props.natives?.progress,
            class: "dir--progress",
            indeterminate: true,
            hidden: !loading.value,
          }),
          h("div", {class: "dir--empty", hidden: nodes.length}, options["empty.text"]),
          h(resolveComponent("q-list"), props.natives?.list, () => nodes.map(e => convert(e))),
        ],
    );
  },
})