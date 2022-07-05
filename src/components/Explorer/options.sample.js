export default {
  directory: {
    component: () => import("./ExpansionDirectory.js"),
    attribute: {
      color: "primary",
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
        items: "items"
      }
    }
  },
  managunit: {
    basic: {
      component: () => import("./Managunit.js"),
      attribute: {
        heading: {
          component: () => import("./ClassicHeading.js"),
          attribute: {
            title: "get form item",
            subtitle: "",
            color: "primary"
          }
        },
        menubar: {
          component: () => import("./ClassicMenubar.js"),
          attribute: {
            color: "primary",
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
          component: () => import("./ClassicQuerier.js"),
          attribute: {
            color: "primary",
            mapping: {
              keyword: "keyword"
            },
            natives: {
              keyword: {},
              query: {}
            }
          }
        },
        content: {
          component: () => import("./ClassicTableContent.vue"),
          attribute: {
            color: "primary",
            actions: [
              {
                id: "test",
                image: "",
                title: "",
                window: {
                  obtain: (model, context) => Promise.resolve(model),
                  stores: (model, context) => {
                  },
                  verify: (model, context) => {
                  },
                  cautious: ""
                }
              },
              {
                id: "modify",
                image: "",
                title: "",
                modify: {
                  notice: "",
                  inform: "",
                  failed: "",
                  update: false,
                  handle: (model, context) => {
                  }
                }
              },
              {
                id: "custom",
                image: "",
                title: "",
                handle: (model, context) => {

                }
              }
            ],
            natives: {},
            handles: {
              "row:click": {},
              "row:dblclick": {}
            },
            dimensions: [
              {
                render: {
                  component: "q-btn"
                }
              }
            ]
          }
        },
        options: {
          color: "primary",
          immediate: true,
          condition: {},
          pagination: {},
          source: ({item, condition, pagination}, store) => {
            return Promise.resolve([1, 2, 3]);
          }
        }
      }
    },
    items: {
      [0]: {} // as basic
    }
  },
  configure: {
    color: "primary",
    itemkey: "id"
  }
}