import {reactive}   from "vue";
import {renderSlot} from "vue";
import {h, ref}     from "vue";
import SlotsTest    from "./SlotsTest.js";

export default {
  name: "Test",
  props: ["names", "values"],
  setup(props, context) {
    let attr = reactive({name: "Bob"});
    setTimeout(() => {
      Object.assign(attr, {
        name: "Alice",
        age: "18"
      })
    }, 3000)
    return () => h(SlotsTest, attr)
  }
}
