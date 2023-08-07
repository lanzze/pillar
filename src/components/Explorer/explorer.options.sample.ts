const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
]

const columns = [
  {
    name: "index",
    label: "Index",
    render: "index",
  },
  {
    required: true,
    name: 'name',
    sort: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    order: 1,
    render: {
      component: () => import("../Table/cells/Cell.Chip"),
      attribute: {
        color: "secondary",
        label: v => v.name,
        click: "test",
      },
    },
  },
  {name: 'calories', align: 'center', label: 'Calories', field: 'calories', sort: (a, b) => a.calories - b.calories},
  {name: 'fat', label: 'Fat (g)', field: 'fat'},
  {name: 'carbs', label: 'Carbs (g)', field: 'carbs'},
  {name: 'protein', label: 'Protein (g)', field: 'protein'},
  {name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
  {name: 'calcium', label: 'Calcium (%)', field: 'calcium'},
  {name: 'iron', label: 'Iron (%)', field: 'iron'},
  {label: "Action", render: "action"},
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
    // or a function
    label: 'Dessert (100g serving)',

    // row Object property to determine value for this column
    field: 'name',
    // OR field: row => row.some.nested.prop,

    // (optional) if we use visible-columns, this col will always be visible
    required: true,

    // (optional) alignment
    align: 'left',

    // (optional) compare function if you have
    // some custom data or want a specific way to compare two rows
    // function return value:
    //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
    //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
    //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first
    sort: (rowA, rowB, order) => 0,

    // (optional) override 'column-sort-order' prop;
    // sets column sort order: 1 (ascending-descending) or -1 (descending-ascending)
    order: 1, // or -1 or 0
    // or as Function --> style: row => ... (return String/Array/Object)
    classes: 'my-special-class',
    // or as Function --> classes: row => ... (return String)

    headerClass: "",

    // Render table cell as a component
    render: {
      component: () => import("../Table/cells/Cell.Chip"),
      attribute: {
        color: "secondary",
        label: v => v.name,
        click: "action id or an object",
      },
    },
  },
]

/**
 * Define action options.
 * @type Object
 */
