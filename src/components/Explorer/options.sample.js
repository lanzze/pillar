export default {
  directory: {
    component: () => import(""),
    attribute: {
      source: item => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve([
              {
                label: Math.random()
              },
              {
                label: Math.random()
              },
              {
                label: Math.random()
              }
            ])
          }, 500)
        })
      },
      mapping: {
        label: "label",
        value: "value",
        items: "items",
        caption: null
      },
    },
  },
  managunit: {
    basic: {
      component: () => import(""),
      attribute: {
        heading: {
          component: {},
          attribute: {
            title: "get form item",
            subtitle: ""
          }
        },
        menubar: {
          component: () => import(""),
          options: {
            items: [
              {
                label: "",
                title: "",
                color: "",
                native: {}
              }
            ]
          }
        },
        querier: {
          component: () => import(""),
          attribute: {
            mapping: {
              keyword: "keyword"
            }
          }
        },
        content: {
          component: () => import("./TableContent.vue"),
          attribute: {
            actions: [
              {
                id: "test",
                window: {
                  stored: (model, context) => {

                  },
                  verify: () => {

                  },
                  careful: ""
                },
                modify: {
                  notice: "",
                  inform: "",
                  failed: "",
                  update: false,
                  handle: (model, context) => {

                  }
                },
                handle: (model, context, refresh) => {

                }
              }
            ],
            natives: {}
          }
        },
        options: {
          immediate: true,
          condition: {},
          pagination: {},
          source: ({item, condition, pagination}, store) => {
            return Promise.resolve([1, 2, 3]);
          }
        }
      },
    },
    items: {
      [0]: {} // as basic
    },
  },
  configure: {
    itemkey: "id",
  }
}