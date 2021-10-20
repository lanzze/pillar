<template>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <!--<router-view></router-view>-->
  <!--<Windows :items="items" :front="front"></Windows>-->
  <!--<q-btn color="primary">This is a button?</q-btn>-->
  <ElementForm :model="model" :form="sample.form"></ElementForm>
</template>

<script>

import {mapState}  from "vuex";
import ElementForm from "./components/Manageunit/element/ElementForm";
import sample      from "./components/Manageunit/options.sample"
import Windows     from "./components/Windows/Windows";

export default {
  components: {ElementForm,  Windows},
  data() {
    return {
      sample,
      model: {},
      options: {
        id: "test",
        window: "editor",
        title: "Window Title",
        sizes: [500, 400],
        attrs: {
          name: "Alice"
        },
        config: {
          maximizer: true,
          modally: true,
        },
        content: () => import("./modules/main/routes/Main.vue"),
      },
      options2: {
        id: "test2",
        title: "Window Title 2",
        sizes: [500, 400],
        offset: {top: 10, left: 10},
        attrs: {
          name: "Angel"
        },
        content: () => import("./modules/main/routes/Main.vue")
      }
    }
  },
  computed: mapState({
    items: state => state.commons.window.items,
    front: state => state.commons.window.front,
  }),
  mounted() {
    // this.$store.dispatch("window.open", this.options);
    // this.$store.dispatch("window.open", this.options2);
    // setTimeout(() => {
    //   // this.$store.dispatch("window.open", this.options);
    //   // this.options.content = "Bob"
    //   this.options2.attrs.name = "Bob"
    // }, 1500)
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 20px;
}

#test {
  position: absolute;
  width: 70vw;
  height: 70vh;
  top: 100px;
  left: 200px;
  border: 1px solid green;
}

</style>
