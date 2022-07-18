import {inject, provide}                        from "vue";
import {reactive, ref}                          from "vue";
import {defineAsyncComponent, resolveComponent} from "vue";
import {h}                                      from "vue";
import {useStore}                               from "vuex";
import global                                   from "../component.options";
import {get}                                    from "./explorer.tools";

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
    const options   = props.options,
          condition = options.condition,
          loading   = ref(false),
          errored   = ref(false),
          selection = reactive([]),
          interceptors = reactive([]),
          data      = {selection};

    const actives      = inject("actives", null),
          store        = useStore();

    provide("selection", selection);
    provide("condition", condition);
    provide("interceptors", interceptors);
    provide("data", data);
    provide("loading", loading);
    provide("errored", errored);

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
      const progress = ref(false);
      const dialog = options.options;
      const submit = reactive({});

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
                  modally: true, content: get(options.cancel, model)
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
              attribute
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

    const fetch = (...args) => {
      loading.value = true;
      errored.value = false;
      const parameter = {actives, condition, ...args};
      Promise.all(interceptors.map(request => request(parameter, store, context)))
          .catch(ex => errored.value = true)
          .finally(() => loading.value = false);
    }

    const onActionHandler = (action, model = data) => {
      if (action.modify) return doModifyChain(action.modify, model);
      if (action.window) return doWindowChain(action.window, model);
      if (action.custom) return doCustomChain(action.custom, model);
    }

    const onQueryHandler = (...args) => fetch(...args);


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
            onQuery: onQueryHandler
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
            onAction: onActionHandler,
            onQuery: onQueryHandler
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