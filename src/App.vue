<template>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <!--<router-view></router-view>-->
  <Windows :items="windows.items" :front="windows.front" :layer="windows.layer"></Windows>
  <!--<q-btn color="primary">This is a button?</q-btn>-->
  <!--<ElementForm :model="model" :form="sample.form"></ElementForm>-->
  <!--<Dialog title="Test" maximizer modally>-->
  <!--  This is a simple content.-->
  <!--  That means you don't to know the details.-->
  <!--</Dialog>-->
</template>

<script>

import {mapState} from "vuex";
import Dialog     from "./components/Modal/Dialog.vue";
import Windows    from "./components/Windows/Windows";

export default {
  components: {Dialog, Windows},
  data() {
    return {
      model: {},
      options: {
        id: "test",
        title: "Window Title",
        // sizes: [null, 500],
        attrs: {
          name: "Alice"
        },
        content: () => import("./components/Editor.vue"),
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
    windows: state => state.commons.windows
  }),
  mounted() {
    this.$store.dispatch("window.open", this.options);
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
