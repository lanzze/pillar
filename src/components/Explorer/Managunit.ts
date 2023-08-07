import {defineAsyncComponent} from "vue";
import {defineComponent}      from "vue";
import {inject, provide}      from "vue";
import {reactive, ref, unref} from "vue";
import {shallowReactive}      from "vue";
import {shallowRef}           from "vue";
import {h, watch}             from "vue";
import {Ref}                  from "vue";
import {ShallowRef}           from "vue";
import {useStore, Store}      from "vuex";
import global                 from "../options";
import {get}                  from "./tools.explorer";

export default defineComponent({
  name: "Managunit",
  props: {
    catalog: Object,
    menubar: Object,
    heading: Object,
    querier: Object,
    comment: Object,
    content: Object,
    summary: Object,
    options: Object,
    details: Object,
  },
  setup(props, context) {
    const options: any          = props.options,
          store: Store<any>     = useStore(),
          interceptors: []      = [],
          condition: any        = reactive(options.condition),
          selection: []         = shallowReactive([]),
          loading: Ref<boolean> = ref(false),
          errored: Ref<boolean> = ref(false),
          current: ShallowRef   = shallowRef(null),
          node: any             = shallowRef(null),
          unit: any             = inject("unit", null),
          data: any             = {selection},
          query: any            = {condition};

    let counter = 0;
    const total = Object.values(props).map((item: any) => item?.intercept).reduce((p, v) => p + (v || 0), 0);
    const onCompleted = () => {
      if (++counter >= total && options.immediate) {
        fetch();
      }
    }

    watch(unit, () => query.unit = unref(unit), {immediate: true});

    provide("interceptors", interceptors);
    provide("selection", selection);
    provide("condition", condition);
    provide("completed", onCompleted);
    provide("current", current);
    provide("loading", loading);
    provide("errored", errored);
    provide("query", query);
    provide("node", node);
    provide("data", data);

    const doModifyChain = (options, model) => {
      Promise.resolve()
          .then(() => {
            if (options.notice) {
              return store.dispatch("window.once", {modally: true, content: options.notice});
            }
          })
          .then(() => options.handle(model, store, context))
          .then(() => {
            if (options.inform) {
              store.dispatch("notify", {title: get(options.inform, model), color: "success"});
            }
          })
          .then(() => options.update && fetch())
          .catch(() => {
            if (options.failed) {
              store.dispatch("notify", {title: get(options.failed, model), color: "error"});
            }
          });
    }
    const doWindowChain = (options, model) => {
      const dialog    = options.options,
            attribute = reactive({}),
            progress  = ref(false),
            submit    = reactive<any>({});

      const doSubmitChain = value => {
        Promise.resolve()
            .then(() => {
              if (options.verify) {
                return Promise.resolve()
                    .then(() => {
                      progress.value = true;
                      submit.image = global["modal.submit.image.validating"];
                      submit.label = global["modal.submit.label.validating"];
                    })
                    .then(() => options.verify(value, store, context))
                    .then(message => {
                      if (message != null) {
                        return Promise.reject(message);
                      }
                    });
              }
            })
            .then(() => {
              if (options.stores) {
                return Promise.resolve()
                    .then(() => {
                      progress.value = true;
                      submit.image = global["modal.submit.image.saving"];
                      submit.label = global["modal.submit.label.saving"];
                    })
                    .then(() => options.stores(value, store, context))
                    .then(message => {
                      if (message != null) {
                        return Promise.reject(message);
                      }
                    });
              }
            })
            .then(() => {
              if (options.inform) {
                store.commit("notify", {title: options.inform, color: "info"});
              }
              store.dispatch("window.hide", dialog.id);
            })
            .then(() => options.update && fetch())
            .catch(error => {
              if (error != null) {
                store.commit("notify", {title: error, color: "error"});
              }
            })
            .finally(() => {
              progress.value = false;
              submit.image = global["modal.submit.image"];
              submit.label = global["modal.submit.label"];
            })
      }
      const doCancelChain = () => {
        Promise.resolve()
            .then(() => {
              if (options.cancel) {
                return store.dispatch("window.once", {
                  modally: true, content: get(options.cancel, model),
                })
              }
            })
            .then(() => store.dispatch("window.hide", options.id))
      }

      Promise.resolve()
          .then(() => {
            store.dispatch("window.open", {
              id: dialog?.id,
              title: get(dialog?.title, model),
              sizes: dialog?.sizes,
              content: options.content,
              onSubmit: doSubmitChain,
              onCancel: doCancelChain,
              prevent: true,
              submit,
              progress,
              attribute,
            })
          })
          .then(() => {
            if (options.obtain) {
              return Promise.resolve()
                  .then(() => {
                    progress.value = true;
                    submit.label = global["modal.submit.label.loading"];
                    submit.image = global["modal.submit.image.loading"];
                  })
                  .then(() => options.obtain(model, store, context))
                  .finally(() => {
                    progress.value = false;
                    submit.label = global["modal.submit.label"];
                    submit.image = global["modal.submit.image"];
                  });
            }
            return model;
          })
          .then(value => {
            return options.toAttr ? options.toAttr(value) : {value};
          })
          .then(attrs => Object.assign(attribute, attrs));
    }
    const doCustomChain = (options, model) => {
      Promise.resolve(options.handle(model, store, context))
          .then(() => options.update && fetch());
    }

    const fetch = (none?: any) => {
      loading.value = true;
      errored.value = false;
      Promise.all(interceptors.map((request: Function) => request(query, store, context)))
          .catch(ex => errored.value = true)
          .finally(() => loading.value = false);
    }

    const onActionHandler = (action, model = data) => {
      if (action.modify) return doModifyChain(action.modify, model);
      if (action.window) return doWindowChain(action.window, model);
      if (action.custom) return doCustomChain(action.custom, model);
    }

    const onQueryHandler = () => fetch();

    const onCatalogHandler = item => fetch(query.node = node.value = item)


    return () => h("div", {class: "component managunit"},
        [
          props.catalog &&
          h(defineAsyncComponent(props.catalog.component), {
            ...props.catalog.attribute,
            class: "managunit--catalog",
            onSelect: onCatalogHandler,
          }),
          h("div", {class: "managunit--center"},
              [
                // render menubar content
                props.menubar &&
                h(defineAsyncComponent(props.menubar.component), {
                  ...props.menubar.attribute,
                  onAction: onActionHandler,
                }),
                // render heading content
                props.heading &&
                h(defineAsyncComponent(props.heading.component), {
                  ...props.heading.attribute,
                }),
                // render querier content
                props.querier &&
                h(defineAsyncComponent(props.querier.component), {
                  ...props.querier.attribute,
                  onAction: onActionHandler,
                  onQuery: onQueryHandler,
                }),
                // render comment content
                props.comment &&
                h(defineAsyncComponent(props.comment.component), {
                  ...props.comment.attribute,
                  onAction: onActionHandler,
                }),
                // render real content
                h(defineAsyncComponent(props.content?.component), {
                  ...props.content?.attribute,
                  onAction: onActionHandler,
                  onQuery: onQueryHandler,
                  onSelect: model => current.value = model,
                }),
                // render summary content
                props.summary &&
                h(defineAsyncComponent(props.summary.component), {
                  ...props.summary.attribute,
                  onAction: onActionHandler,
                }),
              ],
          ),
          props.details &&
          h(defineAsyncComponent(props.details.component), {
            ...props.details.attribute,
            class: "managunit--details",
            onQuery: onQueryHandler,
            onAction: onActionHandler,
          }),
        ],
    )
  },
})