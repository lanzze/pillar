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
    actived: Object
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

    const get = (config, key, def) => {
      return typeof config === "string" ? def : config[key];
    }

    const doModifyChain = ({modify}, model) => {
      Promise.resolve()
          .then(() => {
            let notice = modify.notice;
            if (notice) {
              return context.dispatch("window.once", {
                id: `modify.notice:${context.id}`,
                content: get(notice, "content", notice),
                attribute: {
                  contentClass: get(notice, "color")
                }
              });
            }
          })
          .then(() => modify.handle(model, context))
          .then(() => {
            let inform = modify.inform;
            if (inform) {
              context.commit("notify", {
                title: get(inform, "content"),
                color: get(inform, "color", "info")
              });
            }
          })
          .then(() => modify.update && fetch(1))
          .catch(() => {
            let failed = modify.failed;
            if (failed) {
              context.commit("notify", {
                title: get(failed, "content"),
                color: get(failed, "color", "error")
              });
            }
          });
    }
    const doWindowChain = ({window}, model) => {
      const status = ref(global["modal.icon.submit.saving"]);
      Promise.resolve()
          .then(() => context.dispatch("window.once", {
            id: window.id,
            sizes: window.size,
            content: window.content,
            attribute: {model: window.transform ? window.transform(model) : model},
          }))
          .then(value => {
            if (window.verify) {
              return window.verify(value, context)
                  .then(message => {
                    if (message != null) {
                      return context.commit("notify", {title: message, color: "warning"})
                    }
                  });
            }
          })
          .then(value => {
            if (window.stored) {
              //todo update status
              return window.stored(value, context);
            }
          })
          .then(() => {
            let inform = window.inform;
            if (inform) {
              context.commit("notify", {
                title: get(inform, "content"),
                color: get(inform, "color", "info")
              });
            }
          })
          .then(() => window.update && fetch())
          .catch(() => {
            let failed = window.failed;
            if (failed) {
              context.commit("notify", {
                title: get(failed, "content"),
                color: get(failed, "color", "error")
              });
            }
          })
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
      source.call(null, {actived: props.actived, condition, pagination}, context)
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

    return () => h(resolveComponent("div"), {id: "commons.managunit"}, [
      // render menubar content
      props.menubar &&
      h(resolveComponent("div"),
          {
            class: "explorer.managunit:menubar",
          },
          [defineAsyncComponent(props.menubar.component),
            {
              ...props.menubar.attribute,
              selections,
              data,
              onAction: onActionHandler
            }
          ]
      ),
      // render heading content
      props.heading &&
      h(resolveComponent("div"),
          {
            class: "explorer.managunit:heading",
          },
          [defineAsyncComponent(props.heading.component),
            {
              ...props.heading.attribute,
            }
          ]
      ),
      // render querier content
      props.querier &&
      h(resolveComponent("div"),
          {
            class: "explorer.managunit:querier",
          },
          [defineAsyncComponent(props.querier.component),
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
          ]
      ),
      // render real content
      props.content &&
      h(resolveComponent("div"),
          {
            class: "explorer.managunit:content",
          },
          [defineAsyncComponent(props.content.component),
            {
              ...props.content.attribute,
              selections,
              pagination,
              loading,
              error,
              data,
              onAction: onActionHandler
            }
          ]
      )
    ])
  }
}