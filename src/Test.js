import {h as H, ref} from "vue";

export default {
  name: "Test",
  props: ["names"],
  setup(props, context) {
    console.log(props);
    let count = ref(0);
    setInterval(() => count.value++, 1000);
    return () => H("div", props.names.join(","));
  }
}