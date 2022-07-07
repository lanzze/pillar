<template>
  <div style="display: flex;flex-direction: row">
    <TDirectory :source="config.directory.attribute.source" @select="onActive"></TDirectory>
    <component :is="resolve(options.component)" v-bind="options.attribute" v-if="options"></component>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue";
import TDirectory             from "./Explorer/TDirectory.vue";

export default {
  name: "CH",
  components: {TDirectory},
  props: ["config"],
  data() {
    return {
      options: null,
      resolve: defineAsyncComponent
    }
  },
  methods: {
    onActive(e) {
      this.options = Object.assign({}, this.config.managunit.basic, this.config.managunit.items[e.value])
    }
  }
}
</script>