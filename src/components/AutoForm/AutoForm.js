import {h} from "vue";

export default {
  name: "AutoForm",
  props: {
    form: Object,
    model: Object,
    factory: Object
  },
  render() {
    console.log(this.form);
    let children = this.form.items.map(item => this.factory.from(h, item.content, item, this.model));
    return this.factory.from(h, "form", this.form, this.model, children);
  }
}