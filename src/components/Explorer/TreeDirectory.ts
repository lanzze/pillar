import {defineComponent}    from "vue";
import {h}                  from "vue";
import {resolveComponent}   from "vue";
import {onMounted}          from "vue";
import {shallowReactive}    from "vue";
import {ref}                from "vue";
import {getCurrentInstance} from "vue";

export default defineComponent({
  name: "TreeDirectory",
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
    trigger: {
      type: String,
      default: "leaf",
    },
  },
  emits: ["select"],
  setup(props, context) {
    const mapping: any = props.mapping,
          actives: any = ref(props.actives || null),
          nodes: any[] = shallowReactive([]),
          the: any     = getCurrentInstance();

    const load = ({node, done, fail}) => {
      if (props.source instanceof Function) {
        props.source.call(this, node).then(data => done(data)).catch(fail);
      } else {
        done([]);
      }
    }

    const onSelectedHandler = key => {
      let node = the.refs.tree.getNodeByKey(actives.value = key);
      if (props.trigger === "leaf" && (node == null || (node.lazy === true || !!node[mapping.nodes]))) {
        return;
      }
      context.emit("select", node);
    }

    onMounted(() => {
      console.log("dir-mounted")
      Promise.resolve(props.source)
          .then(source => {
            if (source instanceof Function) {
              return source.call(this);
            }
            return source;
          })
          .then((data = []) => nodes.push(...data))
          .then(() => onSelectedHandler(actives.value));
    });

    return () => h("div", {class: "component directory tree"},
        [
          h("div", {class: "dir--expansion"}),
          h(resolveComponent("q-tree"), {
            ref: "tree",
            nodes: nodes,
            selected: actives.value,
            nodeKey: mapping.value,
            labelKey: mapping.label,
            childrenKey: mapping.nodes,
            "onLazyLoad": load,
            "onUpdate:selected": onSelectedHandler,
          }),
        ])
  },
})