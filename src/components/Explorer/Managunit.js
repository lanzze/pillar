import {reactive, ref}                          from "vue";
import {defineAsyncComponent, resolveComponent} from "vue";
import {h}                                      from "vue";
import {onMounted}                              from "vue";
import global                                   from "../component.options";

export default {
  props: {
    menubar: Object,
    heading: Object,
    querier: Object,
    content: Object,
    options: Object,
    actives: Object
  },
  setup(props, context) {
    const options    = props.options,
          source     = options.source,
          condition  = options.condition,
          pagination = options.pagination,
          loading    = ref(false),
          errored    = ref(false),
          data       = Array.isArray(source) ? source : reactive([]);
    const selections = reactive([]);

    const get = (target, ...args) => {
      return target instanceof Function ? target(...args) : target;
    }

    const doModifyChain = (action, model) => {
      Promise.resolve()
          .then(() => {
            if (action.notice) {
              return context.dispatch("window.once", {modally: true, content: action.notice});
            }
          })
          .then(() => action.handle(model, context))
          .then(() => {
            if (action.inform) {
              context.commit("notify", {title: get(action.inform, model), color: "success"});
            }
          })
          .then(() => action.update && fetch())
          .catch(() => {
            if (action.failed) {
              context.commit("notify", {title: get(action.failed, model), color: "error"});
            }
          });
    }
    const doWindowChain = (action, model) => {
      const attribute = reactive({});
      const submit = reactive({});
      const progress = ref(false);

      const doSubmitChain = value => {
        Promise.resolve()
            .then(() => {
              if (action.verify) {
                return Promise.resolve()
                    .then(() => {
                      progress.value = true;
                      submit.image = global["modal.submit.image.validating"];
                      submit.label = global["modal.submit.label.validating"];
                    })
                    .then(() => action.verify(value, context))
                    .then(message => {
                      if (message != null) {
                        return Promise.reject(message);
                      }
                    });
              }
            })
            .then(() => {
              if (action.stores) {
                return Promise.resolve()
                    .then(() => {
                      progress.value = true;
                      submit.image = global["modal.submit.image.saving"];
                      submit.label = global["modal.submit.label.saving"];
                    })
                    .then(() => action.stores(value, context))
                    .then(message => {
                      if (message != null) {
                        return Promise.reject(message);
                      }
                    });
              }
            })
            .then(() => {
              if (action.inform) {
                context.commit("notify", {title: action.inform, color: "info"});
              }
              context.dispatch("window.hide", action.id);
            })
            .then(() => action.update && fetch())
            .catch(error => {
              if (error != null) {
                context.commit("notify", {title: error, color: "error"});
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
              if (action.cautious) {
                return context.dispatch("window.once", {
                  modally: true, content: get(action.cautious, model)
                })
              }
            })
            .then(() => {
              context.dispatch("window.hide", action.id)
            })
      }

      Promise.resolve()
          .then(() => {
            context.dispatch("window.open", {
              id: action.id,
              title: get(action.title, model),
              sizes: action.sizes,
              content: action.content,
              onSubmit: doSubmitChain,
              onCancel: doCancelChain,
              submit,
              progress,
              attribute
            })
          })
          .then(() => {
            if (action.obtain) {
              return Promise.resolve(progress.value = true)
                  .then(() => action.obtain(model, context))
                  .finally(() => progress.value = false);
            }
            return model;
          })
          .then(value => Object.assign(attribute, value));
    }

    const doCustomChain = (action, model) => {
      Promise.resolve(action.handle(model, context))
          .then(() => action.update && fetch());
    }

    const onActionHandler = (action, model = selections) => {
      if (action.handle === "modify") return doModifyChain(action, model);
      if (action.handle === "window") return doWindowChain(action, model);
      if (action.handle === "custom") return doCustomChain(action, model);
    }

    const fetch = (page, size) => {
      if (!(source instanceof Function)) return;
      if (pagination && page > 0) pagination.page = page;
      if (pagination && size > 0) pagination.size = size;

      loading.value = true;
      errored.value = false;
      source.call(null, {actives: props.actives, condition, pagination}, context)
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

    return () => h(resolveComponent("div"), {class: "explorer__managunit"},
        [
          // render menubar content
          props.menubar &&
          h(defineAsyncComponent(props.menubar.component), {
            ...props.menubar.attribute,
            selections,
            data,
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
            condition,
            selections,
            loading,
            errored,
            data,
            onAction: onActionHandler,
            onQuery: fetch
          }),
          // render real content
          h(defineAsyncComponent(props.content.component), {
            ...props.content.attribute,
            selections,
            pagination,
            loading,
            errored,
            data,
            onAction: onActionHandler
          })
        ])
  }
}