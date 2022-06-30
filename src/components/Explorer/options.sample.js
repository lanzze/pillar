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
      }
    },
  },
  managunit: {
    basic: {
      component: () => import(""),
      attribute: {}
    },
    items: {
      [0]: {
        component: () => import(""),
        attribute: {
          menubar: {
            component: () => import(""),
            options: {
              items: [
                {
                  label: "",
                  title: "",
                  color: ""
                }
              ]
            }
          },
          querier: {
            component: () => import(""),
            options: {}
          },
          content: {},

        }
      }
    },
  },
  options: {
    itemkey: "id"
  }
}