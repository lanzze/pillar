export default {
  name: "editor.new",
  // editor: () => import("../Modal/Dialog"),
  sizes: [500, 400],
  title: "Editor",
  form: {
    items: [
      {
        label: "Name",
        field: "name",
        placeholder: "Input one",
        default: "Alice",
        component: "textfield",
        attrs: {},
      },
      {
        label: "Sex",
        field: "sex",
        default: "boy",
        component: "radio",
        source: [{
          label: "Boy",
          value: "boy"
        },
          {
            label: "Girl",
            value: "girl"
          }],
        attrs: {
          size: "middle"
        }
      },
      {
        label: "Sex",
        field: "sex2",
        default: "boy",
        component: "select",
        source: [{
          label: "Boy",
          value: "boy"
        },
          {
            label: "Girl",
            value: "girl"
          }],
        attrs: {
          size: "middle"
        }
      }
    ]
  }
}