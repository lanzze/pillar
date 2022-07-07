const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]
const columns = [
  {
    name: "seq",
    label: "Seq"
  },
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true,
    render: {
      component: () => import("./HighlightRender.js"),
      attribute: {
        color: "secondary",
        label: v => v.name,
        click: "test"
      }
    }
  },
  {name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true},
  {name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true},
  {name: 'carbs', label: 'Carbs (g)', field: 'carbs'},
  {name: 'protein', label: 'Protein (g)', field: 'protein'},
  {name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
  {name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)},
  {name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)},
  {label: "Action"}
]

/**
 * Define the table header
 */
const dimensions = [
  {
    // unique id
    // identifies column
    // (used by pagination.sortBy, "body-cell-[name]" slot, ...)
    name: 'desc',

    // label for header
    label: 'Dessert (100g serving)',

    // row Object property to determine value for this column
    field: 'name',
    // OR field: row => row.some.nested.prop,

    // (optional) if we use visible-columns, this col will always be visible
    required: true,

    // (optional) alignment
    align: 'left',

    // (optional) tell QTable you want this column sortable
    sortable: true,

    // (optional) compare function if you have
    // some custom data or want a specific way to compare two rows
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    // function return value:
    //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
    //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
    //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first

    // (optional) override 'column-sort-order' prop;
    // sets column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending)
    sortOrder: 'ad', // or 'da'

    // (optional) you can format the data with a function
    format: (val, row) => `${val}%`,
    // one more format example:
    // format: val => val
    //   ? /* Unicode checkmark checked */ "\u2611"
    //   : /* Unicode checkmark unchecked */ "\u2610",

    // body td:
    style: 'width: 500px',
    // or as Function --> style: row => ... (return String/Array/Object)
    classes: 'my-special-class',
    // or as Function --> classes: row => ... (return String)

    // header th:
    headerStyle: 'width: 500px',
    headerClasses: 'my-special-class',

    // Render table cell as a component
    render: {
      component: () => import("./HighlightRender.js"),
      attribute: {
        color: "secondary",
        label: v => v.name,
        click: "action id or an object"
      }
    }
  }
]

/**
 * Define action options.
 * @type Object
 */
const action = {
  id: "test",                                                                            // [Optional] The action id
  label: "Edit",                                                                         // [Optional] The action label
  image: "edit-icon",                                                                    // [Optional] The action icon
  title: "Click to edit the data",                                                       // [Optional] The action title
  color: "primary",                                                                      // [Optional] The action button color
  disable: e => e.editable === false,                                                    // [Optional] Disable/Enable the action button
  visible: e => e.visible === true,                                                      // [Optional] Visible/Invisible the action button
  window: {                                                                              // [Optional] Open a window when action button click
    content: "The open component like:()=>import('./SomeComponent.vue')",                // The component will open
    options: {                                                                           // [Optional] The dialog options
      id: "windowId",                                                                    // [Must] The window id
      title: e => `Edit ${e.name}`,
      sizes: [500, 300],
      maximizer: false
    },
    obtain: (model, store, context) => {                                                 // [Optional] Fetch data form server. Promise
      return store.fetch("/api/loadData");
    },
    stores: (model, store, context) => {                                                 // [Optional] Store data to server. Promise
      return store.fetch("/api/saveData");
    },
    verify: (model, store, context) => {                                                 // [Optional] Validate the data when edited from server or local. Promise
      return store.fetch("/api/verifyData");                                             // If data is invalid, return failed message, otherwise return true or null.
    },
    notice: "This data is locked, you sure to edit it?",                                 // [Optional] Confirm open before window open
    inform: "Save data success!",                                                        // [Optional] Show a message when handle success
    failed: "Save data error, please try again, or connect the manager!",                // [Optional] Show a message when handle failed
    cancel: "The data not save, you sure to exit edit?",                                 // [Optional] Confirm exit when close the opened window
    update: false                                                                       // Specify update the data when handle success

  },
  modify: {                                                                              // [Optional] Modify the row(s) data
    notice: "Are you sure to enable it?",
    inform: "Enable advice success",
    failed: "Failed to enable advice",
    update: false,
    handle: (model, store, context) => {                                                 // Update the row property. Promise
      store.fetch("/api/enableDevice", model.id)
    }
  },
  custom: {                                                                              // [Optional] Do custom handle
    update: true,
    handle: (model, store, context) => {
      store.fetch("/api/updateState", model.id, model.state)
          .then(() => context.commit("notify", "Update success"))
          .catch(() => context.commit("notify", "Update failed"))
    }
  }
}
/**
 * The Explorer component config sample.
 * Each Explorer component include tow component, witch is:
 * * The directory component for navigation.
 * * The management unit component for manage the resource.
 *
 * Usually, The 'attribute' options will bind to component.
 * The 'native' options is the UI-framework component attribute(like button, icon, tabs,...).
 *
 * >
 * We provide some default component, but you can provide otherwise.
 * In the default component(like Managunit.js) we provide come properties, you can inject it.
 * If you provide otherwise component, you must provide those properties too.
 *
 * In some component data, you can provide an object or an array directly, also you can provide a function to load it.
 * Example:
 * ```
 *  property:(model,store,context):Promise<T>{
 *   return store.dispatch("post",model.id)
 *  }
 * ```
 *
 * In some data property, you can provide a field to get form data, also you can provide a function to get it.
 * Example:
 * ```
 *  property:data=>`${data.lastName}:${data.firstName}`
 * ```
 */
