export default {
  name: "editor.new",
  // editor: () => import("../Modal/Dialog"),
  sizes: [500, 400],
  title: "Editor",
  form: {
    items: [
      {
        field: "name",
        label: "Name",
        placeholder: "Input one",
        default: "Alice",
        content: "textfield",
        attrs: {}
      },
      {
        field: "sex",
        default: "boy",
        content: "radio",
        source: [{
          label: "Boy",
          value: "boy"
        },
          {
            label: "Girl",
            value: "girl"
          }],
        attrs: {}
      }
    ]
  }
}