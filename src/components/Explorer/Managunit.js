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
          error      = ref(false),
          data       = Array.isArray(source) ? source : reactive([]);
    const selections = reactive([]);

    const get = (target, ...args) => {
      return target instanceof Function ? target(...args) : target;
    }

    const doModifyChain = ({modify}, model) => {
      Promise.resolve()
          .then(() => {
            if (modify.notice) {
              return context.dispatch("window.once", {
                modally: true,
                content: modify.notice
              });
            }
          })
          .then(() => modify.handle(model, context))
          .then(() => {
            if (modify.inform) {
              context.commit("notify", {
                title: get(modify.inform, model),
                color: "success"
              });
            }
          })
          .then(() => modify.update && fetch(1))
          .catch(() => {
            if (modify.failed) {
              context.commit("notify", {
                title: get(modify.failed, model),
                color: "error"
              });
            }
          });
    }
    const doWindowChain = ({window}, model) => {
      const submit = reactive({});
      const doSubmitChain = value => {
        Promise.resolve()
            .then(() => {
              submit.image = global["modal.submit.image.saving"];
              submit.label = global["modal.submit.label.saving"];
            })
            .then(() => {
              if (window.verify) {
                return window.verify(value, context)
                    .then(message => {
                      if (message != null) {
                        return Promise.reject(message);
                      }
                    });
              }
            })
            .then(() => {
              if (window.stored) {
                return window.stored(value, context);
              }
            })
            .then(() => {
              if (window.inform) {
                context.commit("notify", {title: window.inform, color: "info"});
              }
            })
            .catch(error => {
              if (error != null) {
                context.commit("notify", {title: error, color: "error"});
              }
            })
            .finally(() => {
              // todo cancel loading
            })
      }
      const doCancelChain = () => {
        Promise.reject()
            .then(() => {
              if (window.careful) {
                return context.dispatch("window.once", {
                  modally: true,
                  content: get(window.careful, model)
                })
              }
            })
            .then(() => {
              context.dispatch("window.hide", window.id)
            })
      }
      context.dispatch("window.open", {
        id: window.id,
        title: get(window.title, model),
        sizes: window.sizes,
        content: window.content,
        submit,
        onSubmit: doSubmitChain,
        onCancel: doCancelChain,
        attribute: {
          value: window.transform ? window.transform(model) : model,
          ...window.attribute
        },
      });
    }
    const doCustomChain = ({handle}, model) => {
      handle(model, context, fetch);
    }

    const onActionHandler = (action, model = selections) => {
      if (action.modify) return doModifyChain(action, model);
      if (action.window) return doWindowChain(action, model);
      if (action.handle) return doCustomChain(action, model);
    }

    const fetch = (page, size) => {
      if (!(source instanceof Function)) return;
      if (pagination && page > 0) pagination.page = page;
      if (pagination && size > 0) pagination.size = size;

      loading.value = true;
      error.value = false;
      source.call(null, {actives: props.actives, condition, pagination}, context)
          .then(ret => {
            const lists = Array.isArray(ret) ? ret[0] : ret;
            const paged = Array.isArray(ret) ? ret[1] : null;
            data.splice(0, data.length, ...lists);
            if (paged && pagination) {
              pagination.count = paged.count;
              pagination.total = paged.total;
            }
          })
          .catch(ex => error.value = true)
          .finally(() => loading.value = false);
    }

    onMounted(() => {
      if (source instanceof Function && options.immediate) fetch();
    });

    return () => h(resolveComponent("div"), {class: "explorer__managunit"}, [
      // render menubar content
      props.menubar &&
      h(defineAsyncComponent(props.menubar.component),
          {
            ...props.menubar.attribute,
            selections,
            data,
            onAction: onActionHandler
          }
      ),
      // render heading content
      props.heading &&
      h(defineAsyncComponent(props.heading.component),
          {
            ...props.heading.attribute
          }
      ),
      // render querier content
      props.querier &&
      h(defineAsyncComponent(props.querier.component),
          {
            ...props.querier.attribute,
            condition,
            selections,
            loading,
            error,
            data,
            onAction: onActionHandler,
            onQuery: fetch
          }
      ),
      // render real content
      h(defineAsyncComponent(props.content.component),
          {
            ...props.content.attribute,
            selections,
            pagination,
            loading,
            error,
            data,
            onAction: onActionHandler
          }
      )
    ])
  }
}