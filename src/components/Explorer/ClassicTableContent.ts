import {computed}             from "vue";
import {h, ref}               from "vue";
import {inject, reactive}     from "vue";
import {shallowRef}           from "vue";
import {shallowReactive}      from "vue";
import {defineAsyncComponent} from "vue";
import {defineComponent}      from "vue";
import {onMounted}            from "vue";
import {ShallowReactive}      from "vue";
import {Ref}                  from "vue";
import Stateful               from "../Stateful";

const defaultContent = () => import("../Table");

export default defineComponent({
  name: "ClassicTableContent",
  components: {Stateful},
  props: {
    source: [Array, Function],
    content: Function,
    natives: Object,
    actions: Array,
    handles: Object,
    identity: String,
    visibles: Array,
    dimensions: Array,
    pagination: Object,
    selective: String,
  },
  emits: ["query", "action"],
  setup(props, context) {
    const source: any[] | Function | undefined = props.source,
          selection: ShallowReactive<any[]>    = inject("selection", []),
          completed: Function | null           = inject("completed", null),
          interceptors: Function[] | null      = inject("interceptors", []),
          loading: Ref<boolean>                = inject("loading", ref(false)),
          errored: Ref<boolean>                = inject("errored", ref(false)),
          query: any                           = inject("query", {}),
          dimensions: Ref<any[]>               = shallowRef(props.dimensions || []),
          list: ShallowReactive<any[]>         = shallowReactive(Array.isArray(source) ? source : []),
          pagination: any                      = reactive(<object>props.pagination);

    // @ts-ignore
    const content = defineAsyncComponent(props.content || defaultContent);

    const fetch = (query, store) => {
      if (source instanceof Function) {
        return source(query, store)
            .then(dat => {
              let rows = dat && "source" in dat ? dat.source : dat;
              let page = dat && "pagination" in dat ? dat.pagination : null;
              let dims = dat && "dimensions" in dat ? dat.dimensions : null;
              if (rows) list.splice(0, list.length, ...rows);
              if (page) Object.assign(pagination, page);
              if (dims) dimensions.value = dims;
            })
      }
    }

    const onActionHandler = (row, action) => {
      if (typeof action === "string") {
        action = props.actions?.find((e: any) => e.id === action);
      }
      if (action != null) {
        context.emit("action", action, row)
      }
    };
    const onTableEvent = (name, row) => {
      let handler = props.handles && props.handles[name];
      if (typeof handler === "string") {
        handler = props.actions?.find((e: any) => e.id === handler);
      }
      if (handler != null) context.emit("action", handler, row)
    };

    const onPageUpdate = page => context.emit("query", query.pagination.page = page);

    const state = computed(() => {
      if (loading.value) return null;
      if (errored.value) return "error";
      if (!list?.length) return "empty";
    });

    Object.assign(query, {pagination: {page: pagination.page, size: pagination.size}});

    if (source instanceof Function) interceptors.push(fetch);

    if (completed != null) onMounted(completed);

    // @ts-ignore
    return () => h(Stateful, {value: state.value},
        () => h(content, {
          class: "managunit--content classic",
          pagination,
          selection,
          source: list,
          dimensions: dimensions.value,
          actions: props.actions,
          visibles: props.visibles,
          selective: props.selective,
          identity: props.identity,
          natives: props.natives,
          onAction: onActionHandler,
          "onTable:click": onTableEvent,
          "onUpdate:page": onPageUpdate,
        }))
  },
})
