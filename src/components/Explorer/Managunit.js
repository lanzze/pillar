import {inject}                                 from "vue";
import {provide}                                from "vue";
import {reactive, ref}                          from "vue";
import {defineAsyncComponent, resolveComponent} from "vue";
import {h}                                      from "vue";
import {onMounted}                              from "vue";
import {useStore}                               from "vuex";
import {get}                                    from "./explorer.tools";
import global                                   from "../component.options";

export default {
  props: {
    menubar: Object,
    heading: Object,
    querier: Object,
    comment: Object,
    content: Object,
    summary: Object,
    options: Object
  },
  setup(props, context) {
    const options    = props.options,
          source     = options.source,
          condition  = options.condition,
          pagination = options.pagination,
          loading    = ref(false),
          errored    = ref(false),
          selection  = reactive([]),
          data       = Array.isArray(source) ? source : reactive([]);

    const actives = inject("actives", null);
    const store = useStore();

    provide("selection", selection);
    provide("condition", condition);
    provide("pagination", pagination);
    provide("loading", loading);
    provide("errored", errored);
    provide("data", data);


    const doModifyChain = (options, model) => {
      Promise.resolve()
          .then(() => {
            if (options.notice) {
              return store.dispatch("window.once", {modally: true, content: options.notice});
            }
          })
          .then(() => options.handle(model, store))
          .then(() => {
            if (options.inform) {
              store.commit("notify", {title: get(options.inform, model), color: "success"});
            }
          })
          .then(() => options.update && fetch())
          .catch(() => {
            if (options.failed) {
              store.commit("notify", {title: get(options.failed, model), color: "error"});
            }
          });
    }
    const doWindowChain = (options, model) => {
      const attribute = reactive({});
      const submit = reactive({});
      const progress = ref(false);

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
                    .then(() => options.verify(value, context))
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
                    .then(() => options.stores(value, context))
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
              store.dispatch("window.hide", options.id);
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
        Promise.reject()
            .then(() => {
              if (options.cancel) {
                return store.dispatch("window.once", {
                  modally: true, content: get(options.cancel, model)
                })
              }
            })
            .then(() => {
              store.dispatch("window.hide", options.id)
            })
      }

      Promise.resolve()
          .then(() => {
            store.dispatch("window.open", {
              id: options.id,
              title: get(options.title, model),
              sizes: options.sizes,
              content: options.content,
              onSubmit: doSubmitChain,
              onCancel: doCancelChain,
              submit,
              progress,
              attribute
            })
          })
          .then(() => {
            if (options.obtain) {
              return Promise.resolve(progress.value = true)
                  .then(() => options.obtain(model, store))
                  .finally(() => progress.value = false);
            }
            return model;
          })
          .then(value => {
            return options.toAttr ? options.toAttr(value) : {value};
          })
          .then(attrs => Object.assign(attribute, attrs));
    }
    const doCustomChain = (options, model) => {
      Promise.resolve(options.handle(model, store))
          .then(() => options.update && fetch());
    }

    const onActionHandler = (action, model = selection) => {
      if (action.modify) return doModifyChain(action.modify, model);
      if (action.window) return doWindowChain(action.window, model);
      if (action.custom) return doCustomChain(action.custom, model);
    }

    const fetch = (page, size) => {
      if (!(source instanceof Function)) return;
      if (pagination && page > 0) pagination.page = page;
      if (pagination && size > 0) pagination.size = size;

      loading.value = true;
      errored.value = false;
      source.call(null, {actives, condition, pagination}, context)
          .then(ret => {
            const list = Array.isArray(ret) ? ret[0] : ret;
            const page = Array.isArray(ret) ? ret[1] : null;
            data.splice(0, data.length, ...list);
            if (page && pagination) {
              pagination.count = page.count;
              pagination.total = page.total;
            }
          })
          .catch(ex => errored.value = true)
          .finally(() => loading.value = false);
    }

    onMounted(() => {
      if (source instanceof Function && options.immediate) fetch(1);
    });

    return () => h(resolveComponent("div"), {class: "component managunit"},
        [
          // render menubar content
          props.menubar &&
          h(defineAsyncComponent(props.menubar.component), {
            ...props.menubar.attribute,
            onAction: onActionHandler
          }),
          // render heading content
          props.heading &&
          h(defineAsyncComponent(props.heading.component), {
            ...props.heading.attribute
          }),
          // render querier content
          props.querier &&
          h(defineAsyncComponent(props.querier.component), {
            ...props.querier.attribute,
            onAction: onActionHandler,
            onQuery: fetch
          }),
          // render comment content
          props.comment &&
          h(defineAsyncComponent(props.comment.component), {
            ...props.comment.attribute,
            onAction: onActionHandler
          }),
          // render real content
          h(defineAsyncComponent(props.content.component), {
            ...props.content.attribute,
            onAction: onActionHandler
          }),
          // render summary content
          props.summary &&
          h(defineAsyncComponent(props.summary.component), {
            ...props.summary.attribute,
            onAction: onActionHandler
          })
        ])
  }
}