export default {
  /**
   * The directory component options
   * @type Object
   */
  directory: {
    component: () => import("./ExpansionDirectory.js"),
    attribute: {
      // The color for directory component
      color: "primary",
      /**
       * The items for directory component. Provide an array or a function.
       * Each item have property like:
       * * label:String the navigation label.
       * * value:any The item value.
       * * items:Array The item children. If item have no children, set to undefined.
       *
       */
      source: [
        {
          value: 1,
          label: "气象快报"
        },
        {
          value: 2,
          label: "水情简报"
        },
        {
          value: 3,
          label: "风险简报"
        }
      ],
      // The source item property mapping
      mapping: {
        label: "label",
        value: "value",
        items: "items"
      },
      native: {}
    }
  },
  /**
   * The Managunit component config.
   * Only to property, witch is:
   * * basic: The basic(default) options.
   * * items: For each navigation item configuration.
   *
   * When navigation changed, will find options from managunit.items and merge with managunit.basic.
   * You can set managunit.items to null, if totally same as basic.
   * Set undefined to ignore this item.
   *
   * The Managunit component have those children components:
   * * menubar: The menu bar for handle the resource.
   * * heading: For show title and subtitle.
   * * querier: For query the resource .
   * * content: For display the resources.
   * * comment: Show some comment at content header.
   * * summary: Show some summary as content footer.
   */
  managunit: {
    basic: {
      component: () => import("./Managunit.js"),
      attribute: {
        menubar: {                                                // [Optional] The menu bar config
          component: () => import("./ClassicMenubar.js"),
          attribute: {
            color: "primary",                                     // [Optional] The menu bar background color
            items: [                                              // The menu items
              {
                label: "添加",
                color: "primary",
                native: {}
              }
            ]
          }
        },
        heading: {                                                // [Optional] The heading config
          component: () => import("./ClassicHeading.js"),
          attribute: {
            title: v => v.label,                                  // The title function for get title from navigation item
            subtitle: v => v.subtitle,                            // [Optional] The subtitle function for get title from navigation item
            color: "primary"                                      // [Optional] The heading background color
          }
        },
        querier: {                                                // [Optional] The querier config
          component: () => import("./ClassicQuerier.js"),
          attribute: {
            color: "primary",                                     // [Optional] The querier background color
            field: "keyword",                                     // The field for keyword condition
            label: "输入关键字",                                    // The keyword input label
            query: "查询",                                         // The query button label
            image: undefined,                                     // [Optional] The query button icon
            queryColor: "primary"                                 // [Optional] The query button color
          }
        },
        content: {                                                // The content config
          component: () => import("./ClassicTableContent.vue"),
          attribute: {
            color: "primary",                                     // [Optional] The content background color
            sequence: true,                                       // [Optional] Specify the table have sequence or not
            actions: [                                            // [Optional] Define table actions.
              {
                id: "test",
                image: undefined,
                title: "",
                label: "Edit",
                color: "primary",
                disable: e => e.calories > 300,
                window: {
                  content: "Hello",
                  cancel: "",
                  obtain: (model, store, context) => {
                    return new Promise(resolve => {
                      setTimeout(resolve, 2000)
                    })
                  },
                  verify: (model, store, context) => {
                    return new Promise(resolve => {
                      setTimeout(resolve, 2000)
                    })
                  },
                  stores: (model, store, context) => {
                    return new Promise(resolve => {
                      setTimeout(resolve, 2000)
                    })
                  },
                  toAttr: model => model,                        // [Optional] Convert the model to component(The opened) attribute
                  sizes: [500, 400]
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
                  handle: (model, store, context) => {
                  }
                }
              },
              {
                id: "custom",
                image: "",
                title: "",
                custom: {
                  update: false,
                  handle: (model, store, context) => {
                    alert(0)
                  }
                }

              }
            ],
            handles: {                                            // [Optional] Define table events
              "row:click": "test",                                // [Optional] Define table row single click, an action id or action object
              "row:dblclick": {}                                  // [Optional] Define table row double click, an action id or action object
            },
            dimensions: columns,                                  // Define table header
            natives: {}                                           // [Optional] The q-table native attribute
          }
        },
        comment: null,                                            // [Optional] The comment config
        summary: null,                                            // [Optional] The summary config
        options: {
          color: "primary",                                       // [Optional] The content background
          immediate: true,                                        // [Optional] Immediate query when navigation changed
          condition: {},                                          // [Optional] The condition object for query resource
          pagination: {page: 1, size: 15, count: 20, length: 10}, // [Optional] The pagination object(length is for max page item)
          /**
           * Load data form remote server by given parameters.
           *
           * The return data can be single list or list+pagination.
           * @param item {Object} The navigation item object.
           * @param condition {Object}
           * @param pagination {Object}
           * @param store {Store}
           * @return Promise<[Array,Object]>
           */
          source: ({item, condition, pagination}, store) => {     // A function to load resources
            // return Promise.resolve({rows:data,page:{page:1,count:10}});
            // return Promise.resolve(rows);
            return Promise.resolve(rows);
          }
        }
      }
    },
    items: {
      [1]: {},                                                     // as basic
      [2]: null                                                    // as basic
    }
  },

  configure: {                                                     // The source item property mapping
    color: "primary",                                              // [Optional] component background color
    itemkey: "value"                                               // The key for item to find options from managunit.items.
  }
}