const action = {
  // [Optional] The action id
  id: "test",
  // [Optional] The action label
  label: "Edit",
  // [Optional] The action icon
  image: "edit-icon",
  // [Optional] The action title
  title: "Click to edit the data",
  // [Optional] The action button color
  color: "primary",
  // [Optional] Disable/Enable the action button
  disable: e => e.editable === false,
  // [Optional] Visible/Invisible the action button
  visible: e => e.visible === true,
  // [Optional] Open a window when action button click
  window: {
    // The component or a string text(support HTML text) for open
    content: "The open component like:()=>import('./SomeComponent.vue')",
    // [Optional] The dialog options
    options: {
      // [Must] The window id
      id: "windowId",
      title: e => `Edit ${e.name}`,
      sizes: [500, 300],
      maximizer: false,
    },
    // [Optional] Fetch data form server. Promise<T>
    obtain: (model, store, context) => {
      return store.fetch("/api/loadData");
    },
    // [Optional] Store data to server. Promise
    stores: (model, store, context) => {
      return store.fetch("/api/saveData");
    },
    // [Optional] Validate the data when edited from server or local. Promise<String|Boolean>
    // If data is invalid, return failed message, otherwise return true or null.
    verify: (model, store, context) => {
      return store.fetch("/api/verifyData");
    },
    // [Optional] Confirm open before window open
    notice: "This data is locked, you sure to edit it?",
    // [Optional] Show a message when handle success
    inform: "Save data success!",
    // [Optional] Show a message when handle failed
    failed: "Save data error, please try again, or connect the manager!",
    // [Optional] Confirm exit when close the opened window
    cancel: "The data not save, you sure to exit edit?",
    // Specify update the data when handle success
    update: false,

  },
  // [Optional] Modify the row(s) data
  modify: {
    notice: "Are you sure to enable it?",
    inform: "Enable advice success",
    failed: "Failed to enable advice",
    update: false,
    // Update the row property. Promise
    handle: (model, store, context) => {
      store.fetch("/api/enableDevice", model.id)
    },
  },
  // [Optional] Do custom handle
  custom: {
    update: true,
    // Do anything you want
    handle: (model, store, context) => {
      store.fetch("/api/updateState", model.id, model.state)
          .then(() => context.commit("notify", "Update success"))
          .catch(() => context.commit("notify", "Update failed"))
    },
  },
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
    component: () => import("./ExpansionDirectory"),
    attribute: {
      /**
       * The items for directory component. Provide an array or a function.
       * Each item have property like:
       * * label:String the navigation label.
       * * value:any The item value.
       * * items:Array The item children. If item have no children, set to undefined.
       *
       * >Function like:
       * ```
       * //item: The current clicked navigation item.
       *  source:(item,store,context)=>{
       *    if(item==null){
       *      return store.fetch("/api/getRootNodes");
       *    }
       *    return store.fetch("/api/getChildren",item.id);
       *  }
       * ```
       */
      actives: 2,
      source: [
        {
          unity: 1,
          value: 1,
          label: "气象快报",
          image: "mdi-account",
          nodes: [
            {
              unity: 1,
              value: 4,
              label: "气象日报",
            },
            {
              unity: 1,
              value: 5,
              label: "气象月报",
            },
          ],
        },
        {
          unity: 1,
          value: 2,
          label: "水情简报",
        },
        {
          unity: 1,
          value: 3,
          label: "风险简报",
        },
      ],
      // The source item property mapping
      mapping: {
        label: "label",
        value: "value",
        nodes: "nodes",
        image: "image",
      },
      // [Optional] Set directory emit select event trigger condition.
      // 'leaf': Only emit on leaf node.
      // 'all' : For all node.
      trigger: "leaf",
    },
  },
  // for attachment directory only
  // directory: {
  //   component: () => import("./AttachmentDirectory"),
  //   attribute: {
  //     attachment: "someId",
  //     directory: {
  //       component: () => import("./ExpansionDirectory"),
  //       attribute: {
  //         // The color for directory component
  //         color: "primary",
  //         /**
  //          * The items for directory component. Provide an array or a function.
  //          * Each item have property like:
  //          * * label:String the navigation label.
  //          * * value:any The item value.
  //          * * items:Array The item children. If item have no children, set to undefined.
  //          *
  //          * >Function like:
  //          * ```
  //          * //item: The current clicked navigation item.
  //          *  source:(item,store,context)=>{
  //          *    if(item==null){
  //          *      return store.fetch("/api/getRootNodes");
  //          *    }
  //          *    return store.fetch("/api/getChildren",item.id);
  //          *  }
  //          * ```
  //          */
  //         source: [
  //           {
  //             value: 1,
  //             label: "气象快报",
  //           },
  //           {
  //             value: 2,
  //             label: "水情简报",
  //           },
  //           {
  //             value: 3,
  //             label: "风险简报",
  //           },
  //         ],
  //         // The source item property mapping
  //         mapping: {
  //           label: "label",
  //           value: "value",
  //           items: "items",
  //         },
  //         // itemComponent: () => {}
  //       },
  //     },
  //   },
  // },
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
      component: () => import("./Managunit"),
      attribute: {
        // [Optional] The menu bar config
        // menubar: {
        //   component: () => import("./ClassicMenubar"),
        //   attribute: {
        //     // [Optional] The menu bar background color
        //     color: null,
        //     // The menu items
        //     items: [
        //       {
        //         label: "删除",
        //         color: "primary",
        //         disable: ({selection}) => !selection.length,
        //         modify: {
        //           update: true,
        //           handle: ({selection}, store, context) => {
        //             return store.fetch("/api/deleteItem", selection.map(e => e.id));
        //           },
        //         },
        //         native: {},
        //       },
        //     ],
        //   },
        // },
        // [Optional] The heading config
        heading: {
          component: () => import("./ClassicHeading"),
          attribute: {
            // The title function for get title from navigation item
            title: v => v.label,
            // [Optional] The subtitle function for get title from navigation item
            subtitle: v => v.subtitle || v.label,
          },
        },
        // [Optional] The classic querier config
        // querier: {
        //   component: () => import("./ClassicQuerier.js"),
        //   attribute: {
        //     // [Optional] The querier background color
        //     color: "primary",
        //     // The field for keyword condition
        //     field: "keyword",
        //     // The keyword input label
        //     label: "输入关键字",
        //     // The query button label
        //     query: "查询",
        //     // [Optional] The query button icon
        //     image: undefined,
        //     // [Optional] The query button color
        //     natives: {
        //       keyword: null,
        //       query: null
        //     }
        //   }
        // },
        // [Optional]The ac
        querier: {
          component: () => import("./ActionQuerier"),
          attribute: {
            mapping: "keyword",
            natives: {
              keyword: {label: "输入关键字"},
              query: {
                label: "Query",
                color: "primary",
                icon: "mdi-magnify",
              },
            },
            actions: [],
          },
        },
        // The content config
        content: {
          /**
           * [Optional]
           * >
           * If true, the component must call completed function in {@link setup}.
           * The completed function provide by {@link managunit} component.
           * This property can provide by any component in {@link managunit}'s children component.
           * If provided, you must register a function in interceptors function array.
           *
           * >
           * The interceptors(provide by {@link managunit}) is function array.
           * Each function register by their children component for load data from server.
           * >
           * Only query event fired, each interceptor will be call.
           * >
           * #In this component, this property must be true.
           */
          intercept: true,
          component: () => import("./ClassicTableContent.js"),
          attribute: {
            // [Optional] Specify the table component. If you provide, use default.
            content: null,
            // [Optional] Define table actions.
            actions: [
              {
                id: "test",
                image: undefined,
                title: "",
                label: "Edit",
                color: "primary",
                disable: e => e.calories > 300,
                window: {
                  content: "Hello",
                  options: {},
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
                  // [Optional] Convert the model to component(The opened) attribute
                  toAttr: model => model,
                },
              },
              {
                id: "custom",
                title: "",
                label: "A",
                color: "secondary",
                custom: {
                  update: false,
                  handle: (model, store, context) => {
                    alert(0)
                  },
                },

              },
            ],
            // [Optional] Define table events
            handles: {
              // [Optional] Define table row single click, an action id or action object
              "row:click": "test",
              // [Optional] Define table row double click, an action id or action object
              "row:dblclick": {},
            },
            identity: "name",
            selective: "multiple",
            // Define table header
            dimensions: columns,
            // [Optional] The pagination object(length is for max page item)
            pagination: {page: 1, size: 15, count: 2, length: 10},
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
            source: ({unit, node, condition, pagination}, store) => {
              let {page, size} = pagination;
              let indices = Array.from(new Array(5)).map(i => Math.floor(Math.random() * 10) % 5);
              console.log(indices);
              return new Promise((resolve) => {
                setTimeout(() => resolve({
                  source: rows.filter((e, i) => indices.indexOf(i) >= 0),
                  pagination,
                }), 100);
              })
            },
            // [Optional] The q-table native attribute
          },
        },
        // [Optional] The comment config
        comment: null,
        // [Optional] The summary config
        summary: null,
        catalog: {
          component: () => import("./TreeDirectory"),
          attribute: {
            source: [
              {
                unity: 1,
                value: 1,
                label: "贵州省",
                nodes: [
                  {
                    unity: 1,
                    value: 4,
                    label: "贵阳市",
                  },
                  {
                    unity: 1,
                    value: 5,
                    label: "遵义市",
                  },
                ],
              },
              {
                unity: 1,
                value: 2,
                label: "云南省",
              },
              {
                unity: 1,
                value: 3,
                label: "四川省",
              },
            ],
            mapping: {
              label: "label",
              value: "value",
              nodes: "nodes",
            },
            actives: 2,
          },
        },
        details: null,
        // [Optional] The content background
        options: {
          color: "primary",
          // [Optional] Immediate query when navigation changed
          immediate: true,
          // [Optional] The condition object for query resource
          condition: {},
        },
      },
    },
    units: {
      // as basic
      [1]: {},
      [2]: null,
    },
  },
  // The source item property mapping
  configure: {
    // [Optional] component background color
    color: "primary",
    // The key for item to find options from managunit.units
    unity: "unity",
    // If provide this value, then render a component on content right.
    // So, you can use teleport component attach it.
    attachment: "anid",
  },
}