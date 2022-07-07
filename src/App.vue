<template>
  <Windows :items="windows.items" :front="windows.front" :layer="windows.layer"></Windows>
  
  <!--<CH :config="sample"></CH>-->
  <Explorer :config="sample"></Explorer>
</template>

<script>

import {mapState} from "vuex";
import CH         from "./components/CH.vue";
import Explorer   from "./components/Explorer/Explorer.js";
import Dialog     from "./components/Modal/Dialog.vue";
import Windows    from "./components/Windows/Windows";
import sample     from "./components/Explorer/options.sample"

export default {
  components: {CH, Explorer, Dialog, Windows},
  data() {
    return {
      tab: 0,
      event: "click",
      sample,
      names: [],
      model: {},
      options: {
        id: "test",
        title: "Window Title",
        // sizes: [null, 500],
        attrs: {
          name: "Alice"
        },
        content: () => import("./components/Editor.vue")
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
  methods: {
    onEvent() {
      alert(0)
    }
  },
  computed: mapState({
    windows: state => state.commons.windows
  }),
  mounted() {
    // this.$store.dispatch("window.open", this.options2);
    // setTimeout(() => {
    //   this.$store.dispatch("window.open", this.options);
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 2.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.explorer.component {
  width: 100vw;
  height: 100vh;
}

.modal--header {
  height: 42px;
  border-radius: 5px 5px 0 0;
  background: linear-gradient(to right, #438e9c, #438e9c);
}

.modal--body {
  box-shadow: 0.1rem 0.1rem 1.5rem 0.1rem #32a0a444;
  border-radius: 6px;
  background: #fff;
}

.modal--content {

}
</style>
