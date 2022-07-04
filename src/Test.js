import {renderSlot} from "vue";
import {h, ref}     from "vue";
import SlotsTest    from "./SlotsTest.js";

export default {
  name: "Test",
  props: ["names", "values"],
  setup(props, context) {
    return () => h(SlotsTest, {}, renderSlot(context.slots, "header")
    )
  }
}
